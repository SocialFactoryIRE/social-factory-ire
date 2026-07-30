import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "create_noticeboard_post",
  title: "Create noticeboard post",
  description: "Publish a new global noticeboard post as the signed-in member.",
  inputSchema: {
    title: z.string().trim().min(3).max(150).describe("Post title."),
    body: z.string().trim().min(1).max(5000).describe("Post body text."),
    category: z.string().trim().min(1).max(50).optional().describe("Optional category."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async ({ title, body, category }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("noticeboard_posts")
      .insert({ author_id: ctx.getUserId(), title, body, category: category ?? "general" })
      .select("id, title, category, created_at");

    return error
      ? { content: [{ type: "text", text: error.message }], isError: true }
      : {
          content: [{ type: "text", text: JSON.stringify(data?.[0] ?? {}) }],
          structuredContent: { post: data?.[0] ?? null },
        };
  },
});
