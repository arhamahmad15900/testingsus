import crypto from 'crypto';
import { MatchHistoryEntry } from '../src/types/game.js';

interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  avatar?: string;
  token?: string;
  tokenExpiry?: number;
  resetToken?: string;
  resetTokenExpiry?: number;
  stats?: {
    gamesPlayed: number;
    gamesWon: number;
    matchesAsImposter: number;
    matchesAsCrewmate: number;
  };
}

class Database {
  private users: Map<string, User> = new Map();
  private tokenMap: Map<string, string> = new Map(); // token -> userId
  private matchHistory: MatchHistoryEntry[] = [];

  constructor() {
    this.initializeDefaultUsers();
  }

  private initializeDefaultUsers() {
    // Add a demo user for testing
    const demoUser: User = {
      id: 'user_demo',
      username: 'DemoUser',
      email: 'demo@example.com',
      passwordHash: this.hashPassword('password'),
      avatar: 'detective',
      stats: {
        gamesPlayed: 0,
        gamesWon: 0,
        matchesAsImposter: 0,
        matchesAsCrewmate: 0,
      },
    };
    this.users.set(demoUser.id, demoUser);
  }

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  private generateToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  public registerUser(
    username: string,
    email: string,
    password: string,
    avatar: string = 'detective'
  ): { success: boolean; token?: string; user?: any; error?: string } {
    // Check if user already exists
    const existingUser = Array.from(this.users.values()).find(
      (u) => u.email === email || u.username === username
    );

    if (existingUser) {
      return {
        success: false,
        error: 'Username or email already registered.',
      };
    }

    const userId = 'user_' + crypto.randomBytes(6).toString('hex');
    const token = this.generateToken();

    const newUser: User = {
      id: userId,
      username,
      email,
      passwordHash: this.hashPassword(password),
      avatar,
      token,
      tokenExpiry: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
      stats: {
        gamesPlayed: 0,
        gamesWon: 0,
        matchesAsImposter: 0,
        matchesAsCrewmate: 0,
      },
    };

    this.users.set(userId, newUser);
    this.tokenMap.set(token, userId);

    return {
      success: true,
      token,
      user: {
        id: userId,
        username,
        email,
        avatar,
      },
    };
  }

  public loginUser(
    emailOrUsername: string,
    password: string
  ): { success: boolean; token?: string; user?: any; error?: string } {
    const user = Array.from(this.users.values()).find(
      (u) => u.email === emailOrUsername || u.username === emailOrUsername
    );

    if (!user || user.passwordHash !== this.hashPassword(password)) {
      return {
        success: false,
        error: 'Invalid email/username or password.',
      };
    }

    const token = this.generateToken();
    user.token = token;
    user.tokenExpiry = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
    this.tokenMap.set(token, user.id);

    return {
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },
    };
  }

  public getUserByToken(token: string): User | null {
    const userId = this.tokenMap.get(token);
    if (!userId) return null;

    const user = this.users.get(userId);
    if (!user) return null;

    // Check if token expired
    if (user.tokenExpiry && user.tokenExpiry < Date.now()) {
      this.tokenMap.delete(token);
      return null;
    }

    return user;
  }

  public updateProfile(
    userId: string,
    updates: Partial<User>
  ): User | null {
    const user = this.users.get(userId);
    if (!user) return null;

    if (updates.username) user.username = updates.username;
    if (updates.avatar) user.avatar = updates.avatar;

    return user;
  }

  public requestPasswordReset(email: string): { success: boolean; message: string } {
    const user = Array.from(this.users.values()).find((u) => u.email === email);

    if (!user) {
      // Don't reveal if email exists
      return { success: true, message: 'If email exists, reset link has been sent.' };
    }

    const resetToken = this.generateToken();
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    return { success: true, message: 'Reset link sent to email.' };
  }

  public resetPassword(token: string, newPassword: string): void {
    const user = Array.from(this.users.values()).find((u) => u.resetToken === token);

    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < Date.now()) {
      throw new Error('Invalid or expired reset token.');
    }

    user.passwordHash = this.hashPassword(newPassword);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
  }

  public logoutUser(token: string): void {
    this.tokenMap.delete(token);
  }

  public recordMatchOutcome(
    historyEntry: MatchHistoryEntry,
    statsUpdates: Map<string, any>
  ): void {
    this.matchHistory.push(historyEntry);

    // Update user stats
    statsUpdates.forEach((stats, userId) => {
      const user = this.users.get(userId);
      if (user && user.stats) {
        user.stats.gamesPlayed += stats.gamesPlayed || 0;
        user.stats.gamesWon += stats.gamesWon || 0;
        user.stats.matchesAsImposter += stats.matchesAsImposter || 0;
        user.stats.matchesAsCrewmate += stats.matchesAsCrewmate || 0;
      }
    });
  }

  public getMatchHistory(): MatchHistoryEntry[] {
    return this.matchHistory;
  }
}

export const db = new Database();
