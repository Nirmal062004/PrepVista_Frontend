import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import ResumeAnalysis from './components/resume/ResumeAnalysis';
import VideoAnalysis from './components/video/VideoAnalysis';
import LiveInterview from './components/interview/LiveInterview';
import Reports from './components/reports/Reports';
import QuestionLibrary from './components/library/QuestionLibrary';
import Profile from './components/profile/Profile';
import Settings from './components/settings/Settings';
import Help from './components/help/Help';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import { User, DashboardStats } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [activeSection, setActiveSection] = useState('dashboard');

  // Mock user data
  const mockUser: User = {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    university: 'Stanford University',
    course: 'Computer Science',
    createdAt: '2024-01-01'
  };

  // Mock dashboard stats
  const mockStats: DashboardStats = {
    resumeScore: 87,
    interviewCount: 12,
    successRate: 89,
    totalSessions: 45,
    improvement: 15
  };

  const handleLogin = async (email: string, password: string) => {
    // Simulate login
    setTimeout(() => {
      setUser(mockUser);
    }, 1000);
  };

  const handleSignUp = async (data: any) => {
    // Simulate sign up
    setTimeout(() => {
      setUser({
        ...mockUser,
        name: data.name,
        email: data.email,
        university: data.university,
        course: data.course
      });
    }, 1000);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard stats={mockStats} userName={user?.name || ''} />;
      case 'resume':
        return <ResumeAnalysis />;
      case 'video':
        return <VideoAnalysis />;
      case 'interview':
        return <LiveInterview />;
      case 'reports':
        return <Reports />;
      case 'library':
        return <QuestionLibrary />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      case 'help':
        return <Help />;
      default:
        return <Dashboard stats={mockStats} userName={user?.name || ''} />;
    }
  };

  // Show auth screens if user is not logged in
  if (!user) {
    if (authMode === 'signup') {
      return (
        <SignUpForm
          onSignUp={handleSignUp}
          onSwitchToLogin={() => setAuthMode('login')}
        />
      );
    }
    
    return (
      <LoginForm
        onLogin={handleLogin}
        onSwitchToSignUp={() => setAuthMode('signup')}
      />
    );
  }

  return (
    <Layout
      user={user}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderContent()}
    </Layout>
  );
}

export default App;