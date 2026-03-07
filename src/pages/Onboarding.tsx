import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Globe,
  MapPin,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  User as UserIcon,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";

const COUNTIES = [
  "Carlow","Cavan","Clare","Cork","Donegal","Dublin","Galway","Kerry",
  "Kildare","Kilkenny","Laois","Leitrim","Limerick","Longford","Louth",
  "Mayo","Meath","Monaghan","Offaly","Roscommon","Sligo","Tipperary",
  "Waterford","Westmeath","Wexford","Wicklow",
];

const INTERESTS = [
  "Community Building","Youth Work","Mental Health","Arts & Culture",
  "Sport & Wellbeing","Environment","Social Enterprise","Education",
  "Technology","Local Government","Music","Volunteering",
];

type MembershipType = "online" | "local" | null;

interface OnboardingState {
  membershipType: MembershipType;
  displayName: string;
  county: string;
  town: string;
  interests: string[];
  openToConnect: boolean;
  consentResearch: boolean;
}

const StepIndicator = ({ step, total }: { step: number; total: number }) => (
  <div className="w-full max-w-md mx-auto mb-8">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-semibold text-muted-foreground">
        Step {step} of {total}
      </span>
      <span className="text-sm text-muted-foreground">
        {Math.round((step / total) * 100)}%
      </span>
    </div>
    <Progress value={(step / total) * 100} className="h-2" />
  </div>
);

/* ─── Step 1: Membership Type ─── */
const Step1 = ({
  value,
  onChange,
}: {
  value: MembershipType;
  onChange: (v: MembershipType) => void;
}) => (
  <div className="space-y-6 text-center">
    <h2 className="text-3xl font-bold text-foreground">
      How would you like to participate?
    </h2>
    <p className="text-muted-foreground">
      Choose the membership type that suits you best.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      {([
        {
          type: "online" as const,
          icon: Globe,
          title: "Online Member",
          desc: "Connect remotely from anywhere in the world.",
        },
        {
          type: "local" as const,
          icon: MapPin,
          title: "Local Member",
          desc: "Engage with your local community in Ireland.",
        },
      ]).map(({ type, icon: Icon, title, desc }) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`p-6 rounded-2xl border-2 transition-all text-left space-y-3 ${
            value === type
              ? "border-primary bg-primary/10 shadow-lg"
              : "border-border bg-card hover:border-primary/50 hover:shadow-md"
          }`}
        >
          <Icon
            className={`h-10 w-10 ${
              value === type ? "text-primary" : "text-muted-foreground"
            }`}
          />
          <h3 className="text-xl font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </button>
      ))}
    </div>
  </div>
);

/* ─── Step 2: Display Name ─── */
const Step2 = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="space-y-6 text-center">
    <UserIcon className="h-12 w-12 text-primary mx-auto" />
    <h2 className="text-3xl font-bold text-foreground">
      What should we call you?
    </h2>
    <p className="text-muted-foreground">
      This is how other members will see you.
    </p>
    <div className="max-w-sm mx-auto">
      <Label htmlFor="displayName" className="sr-only">
        Display Name
      </Label>
      <Input
        id="displayName"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Your display name"
        className="text-center text-lg p-5"
        maxLength={100}
      />
    </div>
  </div>
);

/* ─── Step 3: Location ─── */
const Step3 = ({
  county,
  town,
  onCounty,
  onTown,
}: {
  county: string;
  town: string;
  onCounty: (v: string) => void;
  onTown: (v: string) => void;
}) => (
  <div className="space-y-6 text-center">
    <MapPin className="h-12 w-12 text-secondary mx-auto" />
    <h2 className="text-3xl font-bold text-foreground">Where are you based?</h2>
    <p className="text-muted-foreground">
      Help us connect you with local activities.
    </p>
    <div className="max-w-sm mx-auto space-y-4">
      <div className="text-left">
        <Label htmlFor="county" className="text-base font-semibold mb-2 block">
          County
        </Label>
        <Select value={county} onValueChange={onCounty}>
          <SelectTrigger id="county" className="text-base p-5">
            <SelectValue placeholder="Select your county" />
          </SelectTrigger>
          <SelectContent>
            {COUNTIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="text-left">
        <Label htmlFor="town" className="text-base font-semibold mb-2 block">
          Town <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Input
          id="town"
          value={town}
          onChange={(e) => onTown(e.target.value)}
          placeholder="e.g. Galway, Letterkenny"
          className="text-base p-5"
          maxLength={100}
        />
      </div>
    </div>
  </div>
);

/* ─── Step 4: Interests ─── */
const Step4 = ({
  selected,
  onToggle,
}: {
  selected: string[];
  onToggle: (tag: string) => void;
}) => (
  <div className="space-y-6 text-center">
    <h2 className="text-3xl font-bold text-foreground">
      What are you interested in?
    </h2>
    <p className="text-muted-foreground">
      Select as many as you like — you can change these later.
    </p>
    <div className="flex flex-wrap justify-center gap-3 mt-4">
      {INTERESTS.map((tag) => {
        const active = selected.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onToggle(tag)}
            className="focus:outline-none"
          >
            <Badge
              variant={active ? "default" : "outline"}
              className={`text-sm px-4 py-2 cursor-pointer transition-all ${
                active
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "hover:border-primary/50"
              }`}
            >
              {tag}
            </Badge>
          </button>
        );
      })}
    </div>
    {selected.length > 0 && (
      <p className="text-sm text-muted-foreground">
        {selected.length} selected
      </p>
    )}
  </div>
);

