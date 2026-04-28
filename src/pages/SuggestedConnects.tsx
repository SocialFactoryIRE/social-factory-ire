import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthGuard from "@/components/AuthGuard";
import { Users, ArrowLeft } from "lucide-react";

const SuggestedConnectsContent = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-20 relative overflow-hidden">
        <div className="geometric-shape shape-circle w-64 h-64 bg-sky/20 top-20 right-10 blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl relative z-10">
          <button
            onClick={() => navigate("/town-hall")}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Town Hall
          </button>

          <div className="text-center mb-10">
            <Users className="h-12 w-12 mx-auto text-primary mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Suggested Connects
            </h1>
            <p className="text-muted-foreground">
              Discover members with shared interests near you
            </p>
          </div>

          <div className="bg-card rounded-2xl border-2 border-border p-8 text-center">
            <p className="text-muted-foreground">
              Coming soon, we'll match you with like-minded community members.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const SuggestedConnects = () => (
  <AuthGuard>{() => <SuggestedConnectsContent />}</AuthGuard>
);

export default SuggestedConnects;
