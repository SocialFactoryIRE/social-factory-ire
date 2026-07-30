import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_noticeboard_posts",
  title: "List noticeboard posts",
  description: "List recent noticeboard posts visible to the signed-in member.",
  inputSchema: {
    limit: z.number().int().min(1).max(50).default(10).describe("How many posts to return."),
    category: z.string().trim().min(1).optional().describe("Optional category filter."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ limit, category }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("noticeboard_posts")
      .select("id, title, body, category, is_pinned, chapter_id, created_at")
      .order("created_at", { ascending: false })
      .limit(limit ?? 10);
    if (category) query = query.eq("category", category);

    const { data, error } = await query;
    return error
      ? { content: [{ type: "text", text: error.message }], isError: true }
      : {
          content: [{ type: "text", text: JSON.stringify(data ?? []) }],
          structuredContent: { posts: data ?? [] },
        };
  },
});
