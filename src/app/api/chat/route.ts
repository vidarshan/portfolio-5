import OpenAI from "openai";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getQuota, getRemainingQuota } from "@/app/utils/getQuota";

const MAX_REQUESTS = getQuota();
const month = new Date().toISOString().slice(0, 7);

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get("clientId");

  if (!clientId) {
    return NextResponse.json(
      { error: "clientId is required" },
      { status: 400 }
    );
  }

  const { data: usageData } = await supabaseAdmin
    .from("chat_usage")
    .select("*")
    .eq("client_id", clientId)
    .eq("month", month);

  const { data, error } = await supabaseAdmin
    .from("chat_messages")
    .select("*")
    .eq("client_id", clientId.trim());

  console.log("Fetched chat history:", data);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    data,
    maxQuota: MAX_REQUESTS,
    remaining: MAX_REQUESTS - (usageData?.[0].count || 0),
  });
}

export async function POST(req: Request) {
  const { message, clientId } = await req.json();

  const month = new Date().toISOString().slice(0, 7);
  const MAX_REQUESTS = getQuota();

  const { data: usage, error: usageError } = await supabaseAdmin
    .from("chat_usage")
    .select("count")
    .eq("client_id", clientId)
    .eq("month", month)
    .single();

  if (usageError && usageError.code !== "PGRST116") {
    console.error("Failed to fetch usage:", usageError);
  }

  const currentCount = usage?.count ?? 0;

  if (currentCount >= MAX_REQUESTS) {
    return NextResponse.json(
      {
        error: "Monthly limit reached",
        maxQuota: MAX_REQUESTS,
        remaining: 0,
      },
      { status: 429 }
    );
  }

  const { error: userError } = await supabaseAdmin
    .from("chat_messages")
    .insert({
      client_id: clientId,
      role: "user",
      content: message,
    });

  if (userError) {
    console.error("User insert failed:", userError);
  }

  const reply = "";

  const { data: updatedUsage, error: upsertError } = await supabaseAdmin
    .from("chat_usage")
    .upsert(
      {
        client_id: clientId,
        month,
        count: currentCount + 1,
      },
      { onConflict: "client_id,month" }
    )
    .select("count")
    .single();

  if (upsertError) {
    console.error("Usage upsert failed:", upsertError);
  }

  const finalUsage = updatedUsage?.count ?? currentCount + 1;
  const remaining = Math.max(0, MAX_REQUESTS - finalUsage);

  const { error: assistantError } = await supabaseAdmin
    .from("chat_messages")
    .insert({
      client_id: clientId,
      role: "assistant",
      content: reply,
    });

  if (assistantError) {
    console.error("Assistant insert failed:", assistantError);
  }

  return NextResponse.json({
    reply,
    maxQuota: MAX_REQUESTS,
    remaining,
  });
}
