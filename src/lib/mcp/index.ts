import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getMyProfile from "./tools/get-my-profile";
import listNoticeboardPosts from "./tools/list-noticeboard-posts";
import createNoticeboardPost from "./tools/create-noticeboard-post";
import listProposals from "./tools/list-proposals";
import voteOnProposal from "./tools/vote-on-proposal";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "social-factory-ire",
  title: "social-factory-ire",
  version: "0.1.0",
  instructions:
    "Tools for Social Factory. Read the signed-in member's profile, browse and publish noticeboard posts, and read or vote on governance proposals. All tools act as the authenticated member.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getMyProfile, listNoticeboardPosts, createNoticeboardPost, listProposals, voteOnProposal],
});
