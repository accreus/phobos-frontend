import { User as FirebaseUser } from "firebase/auth";
import {
  CheckCircle2,
  Terminal,
  FileText,
  Video,
  Image as ImageIcon,
  Shield,
  Cloud,
  Database,
  Eye,
  Server,
  Code,
  BookOpen,
} from "lucide-react";
import Header from "@/components/Header";
import CodeBlock from "@/components/CodeBlock";

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
  return (
    <div className="min-h-screen bg-background">
      <Header
        isAuthenticated={isAuthenticated}
        onLogout={onLogout}
        user={user}
      />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <main className="prose prose-slate dark:prose-invert max-w-none">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Phobos</h1>
            <p className="text-lg text-muted-foreground">
              A containerized privacy tool that strips metadata from files
              (images, docs, video) using <code>exiftool</code>, backs them up
              to cloud storage using <code>rclone</code>, and logs events to
              Firebase Firestore.
            </p>
          </div>

          {/* Features */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-primary" />
              Features
            </h2>
            <div className="grid gap-4">
              <div className="flex gap-3 p-4 rounded-lg bg-card border">
                <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <strong>Metadata Removal:</strong> Strip EXIF and other
                  metadata from files using exiftool
                </div>
              </div>
              <div className="flex gap-3 p-4 rounded-lg bg-card border">
                <Cloud className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <strong>Cloud Backup:</strong> Automatically backup originals
                  to Google Drive (or other rclone remotes)
                </div>
              </div>
              <div className="flex gap-3 p-4 rounded-lg bg-card border">
                <Database className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <strong>Database Logging:</strong> Track all file processing
                  events in Firebase Firestore
                </div>
              </div>
              <div className="flex gap-3 p-4 rounded-lg bg-card border">
                <Eye className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <strong>File Watcher:</strong> Daemon mode monitors
                  directories and auto-processes new files
                </div>
              </div>
              <div className="flex gap-3 p-4 rounded-lg bg-card border">
                <Server className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <strong>REST API:</strong> FastAPI-based endpoints for
                  programmatic access
                </div>
              </div>
              <div className="flex gap-3 p-4 rounded-lg bg-card border">
                <Terminal className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <strong>CLI:</strong> Rich command-line interface for manual
                  operations
                </div>
              </div>
            </div>
          </section>

          {/* Supported File Types */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Supported File Types</h2>
            <div className="grid gap-3">
              <div className="flex gap-3 items-center p-3 rounded-lg bg-muted/50">
                <ImageIcon className="w-5 h-5 text-primary" />
                <div>
                  <strong>Images:</strong> <code>.jpg</code>, <code>.jpeg</code>
                  , <code>.png</code>
                </div>
              </div>
              <div className="flex gap-3 items-center p-3 rounded-lg bg-muted/50">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <strong>Documents:</strong> <code>.pdf</code>
                </div>
              </div>
              <div className="flex gap-3 items-center p-3 rounded-lg bg-muted/50">
                <Video className="w-5 h-5 text-primary" />
                <div>
                  <strong>Videos:</strong> <code>.mp4</code>, <code>.mov</code>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Start */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Quick Start</h2>

            <h3 className="text-xl font-semibold mb-4">Local Development</h3>

            <div className="mb-6">
              <h4 className="font-semibold mb-3">1. Clone and setup</h4>
              <CodeBlock
                code={`git clone https://github.com/puffious/phobos
cd phobos
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\\Scripts\\activate
pip install -r requirements.txt`}
                language="bash"
              />
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-3">
                2. Configure environment (copy <code>.env.example</code> to{" "}
                <code>.env</code>)
              </h4>
              <CodeBlock
                code={`DAEMON_MODE=false
WATCH_DIR=/data/watch
OUTPUT_DIR=/data/clean
RCLONE_REMOTE_NAME=gdrive
RCLONE_DEST_PATH=backups
FIREBASE_CREDENTIALS=/path/to/firebase-credentials.json`}
                language="bash"
              />
            </div>

            <div className="mb-8">
              <h4 className="font-semibold mb-3">3. Run CLI commands</h4>
              <CodeBlock
                code={`# Health check
python main.py health

# Sanitize a file
python main.py sanitize /path/to/photo.jpg

# Preview metadata only (no changes)
python main.py sanitize /path/to/photo.jpg --dry-run

# Skip confirmation after preview
python main.py sanitize /path/to/photo.jpg --confirm

# Show all metadata (not only removable)
python main.py sanitize /path/to/photo.jpg --dry-run --show-all-metadata

# Backup a file
python main.py backup /path/to/file.pdf --remote gdrive:backups

# Start API server
python main.py run-api

# Start daemon mode
python main.py run-daemon`}
                language="bash"
              />
            </div>

            <h3 className="text-xl font-semibold mb-4">Docker Deployment</h3>

            <div className="mb-6">
              <h4 className="font-semibold mb-3">1. Build the image</h4>
              <CodeBlock
                code={`docker build -t cleanslate .`}
                language="bash"
              />
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-3">2. Run in API-only mode</h4>
              <CodeBlock
                code={`docker run -p 8000:8000 \\
  -e DAEMON_MODE=false \\
  -v $(pwd)/data:/data \\
  -v $(pwd)/firebase-credentials.json:/app/firebase-service-account.json \\
  cleanslate`}
                language="bash"
              />
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-3">
                3. Run in daemon mode (watcher + API)
              </h4>
              <CodeBlock
                code={`docker run -p 8000:8000 \\
  -e DAEMON_MODE=true \\
  -v $(pwd)/data:/data \\
  -v $(pwd)/rclone.conf:/root/.config/rclone/rclone.conf \\
  -v $(pwd)/firebase-credentials.json:/app/firebase-service-account.json \\
  cleanslate`}
                language="bash"
              />
            </div>
          </section>

          {/* Architecture */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Code className="w-6 h-6 text-primary" />
              Architecture
            </h2>

            <h3 className="text-xl font-semibold mb-4">Services</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <code>app/services/backup_service.py</code>: Rclone wrapper for
                cloud uploads
              </li>
              <li>
                <code>app/services/cleaner_service.py</code>: Exiftool wrapper
                for metadata removal
              </li>
              <li>
                <code>app/services/db_service.py</code>: Firebase Firestore
                client for event logging
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">Daemon Mode</h3>
            <p className="mb-3">
              The file watcher (<code>app/daemon/watcher.py</code>) monitors{" "}
              <code>WATCH_DIR</code> and:
            </p>
            <ol className="list-decimal list-inside space-y-2 mb-6 ml-4">
              <li>Backs up original file to cloud storage</li>
              <li>Sanitizes file by removing metadata</li>
              <li>
                Moves processed file to <code>OUTPUT_DIR</code>
              </li>
              <li>Logs transaction to Firestore</li>
            </ol>

            <h3 className="text-xl font-semibold mb-4">API Endpoints</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <code>GET /health</code> - Health check
              </li>
              <li>
                <code>GET /status</code> - Service status
              </li>
              <li>
                <code>POST /sanitize</code> - Upload a file, returns full
                metadata, removed metadata, and a shareable link to the
                sanitized file on the configured rclone remote
              </li>
              <li>
                <code>POST /backup</code> - Backup a file to cloud
              </li>
            </ul>

            <div className="mb-6">
              <p className="mb-3">Example sanitize upload (multipart):</p>
              <CodeBlock
                code={`curl -X POST http://localhost:8000/sanitize \\
  -F "file=@/path/to/photo.jpg" | jq`}
                language="bash"
              />
            </div>

            <div className="mb-6">
              <p className="mb-3">Example response (abridged):</p>
              <CodeBlock
                code={`{
  "success": true,
  "message": "File sanitized successfully",
  "file_path": "/tmp/cleanslate_uploads/abc123.jpg",
  "file_size": 12345,
  "metadata_before": {"EXIF:Make": "Canon"},
  "metadata_after": {},
  "removed_metadata": {"EXIF:Make": {"before": "Canon", "after": null}},
  "remote_link": "https://drive.google.com/..."
}`}
                language="json"
              />
            </div>
          </section>

          {/* Configuration */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Configuration</h2>

            <h3 className="text-xl font-semibold mb-4">
              Environment Variables
            </h3>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Variable</th>
                    <th className="text-left p-3 font-semibold">Default</th>
                    <th className="text-left p-3 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3">
                      <code>DAEMON_MODE</code>
                    </td>
                    <td className="p-3">
                      <code>false</code>
                    </td>
                    <td className="p-3">Enable daemon mode (watcher + API)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">
                      <code>WATCH_DIR</code>
                    </td>
                    <td className="p-3">
                      <code>/data/watch</code>
                    </td>
                    <td className="p-3">Directory to monitor for new files</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">
                      <code>OUTPUT_DIR</code>
                    </td>
                    <td className="p-3">
                      <code>/data/clean</code>
                    </td>
                    <td className="p-3">Directory for processed files</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">
                      <code>RCLONE_REMOTE_NAME</code>
                    </td>
                    <td className="p-3">
                      <code>gdrive</code>
                    </td>
                    <td className="p-3">
                      Rclone remote name (from rclone.conf)
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">
                      <code>RCLONE_DEST_PATH</code>
                    </td>
                    <td className="p-3">
                      <code>backups</code>
                    </td>
                    <td className="p-3">Folder path on remote</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">
                      <code>FIREBASE_ENABLED</code>
                    </td>
                    <td className="p-3">
                      <code>true</code>
                    </td>
                    <td className="p-3">
                      Toggle Firestore logging (set to <code>false</code> to
                      disable Firebase completely)
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">
                      <code>FIREBASE_CREDENTIALS</code>
                    </td>
                    <td className="p-3">-</td>
                    <td className="p-3">
                      Path to Firebase service account JSON (only required when{" "}
                      <code>FIREBASE_ENABLED=true</code>)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold mb-4">Setup Firebase</h3>
            <ol className="list-decimal list-inside space-y-2 mb-6 ml-4">
              <li>
                Create a Firebase project at{" "}
                <a
                  href="https://console.firebase.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://console.firebase.google.com
                </a>
              </li>
              <li>Enable Firestore Database</li>
              <li>
                Generate a service account key (Project Settings → Service
                Accounts)
              </li>
              <li>
                Download the JSON key and set <code>FIREBASE_CREDENTIALS</code>{" "}
                to its path
              </li>
            </ol>

            <h3 className="text-xl font-semibold mb-4">Setup Rclone</h3>
            <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
              <li>
                Install rclone:{" "}
                <a
                  href="https://rclone.org/install/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://rclone.org/install/
                </a>
              </li>
              <li>Configure remote:</li>
            </ol>
            <div className="mb-6">
              <CodeBlock
                code={`rclone config
# Follow prompts to set up Google Drive or other remote`}
                language="bash"
              />
            </div>
            <p className="mb-6">
              3. Mount config in Docker or set <code>RCLONE_REMOTE_NAME</code>{" "}
              to match your remote name
            </p>
          </section>

          {/* Development */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Development
            </h2>

            <h3 className="text-xl font-semibold mb-4">Run Tests</h3>
            <div className="mb-8">
              <CodeBlock code={`pytest -v`} language="bash" />
            </div>

            <h3 className="text-xl font-semibold mb-4">Project Layout</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <code>app/</code> — application code
                <ul className="ml-6 mt-2 space-y-1">
                  <li>
                    <code>app/services/</code> — service modules (rclone,
                    cleaner, db)
                  </li>
                  <li>
                    <code>app/daemon/</code> — watcher/daemon logic
                  </li>
                  <li>
                    <code>app/api/</code> — FastAPI app modules
                  </li>
                  <li>
                    <code>app/cli.py</code> — CLI entrypoint
                  </li>
                </ul>
              </li>
              <li>
                <code>tests/</code> — test suite
              </li>
              <li>
                <code>.env.example</code> — environment template
              </li>
              <li>
                <code>requirements.txt</code> — dependencies
              </li>
              <li>
                <code>Dockerfile</code> — container image
              </li>
            </ul>
          </section>

          {/* License */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">License</h2>
            <p>MIT</p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Documentation;
