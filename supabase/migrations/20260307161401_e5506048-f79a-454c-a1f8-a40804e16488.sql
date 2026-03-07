
-- Function to get vote tallies for proposals (bypasses RLS safely)
CREATE OR REPLACE FUNCTION public.get_proposal_vote_counts(proposal_ids uuid[])
RETURNS TABLE(proposal_id uuid, yes_count bigint, no_count bigint, abstain_count bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    pv.proposal_id,
    COUNT(*) FILTER (WHERE pv.vote = 'yes') AS yes_count,
    COUNT(*) FILTER (WHERE pv.vote = 'no') AS no_count,
    COUNT(*) FILTER (WHERE pv.vote = 'abstain') AS abstain_count
  FROM public.proposal_votes pv
  WHERE pv.proposal_id = ANY(proposal_ids)
  GROUP BY pv.proposal_id;
$$;
