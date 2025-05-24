import axios from 'axios';
import { GithubRepo } from '@/types';

const GITHUB_API_URL = 'https://api.github.com';

export class GitHubService {
  private username: string;
  private token?: string;

  constructor(username: string, token?: string) {
    this.username = username;
    this.token = token;
  }
  private getAuthHeaders() {
    // Always include accept header for GitHub API v3
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json'
    };
    
    // Add authorization if token is provided
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  /**
   * Fetch user's public repositories
   */
  async getRepositories(perPage = 10): Promise<GithubRepo[]> {
    try {
      const response = await axios.get(
        `${GITHUB_API_URL}/users/${this.username}/repos`,
        {
          headers: this.getAuthHeaders(),
          params: {
            sort: 'updated',
            direction: 'desc',
            per_page: perPage,
          },
        }
      );      // Filter out forked repos and map to our GithubRepo type
      return response.data
        .filter((repo: { fork: boolean }) => !repo.fork)
        .map((repo: {
          id: number,
          name: string,
          description: string | null,
          html_url: string,
          homepage?: string,
          stargazers_count: number,
          language: string | null,
          fork: boolean
        }) => ({
          id: repo.id.toString(),
          name: repo.name,
          description: repo.description || '',
          html_url: repo.html_url,
          homepage: repo.homepage,
          stargazers_count: repo.stargazers_count,
          language: repo.language,
          fork: repo.fork,
        }));
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
      return [];
    }
  }

  /**
   * Fetch a single repository by name
   */
  async getRepository(repoName: string): Promise<GithubRepo | null> {
    try {
      const response = await axios.get(
        `${GITHUB_API_URL}/repos/${this.username}/${repoName}`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      const repo = response.data;
      return {
        id: repo.id.toString(),
        name: repo.name,
        description: repo.description || '',
        html_url: repo.html_url,
        homepage: repo.homepage,
        stargazers_count: repo.stargazers_count,
        language: repo.language,
        fork: repo.fork,
      };
    } catch (error) {
      console.error(`Error fetching GitHub repository ${repoName}:`, error);
      return null;
    }
  }

  /**
   * Get user profile information
   */
  async getUserProfile() {
    try {
      const response = await axios.get(`${GITHUB_API_URL}/users/${this.username}`, {
        headers: this.getAuthHeaders(),
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching GitHub user profile:', error);
      return null;
    }
  }

  /**
   * Get contribution stats (last year's contributions)
   */
  async getContributionStats() {
    try {
      // Note: GitHub doesn't have a public API for contributions
      // This is just a placeholder - in a real application you would
      // need to use GitHub GraphQL API or scrape the contributions calendar
      
      // Return mock data
      return {
        totalContributions: 873,
        lastYearContributions: 742,
        currentStreak: 17,
        longestStreak: 48,
      };
    } catch (error) {
      console.error('Error fetching GitHub contribution stats:', error);
      return null;
    }
  }
}