/* ─── Step 5: Privacy & Submit ─── */
const Step5 = ({
  openToConnect,
  consentResearch,
  onConnect,
  onConsent,
  isSubmitting,
}: {
  openToConnect: boolean;
  consentResearch: boolean;
  onConnect: (v: boolean) => void;
  onConsent: (v: boolean) => void;
  isSubmitting: boolean;
}) => (
  <div className="space-y-6 text-center">
    <CheckCircle2 className="h-12 w-12 text-secondary mx-auto" />
    <h2 className="text-3xl font-bold text-foreground">Almost there!</h2>
    <p className="text-muted-foreground">
      Just a couple of preferences before we get started.
    </p>
    <div className="max-w-sm mx-auto space-y-5 text-left">
      <label className="flex items-start gap-3 cursor-pointer">
        <Checkbox
          checked={openToConnect}
          onCheckedChange={(v) => onConnect(v === true)}
          className="mt-0.5"
        />
        <span className="text-base text-foreground">
          Open to connect with other members
        </span>
      </label>
      <label className="flex items-start gap-3 cursor-pointer">
        <Checkbox
          checked={consentResearch}
          onCheckedChange={(v) => onConsent(v === true)}
          className="mt-0.5"
        />
        <span className="text-base text-foreground">
          I consent to anonymised research use
        </span>
      </label>
    </div>
  </div>
);

/* ─── Main Component ─── */
const OnboardingWizard = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [state, setState] = useState<OnboardingState>({
    membershipType: null,
    displayName: "",
    county: "",
    town: "",
    interests: [],
    openToConnect: true,
    consentResearch: false,
  });
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill display name from profile
  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("display_name, membership_type")
        .eq("user_id", user.id)
        .single();
      if (data) {
        setState((s) => ({
          ...s,
          displayName: data.display_name || user.email || "",
          membershipType: (data.membership_type as MembershipType) || null,
        }));
      }
    };
    fetchProfile();
  }, [user]);

  const isLocalMember = state.membershipType === "local";
  const totalSteps = isLocalMember ? 5 : 4;

  // Map visual step to logical step (skip location for online)
  const logicalStep = !isLocalMember && step >= 3 ? step + 1 : step;

  const canNext = () => {
    switch (logicalStep) {
      case 1:
        return state.membershipType !== null;
      case 2:
        return state.displayName.trim().length > 0;
      case 3:
        return state.county.length > 0; // local only
      case 4:
        return true; // interests optional
      case 5:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };
  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleInterest = (tag: string) => {
    setState((s) => ({
      ...s,
      interests: s.interests.includes(tag)
        ? s.interests.filter((t) => t !== tag)
        : [...s.interests, tag],
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Update profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          display_name: state.displayName.trim(),
          membership_type: state.membershipType,
          county: isLocalMember ? state.county : null,
          town: isLocalMember ? state.town.trim() || null : null,
          open_to_connect: state.openToConnect,
          onboarded: true,
        })
        .eq("user_id", user.id);

      if (profileError) throw profileError;

      // Upsert interest tags: delete then re-insert
      await supabase
        .from("member_tags")
        .delete()
        .eq("user_id", user.id);

      if (state.interests.length > 0) {
        const rows = state.interests.map((tag) => ({
          user_id: user.id,
          tag,
          category: "interest",
        }));
        const { error: tagsError } = await supabase
          .from("member_tags")
          .insert(rows);
        if (tagsError) throw tagsError;
      }

      toast({ title: "You're all set!", description: "Welcome to Social Factory." });
      navigate("/town-hall");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (logicalStep) {
      case 1:
        return (
          <Step1
            value={state.membershipType}
            onChange={(v) => setState((s) => ({ ...s, membershipType: v }))}
          />
        );
      case 2:
        return (
          <Step2
            value={state.displayName}
            onChange={(v) => setState((s) => ({ ...s, displayName: v }))}
          />
        );
      case 3:
        return (
          <Step3
            county={state.county}
            town={state.town}
            onCounty={(v) => setState((s) => ({ ...s, county: v }))}
            onTown={(v) => setState((s) => ({ ...s, town: v }))}
          />
        );
      case 4:
        return <Step4 selected={state.interests} onToggle={toggleInterest} />;
      case 5:
        return (
          <Step5
            openToConnect={state.openToConnect}
            consentResearch={state.consentResearch}
            onConnect={(v) => setState((s) => ({ ...s, openToConnect: v }))}
            onConsent={(v) => setState((s) => ({ ...s, consentResearch: v }))}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 grid-pattern relative overflow-hidden">
        <div className="geometric-shape shape-circle w-64 h-64 bg-mint/20 top-20 left-10 blur-3xl" />
        <div className="geometric-shape w-40 h-40 bg-coral/20 top-1/3 right-20 rounded-3xl rotate-45 blur-2xl" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-xl mx-auto">
            <StepIndicator step={step} total={totalSteps} />

            <div className="bg-card p-8 md:p-10 rounded-3xl shadow-hover border-2 border-border min-h-[380px] flex flex-col justify-between">
              <div className="flex-1">{renderStep()}</div>

              <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={step === 1}
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>

                {step < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    disabled={!canNext()}
                    className="gap-2 bg-gradient-hero hover:opacity-90 font-bold"
                  >
                    Next <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="gap-2 bg-gradient-hero hover:opacity-90 font-bold"
                  >
                    {isSubmitting ? "Saving..." : "Complete Setup"}
                    <CheckCircle2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Onboarding = () => (
  <AuthGuard>{(user) => <OnboardingWizard user={user} />}</AuthGuard>
);

export default Onboarding;
