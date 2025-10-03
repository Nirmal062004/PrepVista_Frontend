// Core types for the application
export interface User {
  id: string;
  name: string;
  email: string;
  university?: string;
  course?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface ResumeAnalysis {
  id: string;
  userId: string;
  atsScore: number;
  overallRating: 'A' | 'B' | 'C' | 'D' | 'F';
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  createdAt: string;
}

export interface VideoAnalysis {
  id: string;
  userId: string;
  videoUrl: string;
  eyeContactPercentage: number;
  postureScore: number;
  gestureAnalysis: string;
  emotionalAnalysis: string;
  speechQuality: number;
  confidence: number;
  createdAt: string;
}

export interface InterviewSession {
  id: string;
  userId: string;
  type: 'technical' | 'hr' | 'behavioral';
  duration: number;
  score: number;
  feedback: string[];
  createdAt: string;
}

export interface DashboardStats {
  resumeScore: number;
  interviewCount: number;
  successRate: number;
  totalSessions: number;
  improvement: number;
}