import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_proposals",
  title: "List governance proposals",
  description: "List Social Factory democracy proposals visible to the signed-in member.",
  inputSchema: {
    status: z.enum(["draft", "open", "closed", "passed", "rejected"]).optional().describe("Optional status filter."),
    limit: z.number().int().min(1).max(50).default(10).describe("How many proposals to return."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("proposals")
      .select("id, title, body, type, status, voting_ends_at, created_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 10);
    if (status) query = query.eq("status", status);

    const { data, error } = await query;
    return error
      ? { content: [{ type: "text", text: error.message }], isError: true }
      : {
          content: [{ type: "text", text: JSON.stringify(data ?? []) }],
          structuredContent: { proposals: data ?? [] },
        };
  },
});
