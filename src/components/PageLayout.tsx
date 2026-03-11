const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="relative min-h-screen">
    {/* Soft ambient gradient blobs */}
    <div
      className="hero-blob"
      aria-hidden="true"
      style={{
        width: "40vw",
        height: "40vw",
        maxWidth: 500,
        maxHeight: 500,
        top: "5%",
        left: "-5%",
        background: "radial-gradient(circle, rgba(255,205,26,0.15) 0%, rgba(249,187,134,0.08) 50%, transparent 100%)",
        position: "fixed",
      }}
    />
    <div
      className="hero-blob"
      aria-hidden="true"
      style={{
        width: "35vw",
        height: "35vw",
        maxWidth: 450,
        maxHeight: 450,
        bottom: "10%",
        right: "-3%",
        background: "radial-gradient(circle, rgba(93,205,249,0.12) 0%, rgba(0,179,137,0.08) 50%, transparent 100%)",
        position: "fixed",
      }}
    />
    {children}
  </div>
);

export default PageLayout;
