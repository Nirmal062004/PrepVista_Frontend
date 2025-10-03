import React, { useState, useRef, useEffect } from 'react';
import { Camera, Mic, MicOff, Video, VideoOff, Phone, Settings, Eye, Volume2, Clock, Pause } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';

const LiveInterview: React.FC = () => {
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [interviewType, setInterviewType] = useState<'technical' | 'hr' | 'behavioral'>('hr');
  const [difficulty, setDifficulty] = useState(2);
  const [duration, setDuration] = useState(30);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [realTimeFeedback, setRealTimeFeedback] = useState({
    eyeContact: 75,
    posture: 82,
    confidence: 68,
    speechPace: 85
  });
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [finalResults, setFinalResults] = useState<any>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const questions = {
    hr: [
      "Tell me about yourself and your background.",
      "Why are you interested in this position?",
      "What are your greatest strengths?",
      "Describe a challenging situation you've overcome.",
      "Where do you see yourself in 5 years?"
    ],
    technical: [
      "Explain the difference between REST and GraphQL APIs.",
      "How would you optimize a slow database query?",
      "Describe your approach to debugging a complex issue.",
      "What are the principles of good software architecture?",
      "How do you ensure code quality in your projects?"
    ],
    behavioral: [
      "Describe a time when you had to work with a difficult team member.",
      "Tell me about a project where you had to learn something new quickly.",
      "How do you handle tight deadlines and pressure?",
      "Describe a situation where you had to make a difficult decision.",
      "Tell me about a time you failed and what you learned from it."
    ]
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isInterviewActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            endInterview();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isInterviewActive, timeRemaining]);

  // Simulate real-time feedback updates
  useEffect(() => {
    if (isInterviewActive) {
      const feedbackInterval = setInterval(() => {
        setRealTimeFeedback(prev => ({
          eyeContact: Math.max(0, Math.min(100, prev.eyeContact + (Math.random() - 0.5) * 10)),
          posture: Math.max(0, Math.min(100, prev.posture + (Math.random() - 0.5) * 8)),
          confidence: Math.max(0, Math.min(100, prev.confidence + (Math.random() - 0.5) * 12)),
          speechPace: Math.max(0, Math.min(100, prev.speechPace + (Math.random() - 0.5) * 6))
        }));
      }, 2000);

      return () => clearInterval(feedbackInterval);
    }
  }, [isInterviewActive]);

  const startInterview = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setIsInterviewActive(true);
      setTimeRemaining(duration * 60);
      setCurrentQuestion(0);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const endInterview = () => {
    setIsInterviewActive(false);
    setInterviewComplete(true);
    
    // Stop video stream
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }

    // Generate final results
    setFinalResults({
      overallScore: 78,
      duration: duration - Math.floor(timeRemaining / 60),
      questionsAnswered: currentQuestion + 1,
      averageEyeContact: 76,
      averagePosture: 81,
      averageConfidence: 72,
      averageSpeechPace: 84,
      feedback: [
        "Strong technical knowledge demonstrated",
        "Good communication skills",
        "Maintain better eye contact",
        "Speak with more confidence"
      ]
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions[interviewType].length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (interviewComplete && finalResults) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Interview Complete!</h1>
          <p className="text-gray-600 mt-2">Here's your performance summary</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Overall Performance</h2>
                <div className="w-32 h-32 mx-auto mb-4">
                  <div className="relative w-full h-full">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#f3f4f6"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#10b981"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - finalResults.overallScore / 100)}`}
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">{finalResults.overallScore}%</span>
                    </div>
                  </div>
                </div>
                <p className="text-lg font-medium text-gray-600">
                  Great performance! You're interview-ready.
                </p>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h3 className="font-semibold text-gray-900 mb-4">Session Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{finalResults.duration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Questions Answered</span>
                    <span className="font-medium">{finalResults.questionsAnswered}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interview Type</span>
                    <span className="font-medium capitalize">{interviewType}</span>
                  </div>
                </div>
              </Card>

              <Card>
                <h3 className="font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Eye Contact</span>
                      <span className="text-sm font-medium">{finalResults.averageEyeContact}%</span>
                    </div>
                    <ProgressBar value={finalResults.averageEyeContact} size="sm" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Posture</span>
                      <span className="text-sm font-medium">{finalResults.averagePosture}%</span>
                    </div>
                    <ProgressBar value={finalResults.averagePosture} size="sm" color="success" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Confidence</span>
                      <span className="text-sm font-medium">{finalResults.averageConfidence}%</span>
                    </div>
                    <ProgressBar value={finalResults.averageConfidence} size="sm" color="warning" />
                  </div>
                </div>
              </Card>
            </div>

            <Card>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Feedback & Recommendations</h3>
              <div className="space-y-3">
                {finalResults.feedback.map((item: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <Button className="w-full">Download Report</Button>
                <Button variant="secondary" className="w-full" onClick={() => {
                  setInterviewComplete(false);
                  setFinalResults(null);
                }}>
                  New Interview
                </Button>
                <Button variant="ghost" className="w-full">Share Results</Button>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Next Steps</h3>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900">Practice More</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Try different interview types to improve
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900">Video Analysis</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Record yourself for detailed feedback
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (isInterviewActive) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Live Interview Session</h1>
            <p className="text-gray-600">Question {currentQuestion + 1} of {questions[interviewType].length}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock size={18} className="text-gray-500" />
              <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
            </div>
            <Button variant="danger" onClick={endInterview}>
              <Phone size={18} className="mr-2" />
              End Interview
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            {/* Video Interface */}
            <Card padding="none">
              <div className="grid grid-cols-1 md:grid-cols-2 h-96">
                {/* User Video */}
                <div className="relative bg-gray-900">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => setIsVideoOn(!isVideoOn)}
                        className={`p-3 rounded-full ${isVideoOn ? 'bg-gray-700' : 'bg-red-600'} text-white`}
                      >
                        {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
                      </button>
                      <button
                        onClick={() => setIsAudioOn(!isAudioOn)}
                        className={`p-3 rounded-full ${isAudioOn ? 'bg-gray-700' : 'bg-red-600'} text-white`}
                      >
                        {isAudioOn ? <Mic size={20} /> : <MicOff size={20} />}
                      </button>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      You
                    </span>
                  </div>
                </div>

                {/* AI Interviewer */}
                <div className="relative bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <span className="text-blue-900 font-bold text-xl">AI</span>
                      </div>
                    </div>
                    <p className="text-lg font-medium">AI Interviewer</p>
                    <p className="text-sm opacity-75">Listening...</p>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                      Interviewer
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Current Question */}
            <Card>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Current Question</h3>
                <Button variant="ghost" size="sm" onClick={nextQuestion}>
                  Next Question
                </Button>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-900 font-medium text-lg">
                  {questions[interviewType][currentQuestion]}
                </p>
              </div>
              <div className="mt-4">
                <ProgressBar 
                  value={(currentQuestion + 1) / questions[interviewType].length * 100} 
                  label={`Question ${currentQuestion + 1} of ${questions[interviewType].length}`}
                />
              </div>
            </Card>
          </div>

          {/* Real-time Feedback Sidebar */}
          <div className="space-y-6">
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Live Feedback</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Eye size={16} className="text-blue-500" />
                      <span className="text-sm font-medium">Eye Contact</span>
                    </div>
                    <span className="text-sm text-gray-600">{Math.round(realTimeFeedback.eyeContact)}%</span>
                  </div>
                  <ProgressBar value={realTimeFeedback.eyeContact} size="sm" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">Posture</span>
                    </div>
                    <span className="text-sm text-gray-600">{Math.round(realTimeFeedback.posture)}%</span>
                  </div>
                  <ProgressBar value={realTimeFeedback.posture} size="sm" color="success" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Volume2 size={16} className="text-purple-500" />
                      <span className="text-sm font-medium">Confidence</span>
                    </div>
                    <span className="text-sm text-gray-600">{Math.round(realTimeFeedback.confidence)}%</span>
                  </div>
                  <ProgressBar value={realTimeFeedback.confidence} size="sm" color="warning" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Mic size={16} className="text-red-500" />
                      <span className="text-sm font-medium">Speech Pace</span>
                    </div>
                    <span className="text-sm text-gray-600">{Math.round(realTimeFeedback.speechPace)}%</span>
                  </div>
                  <ProgressBar value={realTimeFeedback.speechPace} size="sm" color="danger" />
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Tips</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
                  <p className="text-yellow-800">Look directly at the camera</p>
                </div>
                <div className="p-2 bg-green-50 rounded border-l-4 border-green-400">
                  <p className="text-green-800">Great posture! Keep it up</p>
                </div>
                <div className="p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                  <p className="text-blue-800">Speak with more confidence</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Live Interview Simulation</h1>
        <p className="text-gray-600 mt-2">
          Experience realistic interview scenarios with real-time AI feedback
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Interview Setup</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Interview Type
              </label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { value: 'hr', label: 'HR Interview', desc: 'General questions about background and fit' },
                  { value: 'technical', label: 'Technical Interview', desc: 'Role-specific technical questions' },
                  { value: 'behavioral', label: 'Behavioral Interview', desc: 'Situation-based questions' }
                ].map((type) => (
                  <label key={type.value} className="relative">
                    <input
                      type="radio"
                      name="interviewType"
                      value={type.value}
                      checked={interviewType === type.value}
                      onChange={(e) => setInterviewType(e.target.value as any)}
                      className="sr-only"
                    />
                    <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      interviewType === type.value 
                        ? 'border-black bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="font-medium text-gray-900">{type.label}</div>
                      <div className="text-sm text-gray-500 mt-1">{type.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Difficulty Level: {difficulty}/5
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={difficulty}
                onChange={(e) => setDifficulty(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Duration: {duration} minutes
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
              </select>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Camera & Audio Test</h2>
          
          <div className="space-y-6">
            <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={`p-3 rounded-full ${isVideoOn ? 'bg-gray-700' : 'bg-red-600'} text-white`}
                  >
                    {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
                  </button>
                  <button
                    onClick={() => setIsAudioOn(!isAudioOn)}
                    className={`p-3 rounded-full ${isAudioOn ? 'bg-gray-700' : 'bg-red-600'} text-white`}
                  >
                    {isAudioOn ? <Mic size={20} /> : <MicOff size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Camera size={18} className="text-green-600" />
                  <span className="text-green-800">Camera</span>
                </div>
                <span className="text-green-600 font-medium">Connected</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Mic size={18} className="text-green-600" />
                  <span className="text-green-800">Microphone</span>
                </div>
                <span className="text-green-600 font-medium">Connected</span>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Interview Tips</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Ensure good lighting on your face</li>
                <li>• Maintain eye contact with the camera</li>
                <li>• Speak clearly and at a moderate pace</li>
                <li>• Keep your background professional</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button size="lg" onClick={startInterview} className="px-8">
          Start Interview Session
        </Button>
      </div>
    </div>
  );
};

export default LiveInterview;