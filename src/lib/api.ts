export const API_BASE_URL = "http://localhost:8080";

export async function fetchJobs() {
  const res = await fetch(`${API_BASE_URL}/jobs`);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}
