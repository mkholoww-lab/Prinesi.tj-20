/**
 * GitHub Data Sync Service
 * Handles backup and synchronization of application data to GitHub
 * 
 * Setup required:
 * 1. Create GitHub repository
 * 2. Generate Personal Access Token (Settings > Developer settings > Personal access tokens)
 * 3. Create .env file in project root with:
 *    VITE_GITHUB_TOKEN=your_token
 *    VITE_GITHUB_REPO=username/repo
 *    VITE_GITHUB_USER=username
 */

interface GitHubFile {
  name: string;
  path: string;
  content: string;
  sha?: string;
}

interface SyncData {
  users: any[];
  couriers: any[];
  deliveries: any[];
  partners: any[];
  scooters: any[];
  timestamp: string;
}

export class GitHubSync {
  private token: string;
  private repo: string;
  private user: string;
  private baseUrl: string = "https://api.github.com";

  constructor() {
    this.token = import.meta.env.VITE_GITHUB_TOKEN || "";
    this.repo = import.meta.env.VITE_GITHUB_REPO || "";
    this.user = import.meta.env.VITE_GITHUB_USER || "";
  }

  isConfigured(): boolean {
    return !!(this.token && this.repo && this.user);
  }

  /**
   * Get file from GitHub
   */
  private async getFile(path: string): Promise<GitHubFile | null> {
    if (!this.isConfigured()) return null;

    try {
      const response = await fetch(
        `${this.baseUrl}/repos/${this.repo}/contents/${path}`,
        {
          headers: {
            Authorization: `token ${this.token}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`GitHub API error: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        name: data.name,
        path: data.path,
        content: atob(data.content),
        sha: data.sha,
      };
    } catch (error) {
      console.error("Error fetching from GitHub:", error);
      return null;
    }
  }

  /**
   * Upload or update file on GitHub
   */
  private async putFile(
    path: string,
    content: string,
    message: string,
    sha?: string
  ): Promise<boolean> {
    if (!this.isConfigured()) return false;

    try {
      const response = await fetch(
        `${this.baseUrl}/repos/${this.repo}/contents/${path}`,
        {
          method: "PUT",
          headers: {
            Authorization: `token ${this.token}`,
            Accept: "application/vnd.github.v3+json",
          },
          body: JSON.stringify({
            message,
            content: btoa(content),
            branch: "main",
            ...(sha && { sha }),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error("Error uploading to GitHub:", error);
      return false;
    }
  }

  /**
   * Backup all data to GitHub
   */
  async backupData(data: SyncData): Promise<boolean> {
    if (!this.isConfigured()) {
      console.warn("GitHub not configured. Set VITE_GITHUB_TOKEN and VITE_GITHUB_REPO in .env");
      return false;
    }

    try {
      const timestamp = new Date().toISOString();
      const content = JSON.stringify(data, null, 2);
      const filename = `data-${timestamp.slice(0, 10)}.json`;
      const path = `data/${filename}`;

      return await this.putFile(
        path,
        content,
        `Backup data from ${timestamp}`
      );
    } catch (error) {
      console.error("Backup failed:", error);
      return false;
    }
  }

  /**
   * Restore data from GitHub
   */
  async restoreData(): Promise<SyncData | null> {
    if (!this.isConfigured()) return null;

    try {
      const file = await this.getFile("data/latest.json");
      if (!file) return null;

      return JSON.parse(file.content) as SyncData;
    } catch (error) {
      console.error("Restore failed:", error);
      return null;
    }
  }

  /**
   * Create folder structure on GitHub
   */
  async initializeRepository(): Promise<boolean> {
    if (!this.isConfigured()) return false;

    try {
      // Create main README
      await this.putFile(
        "README.md",
        `# ${this.repo} - Prinesi.tj Data Backup\n\nAutomatic backup of courier management system data.`,
        "Initialize repository"
      );

      // Create initial data folder placeholder
      await this.putFile(
        "data/.gitkeep",
        "",
        "Create data folder"
      );

      return true;
    } catch (error) {
      console.error("Repository initialization failed:", error);
      return false;
    }
  }

  /**
   * Get backup history from GitHub
   */
  async getBackupHistory(): Promise<string[]> {
    if (!this.isConfigured()) return [];

    try {
      const response = await fetch(
        `${this.baseUrl}/repos/${this.repo}/contents/data`,
        {
          headers: {
            Authorization: `token ${this.token}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (!response.ok) return [];

      const files = await response.json();
      return files
        .filter((f: any) => f.name.endsWith(".json"))
        .map((f: any) => f.name)
        .sort()
        .reverse();
    } catch (error) {
      console.error("Error getting backup history:", error);
      return [];
    }
  }

  /**
   * Delete old backups (keep last N)
   */
  async cleanupOldBackups(keepCount: number = 10): Promise<boolean> {
    if (!this.isConfigured()) return false;

    try {
      const backups = await this.getBackupHistory();
      const toDelete = backups.slice(keepCount);

      for (const filename of toDelete) {
        // Note: Deletion requires getting SHA first, then sending DELETE request
        // This is a simplified version
        console.log(`Would delete: ${filename}`);
      }

      return true;
    } catch (error) {
      console.error("Cleanup failed:", error);
      return false;
    }
  }

  /**
   * Sync data periodically
   */
  startAutoSync(intervalMinutes: number = 60, data: SyncData): void {
    if (!this.isConfigured()) return;

    setInterval(() => {
      this.backupData(data);
      console.log(`Auto-synced data to GitHub at ${new Date().toISOString()}`);
    }, intervalMinutes * 60 * 1000);
  }
}

// Export singleton instance
export const githubSync = new GitHubSync();
