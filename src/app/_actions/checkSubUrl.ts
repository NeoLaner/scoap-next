// Define the server action function
export async function checkSubUrl(url: string) {
  // Step 1: Check for security issues
  if (!url.startsWith("https://")) {
    throw new Error("Insecure URL: Only HTTPS links are allowed.");
  }

  // Step 2: Format data with SRT (This is a placeholder for actual SRT formatting logic)
  const srtData = formatSRT("Scoap", 1, "00:00:01,000", "00:00:05,000");
  console.log("Formatted SRT data:", srtData);

  // Step 3: Check CORS status of the link
  const corsStatus = await checkCORS(url);

  // Step 4: Set file size limit based on CORS status
  const maxSize = corsStatus ? 250 * 1024 : 2 * 1024 * 1024;
  console.log(`Max file size allowed: ${maxSize / 1024} KB`);
  return { corsStatus };
}

// Utility function to format SRT data
function formatSRT(
  text: string,
  sequence: number,
  startTime: string,
  endTime: string,
): string {
  return `${sequence}\n${startTime} --> ${endTime}\n${text}\n`;
}

// Utility function to check CORS status
async function checkCORS(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD" });
    const corsHeader = response.headers.get("access-control-allow-origin");
    return corsHeader !== null && corsHeader !== "";
  } catch (error) {
    console.error("Error checking CORS:", error);
    return false;
  }
}
