import { useState, useEffect, useRef } from "react";
import { User as FirebaseUser } from "firebase/auth";
import {
  CheckCircle2,
  Terminal,
  FolderSync,
  ScrollText,
  Cog,
  ArrowRight,
  Image,
  FileText,
  Video,
  ShieldCheck,
  Lock,
  Trash2,
} from "lucide-react";
import Header from "@/components/Header";
import DocsSidebar from "@/components/DocsSidebar";
import CodeBlock from "@/components/CodeBlock";
import FileTypesBadge from "@/components/FileTypesBadge";

interface DocumentationProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
  user?: FirebaseUser | null;
}
const Documentation = ({
  isAuthenticated = false,
  onLogout,
  user,
}: DocumentationProps) => {
  const [activeSection, setActiveSection] = useState("overview");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    sectionRefs.current[sectionId]?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    onLogout?.();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={isAuthenticated}
        onLogout={onLogout}
        user={user}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-12">
          <DocsSidebar
            activeSection={activeSection}
            onSectionClick={scrollToSection}
          />

          <main className="flex-1 max-w-3xl animate-fade-in">
            {/* Overview */}
            <section
              id="overview"
              ref={(el) => (sectionRefs.current.overview = el)}
              className="mb-16"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Getting Started with Phobos
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Phobos is an automated metadata removal and secure backup system
                designed to protect user privacy. This guide will help you set
                up the <strong className="text-foreground">Phobos Core</strong>{" "}
                locally using Docker.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <h4 className="font-medium text-sm mb-1 text-primary">
                    Privacy-First
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Ensure sensitive data never leaks from your files.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-success/5 border border-success/20">
                  <h4 className="font-medium text-sm mb-1 text-success">
                    Zero Data Loss
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Preserve file content and usability while removing unsafe
                    metadata.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">
                    Dual Deployment:
                  </span>{" "}
                  Web UI for individuals, CLI/daemon for developers and
                  organizations. Originals are safely stored in your Google
                  Drive.
                </p>
              </div>
            </section>

            {/* File Support */}
            <section
              id="file-support"
              ref={(el) => (sectionRefs.current["file-support"] = el)}
              className="mb-16"
            >
              <h2 className="section-title flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary" />
                Supported File Types
              </h2>
              <p className="section-description mb-6">
                Phobos processes a wide range of file formats, using
                content-equivalent sanitization to preserve usability.
              </p>
              <FileTypesBadge />
              <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-medium">
                    Sanitization Philosophy:
                  </span>{" "}
                  Content-equivalent, not byte-identical. We remove known unsafe
                  metadata while preserving ambiguous fields that might affect
                  file usability.
                </p>
              </div>
            </section>

            {/* System Requirements */}
            <section
              id="requirements"
              ref={(el) => (sectionRefs.current.requirements = el)}
              className="mb-16"
            >
              <h2 className="section-title flex items-center gap-3">
                <Cog className="w-6 h-6 text-primary" />
                System Requirements
              </h2>
              <p className="section-description mb-6">
                Ensure you have the following installed before proceeding.
              </p>

              <div className="space-y-3">
                {[
                  "Docker installed and running",
                  "Docker Compose installed",
                  "Git installed",
                  "Basic command-line knowledge",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border"
                  >
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Local Setup */}
            <section
              id="setup"
              ref={(el) => (sectionRefs.current.setup = el)}
              className="mb-16"
            >
              <h2 className="section-title flex items-center gap-3">
                <Terminal className="w-6 h-6 text-primary" />
                Local Setup Using Docker
              </h2>
              <p className="section-description mb-8">
                Follow these steps to get Phobos running locally.
              </p>

              <div className="space-y-8">
                {/* Step 1 */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                      1
                    </span>
                    <h3 className="text-lg font-medium">
                      Clone the Repository
                    </h3>
                  </div>
                  <CodeBlock
                    code={`git clone https://github.com/your-org/phobos-core.git
cd phobos-core`}
                  />
                </div>

                {/* Step 2 */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                      2
                    </span>
                    <h3 className="text-lg font-medium">
                      Create Environment File
                    </h3>
                  </div>
                  <CodeBlock code={`cp .env.example .env`} />
                </div>

                {/* Step 3 */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                      3
                    </span>
                    <h3 className="text-lg font-medium">
                      Edit Environment Variables
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Open the{" "}
                    <code className="px-1.5 py-0.5 rounded bg-muted text-foreground">
                      .env
                    </code>{" "}
                    file and configure the following:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                      <span>
                        <strong className="text-foreground">
                          Google Drive API credentials
                        </strong>{" "}
                        — For secure cloud backup
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                      <span>
                        <strong className="text-foreground">
                          Firebase configuration
                        </strong>{" "}
                        — For file indexing and auth
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                      <span>
                        <strong className="text-foreground">
                          Local watch directory path
                        </strong>{" "}
                        — Folder to monitor for files
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                      4
                    </span>
                    <h3 className="text-lg font-medium">Build Docker Images</h3>
                  </div>
                  <CodeBlock code={`docker compose build`} />
                </div>

                {/* Step 5 */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                      5
                    </span>
                    <h3 className="text-lg font-medium">Start Phobos Core</h3>
                  </div>
                  <CodeBlock code={`docker compose up -d`} />
                </div>
              </div>
            </section>

            {/* Usage Modes */}
            <section
              id="usage"
              ref={(el) => (sectionRefs.current.usage = el)}
              className="mb-16"
            >
              <h2 className="section-title flex items-center gap-3">
                <FolderSync className="w-6 h-6 text-primary" />
                Usage Modes
              </h2>
              <p className="section-description mb-8">
                Phobos supports multiple operation modes to fit your workflow.
              </p>

              <div className="space-y-6">
                {/* Daemon Mode */}
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-lg font-semibold mb-2">Daemon Mode</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Automatically monitors a folder and cleans metadata from
                    newly added files in real-time.
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    Running by default
                  </div>
                </div>

                {/* CLI Mode */}
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-lg font-semibold mb-2">CLI Mode</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Manually clean files from command line for batch processing.
                  </p>
                  <CodeBlock
                    code={`docker compose exec phobos phobos clean ./input ./output`}
                  />
                </div>

                {/* Logs */}
                <div className="p-6 rounded-xl bg-card border border-border">
                  <h3 className="text-lg font-semibold mb-2">Logs & Status</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Monitor Phobos activity and troubleshoot issues.
                  </p>
                  <CodeBlock code={`docker compose logs -f`} />
                </div>
              </div>
            </section>

            {/* Internals */}
            <section
              id="internals"
              ref={(el) => (sectionRefs.current.internals = el)}
              className="mb-16"
            >
              <h2 className="section-title flex items-center gap-3">
                <ScrollText className="w-6 h-6 text-primary" />
                What Happens Internally
              </h2>
              <p className="section-description mb-8">
                Here's how Phobos processes your files behind the scenes.
              </p>

              <div className="relative">
                <div className="absolute left-[23px] top-8 bottom-8 w-px bg-border" />

                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 z-10">
                      <span className="text-primary font-semibold">1</span>
                    </div>
                    <div className="pt-2">
                      <h4 className="font-medium mb-1">Original Backup</h4>
                      <p className="text-muted-foreground text-sm">
                        Your original file is securely backed up to your Google
                        Drive before any processing.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 z-10">
                      <span className="text-primary font-semibold">2</span>
                    </div>
                    <div className="pt-2">
                      <h4 className="font-medium mb-1">Metadata Removal</h4>
                      <p className="text-muted-foreground text-sm">
                        Sensitive metadata (location, author, version history)
                        is automatically detected and stripped.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 z-10">
                      <span className="text-primary font-semibold">3</span>
                    </div>
                    <div className="pt-2">
                      <h4 className="font-medium mb-1">Clean Output</h4>
                      <p className="text-muted-foreground text-sm">
                        A privacy-safe, content-equivalent version is
                        produced—ready to share securely.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Security */}
            <section
              id="security"
              ref={(el) => (sectionRefs.current.security = el)}
              className="mb-16"
            >
              <h2 className="section-title flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-primary" />
                Security Considerations
              </h2>
              <p className="section-description mb-8">
                Phobos is designed with strong practical security and clear
                trust boundaries.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Trash2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Ephemeral Processing</h4>
                    <p className="text-muted-foreground text-sm">
                      Files exist only during processing on the server and are
                      deleted immediately afterward. No persistent storage of
                      your data.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Isolated Docker Engine</h4>
                    <p className="text-muted-foreground text-sm">
                      The core sanitization engine runs in an isolated Docker
                      container, ensuring clear separation from other services.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">User Ownership</h4>
                    <p className="text-muted-foreground text-sm">
                      Google Drive backup ensures you maintain full ownership of
                      your original files. Phobos never stores copies beyond
                      processing.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-warning/5 border border-warning/20">
                <p className="text-sm text-muted-foreground">
                  <span className="text-warning font-medium">Note:</span> v1
                  focuses on individual users. Organization accounts and
                  enterprise policy enforcement are planned for future versions.
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
