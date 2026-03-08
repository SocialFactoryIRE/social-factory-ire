import GeometricBackground from "@/components/GeometricBackground";

const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="relative min-h-screen">
    <GeometricBackground />
    {children}
  </div>
);

export default PageLayout;
