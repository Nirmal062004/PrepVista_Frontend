import React, { useState } from 'react';
import { BarChart3, TrendingUp, Download, Calendar, Filter, Eye, FileText, Video, Users } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import CircularProgress from '../ui/CircularProgress';

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedType, setSelectedType] = useState('all');

  const reportData = {
    overview: {
      totalSessions: 45,
      averageScore: 82,
      improvement: 15,
      timeSpent: 12.5
    },
    recentReports: [
      {
        id: 1,
        type: 'resume',
        title: 'Resume Analysis Report',
        date: '2024-01-15',
        score: 87,
        status: 'completed'
      },
      {
        id: 2,
        type: 'video',
        title: 'Video Interview Practice',
        date: '2024-01-14',
        score: 79,
        status: 'completed'
      },
      {
        id: 3,
        type: 'interview',
        title: 'Live Technical Interview',
        date: '2024-01-12',
        score: 85,
        status: 'completed'
      },
      {
        id: 4,
        type: 'video',
        title: 'Behavioral Interview Practice',
        date: '2024-01-10',
        score: 73,
        status: 'completed'
      }
    ],
    skillsBreakdown: {
      technical: 85,
      communication: 78,
      problemSolving: 82,
      leadership: 75,
      teamwork: 88
    },
    progressData: [
      { month: 'Sep', score: 65 },
      { month: 'Oct', score: 72 },
      { month: 'Nov', score: 78 },
      { month: 'Dec', score: 81 },
      { month: 'Jan', score: 82 }
    ]
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'resume':
        return <FileText size={16} className="text-blue-500" />;
      case 'video':
        return <Video size={16} className="text-green-500" />;
      case 'interview':
        return <Users size={16} className="text-purple-500" />;
      default:
        return <BarChart3 size={16} className="text-gray-500" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">Track your interview preparation progress and performance</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <Button variant="secondary">
            <Download size={18} className="mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.overview.totalSessions}</p>
              <div className="flex items-center mt-2">
                <TrendingUp size={16} className="text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12% from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 size={24} className="text-blue-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.overview.averageScore}%</p>
              <div className="flex items-center mt-2">
                <TrendingUp size={16} className="text-green-500 mr-1" />
                <span className="text-sm text-green-600">+8% improvement</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-green-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Improvement</p>
              <p className="text-2xl font-bold text-gray-900">+{reportData.overview.improvement}%</p>
              <div className="flex items-center mt-2">
                <TrendingUp size={16} className="text-green-500 mr-1" />
                <span className="text-sm text-green-600">Since last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-purple-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Time Spent</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.overview.timeSpent}h</p>
              <div className="flex items-center mt-2">
                <Calendar size={16} className="text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">This month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar size={24} className="text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Chart */}
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Performance Trend</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-black text-white rounded-lg">Score</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Sessions</button>
              </div>
            </div>
            
            <div className="h-64 flex items-end justify-between space-x-2">
              {reportData.progressData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-gray-200 rounded-t-lg relative" style={{ height: '200px' }}>
                    <div 
                      className="w-full bg-black rounded-t-lg absolute bottom-0 transition-all duration-1000"
                      style={{ height: `${(data.score / 100) * 200}px` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 mt-2">{data.month}</span>
                  <span className="text-xs text-gray-500">{data.score}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Reports */}
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Reports</h2>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="resume">Resume Analysis</option>
                <option value="video">Video Practice</option>
                <option value="interview">Live Interview</option>
              </select>
            </div>

            <div className="space-y-4">
              {reportData.recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      {getTypeIcon(report.type)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{report.title}</h3>
                      <p className="text-sm text-gray-500">{report.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className={`font-semibold ${getScoreColor(report.score)}`}>
                        {report.score}%
                      </p>
                      <p className="text-xs text-gray-500 capitalize">{report.status}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye size={16} className="mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Skills Breakdown */}
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Skills Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(reportData.skillsBreakdown).map(([skill, score]) => (
                <div key={skill}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {skill.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="text-sm text-gray-600">{score}%</span>
                  </div>
                  <ProgressBar value={score} size="sm" />
                </div>
              ))}
            </div>
          </Card>

          {/* Overall Performance */}
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Overall Performance</h3>
            <div className="text-center">
              <CircularProgress 
                value={reportData.overview.averageScore} 
                size={120}
                color="#10B981"
              />
              <p className="text-sm text-gray-600 mt-4">
                You're performing above average!
              </p>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full justify-start">
                <Download size={16} className="mr-2" />
                Download Full Report
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <Calendar size={16} className="mr-2" />
                Schedule Review
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <BarChart3 size={16} className="mr-2" />
                Compare with Peers
              </Button>
            </div>
          </Card>

          {/* Recommendations */}
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 text-sm">Focus on Communication</h4>
                <p className="text-xs text-blue-700 mt-1">
                  Your communication score can be improved with more practice
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 text-sm">Great Technical Skills</h4>
                <p className="text-xs text-green-700 mt-1">
                  Keep up the excellent technical performance
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;