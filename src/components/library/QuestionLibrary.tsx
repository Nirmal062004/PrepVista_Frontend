import React, { useState } from 'react';
import { Search, Filter, BookOpen, Star, Clock, Tag, Plus, Eye } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

const QuestionLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories', count: 450 },
    { id: 'technical', name: 'Technical', count: 180 },
    { id: 'behavioral', name: 'Behavioral', count: 120 },
    { id: 'hr', name: 'HR & General', count: 90 },
    { id: 'leadership', name: 'Leadership', count: 60 }
  ];

  const questions = [
    {
      id: 1,
      question: "Tell me about yourself and your background.",
      category: 'hr',
      difficulty: 'easy',
      type: 'open-ended',
      tags: ['introduction', 'background', 'general'],
      bookmarked: true,
      timeToAnswer: '2-3 minutes',
      tips: 'Focus on professional background, key achievements, and what makes you unique.',
      sampleAnswer: 'I am a software engineer with 3 years of experience...'
    },
    {
      id: 2,
      question: "Explain the difference between REST and GraphQL APIs.",
      category: 'technical',
      difficulty: 'medium',
      type: 'knowledge',
      tags: ['api', 'rest', 'graphql', 'backend'],
      bookmarked: false,
      timeToAnswer: '3-4 minutes',
      tips: 'Compare key differences, advantages, and use cases for each.',
      sampleAnswer: 'REST is an architectural style while GraphQL is a query language...'
    },
    {
      id: 3,
      question: "Describe a time when you had to work with a difficult team member.",
      category: 'behavioral',
      difficulty: 'medium',
      type: 'situational',
      tags: ['teamwork', 'conflict resolution', 'communication'],
      bookmarked: true,
      timeToAnswer: '4-5 minutes',
      tips: 'Use the STAR method: Situation, Task, Action, Result.',
      sampleAnswer: 'In my previous role, I worked with a colleague who...'
    },
    {
      id: 4,
      question: "How do you handle tight deadlines and pressure?",
      category: 'behavioral',
      difficulty: 'easy',
      type: 'situational',
      tags: ['pressure', 'time management', 'stress'],
      bookmarked: false,
      timeToAnswer: '3-4 minutes',
      tips: 'Discuss your strategies for prioritization and stress management.',
      sampleAnswer: 'When facing tight deadlines, I first assess the scope...'
    },
    {
      id: 5,
      question: "What are the principles of good software architecture?",
      category: 'technical',
      difficulty: 'hard',
      type: 'knowledge',
      tags: ['architecture', 'design patterns', 'scalability'],
      bookmarked: false,
      timeToAnswer: '5-6 minutes',
      tips: 'Cover SOLID principles, scalability, maintainability, and modularity.',
      sampleAnswer: 'Good software architecture follows several key principles...'
    },
    {
      id: 6,
      question: "Where do you see yourself in 5 years?",
      category: 'hr',
      difficulty: 'easy',
      type: 'open-ended',
      tags: ['career goals', 'future plans', 'ambition'],
      bookmarked: true,
      timeToAnswer: '2-3 minutes',
      tips: 'Align your goals with the company\'s growth opportunities.',
      sampleAnswer: 'In five years, I see myself having grown into...'
    }
  ];

  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || question.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || question.difficulty === selectedDifficulty;
    const matchesType = selectedType === 'all' || question.type === selectedType;
    const matchesBookmark = !bookmarkedOnly || question.bookmarked;

    return matchesSearch && matchesCategory && matchesDifficulty && matchesType && matchesBookmark;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-blue-100 text-blue-800';
      case 'behavioral': return 'bg-purple-100 text-purple-800';
      case 'hr': return 'bg-green-100 text-green-800';
      case 'leadership': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (selectedQuestion) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => setSelectedQuestion(null)}
          >
            ← Back to Library
          </Button>
          <div className="flex space-x-3">
            <Button variant="secondary">
              <Star size={18} className="mr-2" />
              {selectedQuestion.bookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
            <Button>Practice This Question</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    {selectedQuestion.question}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedQuestion.category)}`}>
                      {selectedQuestion.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedQuestion.difficulty)}`}>
                      {selectedQuestion.difficulty}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {selectedQuestion.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{selectedQuestion.timeToAnswer}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Answer</h2>
              <div className="p-4 bg-blue-50 rounded-lg mb-4">
                <h3 className="font-medium text-blue-900 mb-2">Tips & Strategy</h3>
                <p className="text-blue-800">{selectedQuestion.tips}</p>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Sample Answer</h2>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  {selectedQuestion.sampleAnswer}
                </p>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Note: This is a sample answer. Personalize it with your own experiences and examples.
              </p>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Related Tags</h2>
              <div className="flex flex-wrap gap-2">
                {selectedQuestion.tags.map((tag: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Practice Options</h3>
              <div className="space-y-3">
                <Button className="w-full">
                  <BookOpen size={18} className="mr-2" />
                  Practice with AI
                </Button>
                <Button variant="secondary" className="w-full">
                  Record Video Answer
                </Button>
                <Button variant="ghost" className="w-full">
                  Add to Practice Set
                </Button>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Similar Questions</h3>
              <div className="space-y-3">
                {questions
                  .filter(q => q.id !== selectedQuestion.id && q.category === selectedQuestion.category)
                  .slice(0, 3)
                  .map((question) => (
                    <div
                      key={question.id}
                      className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedQuestion(question)}
                    >
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        {question.question}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(question.difficulty)}`}>
                          {question.difficulty}
                        </span>
                        <Clock size={12} className="text-gray-400" />
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Question Library</h1>
          <p className="text-gray-600 mt-2">
            Comprehensive collection of interview questions with detailed guidance
          </p>
        </div>
        <Button>
          <Plus size={18} className="mr-2" />
          Add Custom Question
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="space-y-6">
          {/* Search */}
          <Card>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </Card>

          {/* Categories */}
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-xs opacity-75">{category.count}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Filters */}
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="all">All Levels</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="open-ended">Open-ended</option>
                  <option value="situational">Situational</option>
                  <option value="knowledge">Knowledge</option>
                </select>
              </div>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={bookmarkedOnly}
                  onChange={(e) => setBookmarkedOnly(e.target.checked)}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-sm text-gray-700">Bookmarked only</span>
              </label>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Showing {filteredQuestions.length} questions
            </p>
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-400" />
              <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-black focus:border-transparent">
                <option>Most Popular</option>
                <option>Recently Added</option>
                <option>Difficulty: Easy to Hard</option>
                <option>Difficulty: Hard to Easy</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredQuestions.map((question) => (
              <Card key={question.id} hover>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-medium text-gray-900 pr-4">
                        {question.question}
                      </h3>
                      <button
                        className={`flex-shrink-0 p-1 rounded ${
                          question.bookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                        }`}
                      >
                        <Star size={18} fill={question.bookmarked ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(question.category)}`}>
                        {question.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock size={12} />
                        <span>{question.timeToAnswer}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {question.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                      {question.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{question.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        size="sm"
                        onClick={() => setSelectedQuestion(question)}
                      >
                        <Eye size={16} className="mr-1" />
                        View Details
                      </Button>
                      <Button variant="secondary" size="sm">
                        <BookOpen size={16} className="mr-1" />
                        Practice
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredQuestions.length === 0 && (
            <Card>
              <div className="text-center py-12">
                <BookOpen size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or filters to find more questions.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionLibrary;