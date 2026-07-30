import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "vote_on_proposal",
  title: "Vote on a proposal",
  description: "Cast or update the signed-in member's vote on a governance proposal.",
  inputSchema: {
    proposal_id: z.string().uuid().describe("The proposal's id."),
    vote: z.enum(["yes", "no", "abstain"]).describe("The vote to cast."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: async ({ proposal_id, vote }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("proposal_votes")
      .upsert(
        { proposal_id, user_id: ctx.getUserId(), vote },
        { onConflict: "proposal_id,user_id" }
      )
      .select("proposal_id, vote, created_at");

    return error
      ? { content: [{ type: "text", text: error.message }], isError: true }
      : {
          content: [{ type: "text", text: JSON.stringify(data?.[0] ?? {}) }],
          structuredContent: { vote: data?.[0] ?? null },
        };
  },
});
