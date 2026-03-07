
-- Table 1: proposals
CREATE TABLE public.proposals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text NOT NULL,
  type text NOT NULL DEFAULT 'proposal',
  status text NOT NULL DEFAULT 'open',
  community_id uuid REFERENCES public.communities(id) ON DELETE SET NULL,
  voting_ends_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Validation trigger for proposals type/status
CREATE OR REPLACE FUNCTION public.validate_proposal()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.type NOT IN ('proposal','initiative','co_design','vote') THEN
    RAISE EXCEPTION 'Invalid proposal type: %', NEW.type;
  END IF;
  IF NEW.status NOT IN ('draft','open','voting','closed','adopted','rejected') THEN
    RAISE EXCEPTION 'Invalid proposal status: %', NEW.status;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_validate_proposal
BEFORE INSERT OR UPDATE ON public.proposals
FOR EACH ROW EXECUTE FUNCTION public.validate_proposal();

ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can read proposals"
ON public.proposals FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Authors can insert own proposals"
ON public.proposals FOR INSERT TO authenticated
WITH CHECK (author_id = auth.uid());

CREATE POLICY "Authors can update own proposals"
ON public.proposals FOR UPDATE TO authenticated
USING (author_id = auth.uid())
WITH CHECK (author_id = auth.uid());

-- Table 2: proposal_votes
CREATE TABLE public.proposal_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id uuid NOT NULL REFERENCES public.proposals(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vote text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (proposal_id, user_id)
);

CREATE OR REPLACE FUNCTION public.validate_proposal_vote()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.vote NOT IN ('yes','no','abstain') THEN
    RAISE EXCEPTION 'Invalid vote value: %', NEW.vote;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_validate_proposal_vote
BEFORE INSERT OR UPDATE ON public.proposal_votes
FOR EACH ROW EXECUTE FUNCTION public.validate_proposal_vote();

ALTER TABLE public.proposal_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own votes"
ON public.proposal_votes FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can insert own votes"
ON public.proposal_votes FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own votes"
ON public.proposal_votes FOR DELETE TO authenticated
USING (user_id = auth.uid());

-- Table 3: proposal_comments
CREATE TABLE public.proposal_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id uuid NOT NULL REFERENCES public.proposals(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body text NOT NULL,
  parent_id uuid REFERENCES public.proposal_comments(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.proposal_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can read comments"
ON public.proposal_comments FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Authors can insert own comments"
ON public.proposal_comments FOR INSERT TO authenticated
WITH CHECK (author_id = auth.uid());

CREATE POLICY "Authors can delete own comments"
ON public.proposal_comments FOR DELETE TO authenticated
USING (author_id = auth.uid());

-- Table 4: research_consents
CREATE TABLE public.research_consents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  consented boolean NOT NULL DEFAULT false,
  consented_at timestamptz
);

ALTER TABLE public.research_consents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own consent"
ON public.research_consents FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Users can insert own consent"
ON public.research_consents FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own consent"
ON public.research_consents FOR UPDATE TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());
