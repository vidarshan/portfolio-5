import OpenAI from "openai";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const MAX_REQUESTS = 20;
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

  const { data, error } = await supabaseAdmin
    .from("chat_messages")
    .select("*")
    .eq("client_id", clientId.trim());

  console.log("Fetched chat history:", data);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const { message, clientId } = await req.json();

  const { data } = await supabaseAdmin
    .from("chat_usage")
    .select("*")
    .eq("client_id", clientId)
    .eq("month", month)
    .single();

  console.log("Usage data:", data);

  if (data && data.count >= MAX_REQUESTS) {
    return NextResponse.json(
      { error: "Monthly limit reached" },
      { status: 429 }
    );
  }

  // Insert user message
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
  console.log(
    "Using service role:",
    process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 10)
  );

  await supabaseAdmin.from("chat_usage").upsert({
    client_id: clientId,
    month,
    count: (data?.count ?? 0) + 1,
  });

  const assistantReply = "Hello!";

  // Insert assistant message
  const { error: assistantError } = await supabaseAdmin
    .from("chat_messages")
    .insert({
      client_id: clientId,
      role: "assistant",
      content: assistantReply,
    });

  if (assistantError) {
    console.error("Assistant insert failed:", assistantError);
  }

  return NextResponse.json({ reply: assistantReply });
}
