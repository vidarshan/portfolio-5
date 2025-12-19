export function getQuota() {
    console.log("Monthly question limit:", process.env.MONTHLY_QUESTION_LIMIT);
  return parseInt(process.env.MONTHLY_QUESTION_LIMIT || "20", 10);
}

export function getRemainingQuota() {
  return getQuota() - parseInt(process.env.MONTHLY_QUESTION_LIMIT || "20", 10);
}
