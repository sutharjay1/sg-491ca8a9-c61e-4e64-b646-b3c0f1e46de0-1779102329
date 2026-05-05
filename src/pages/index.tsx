import { SEO } from "@/components/SEO";
import { RegexTester } from "@/components/RegexTester";

export default function Home() {
  return (
    <>
      <SEO
        title="RegexLab - Real-time Regular Expression Tester"
        description="Test regex patterns instantly with match highlighting and a comprehensive quick reference guide. Perfect for developers and data analysts."
      />
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="container py-6">
            <h1 className="text-3xl font-display font-bold text-primary flex items-center gap-2">
              <span className="font-mono">/</span>
              RegexLab
              <span className="font-mono">/</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Real-time regex testing with instant feedback
            </p>
          </div>
        </header>
        <main className="container py-8">
          <RegexTester />
        </main>
      </div>
    </>
  );
}