import React, { useState, useRef } from 'react';
import { Camera, Upload, Play, Pause, Square, RotateCcw, Download, Eye, Mic, Volume2 } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import CircularProgress from '../ui/CircularProgress';

const VideoAnalysis: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const questions = [
    "Tell me about yourself and your background.",
    "Why are you interested in this position?",
    "What are your greatest strengths and weaknesses?",
    "Describe a challenging project you've worked on.",
    "Where do you see yourself in 5 years?"
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(blob);
        setRecordedVideo(videoUrl);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      // Start timer
      const timer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(timer);
      }, 300000); // 5 minutes max

    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      setRecordingTime(0);
    }
  };

  const analyzeVideo = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setAnalysisResults({
        eyeContactPercentage: 78,
        postureScore: 85,
        gestureAnalysis: "Natural and confident hand gestures",
        emotionalAnalysis: "Positive and engaged demeanor",
        speechQuality: 82,
        confidence: 79,
        overallScore: 81,
        improvements: [
          "Maintain eye contact for longer periods",
          "Speak slightly slower for better clarity",
          "Use more varied hand gestures",
          "Improve posture in the first 30 seconds"
        ],
        strengths: [
          "Clear articulation and pronunciation",
          "Good facial expressions",
          "Professional appearance",
          "Structured responses"
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (analysisResults) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h1 className="text-3xl font-bold text-gray-900">Video Analysis Results</h1>
          <Button
            onClick={() => {
              setAnalysisResults(null);
              setRecordedVideo(null);
            }}
            variant="secondary"
          >
            <RotateCcw size={18} className="mr-2" />
            New Recording
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Video Playback */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Interview Recording</h2>
              {recordedVideo && (
                <video
                  src={recordedVideo}
                  controls
                  className="w-full rounded-lg"
                  style={{ maxHeight: '400px' }}
                />
              )}
            </Card>

            {/* Overall Score */}
            <Card>
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Overall Performance</h2>
                <CircularProgress 
                  value={analysisResults.overallScore} 
                  size={150}
                  color="#10B981"
                />
                <p className="text-lg font-medium text-gray-600 mt-4">
                  Great job! You're showing strong interview skills
                </p>
              </div>
            </Card>

            {/* Detailed Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Eye Contact</h3>
                  <Eye size={20} className="text-blue-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Percentage</span>
                    <span className="text-sm font-medium">{analysisResults.eyeContactPercentage}%</span>
                  </div>
                  <ProgressBar value={analysisResults.eyeContactPercentage} color="primary" />
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Posture</h3>
                  <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Score</span>
                    <span className="text-sm font-medium">{analysisResults.postureScore}%</span>
                  </div>
                  <ProgressBar value={analysisResults.postureScore} color="success" />
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Speech Quality</h3>
                  <Mic size={20} className="text-purple-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Clarity</span>
                    <span className="text-sm font-medium">{analysisResults.speechQuality}%</span>
                  </div>
                  <ProgressBar value={analysisResults.speechQuality} color="warning" />
                </div>
              </Card>

              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Confidence</h3>
                  <Volume2 size={20} className="text-red-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Level</span>
                    <span className="text-sm font-medium">{analysisResults.confidence}%</span>
                  </div>
                  <ProgressBar value={analysisResults.confidence} color="danger" />
                </div>
              </Card>
            </div>

            {/* Strengths and Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Strengths</h3>
                <div className="space-y-3">
                  {analysisResults.strengths.map((strength: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">{strength}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Areas for Improvement</h3>
                <div className="space-y-3">
                  {analysisResults.improvements.map((improvement: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">{improvement}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <Button className="w-full">
                  <Download size={18} className="mr-2" />
                  Download Report
                </Button>
                <Button variant="secondary" className="w-full">
                  Practice Again
                </Button>
                <Button variant="ghost" className="w-full">
                  Share Results
                </Button>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Question Answered</h3>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  "{questions[currentQuestion]}"
                </p>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Next Steps</h3>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900">Live Interview</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Ready for a real-time interview simulation?
                  </p>
                  <Button variant="ghost" size="sm" className="mt-2">
                    Start Live Session →
                  </Button>
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
        <h1 className="text-3xl font-bold text-gray-900">Video Interview Practice</h1>
        <p className="text-gray-600 mt-2">
          Practice your interview skills with AI-powered video analysis and feedback
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Video Recording Area */}
          <Card>
            <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
              {!recordedVideo ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={recordedVideo}
                  className="w-full h-full object-cover"
                  controls
                />
              )}
              
              {isRecording && (
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white font-medium">REC {formatTime(recordingTime)}</span>
                </div>
              )}
            </div>

            {/* Recording Controls */}
            <div className="flex justify-center items-center space-x-4 mt-6">
              {!isRecording && !recordedVideo && (
                <Button onClick={startRecording} size="lg">
                  <Camera size={20} className="mr-2" />
                  Start Recording
                </Button>
              )}
              
              {isRecording && (
                <>
                  <Button onClick={stopRecording} variant="danger" size="lg">
                    <Square size={20} className="mr-2" />
                    Stop Recording
                  </Button>
                </>
              )}

              {recordedVideo && !isAnalyzing && (
                <div className="flex space-x-3">
                  <Button onClick={analyzeVideo} size="lg">
                    Analyze Video
                  </Button>
                  <Button 
                    onClick={() => setRecordedVideo(null)} 
                    variant="secondary"
                  >
                    <RotateCcw size={18} className="mr-2" />
                    Re-record
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* File Upload Alternative */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Or Upload Existing Video</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload size={48} className="text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Upload a video file for analysis
              </p>
              <input
                type="file"
                accept="video/*"
                className="hidden"
                id="video-upload"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setRecordedVideo(url);
                  }
                }}
              />
              <Button
                variant="secondary"
                onClick={() => document.getElementById('video-upload')?.click()}
              >
                Choose File
              </Button>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Current Question</h3>
            <div className="p-4 bg-blue-50 rounded-lg mb-4">
              <p className="text-blue-900 font-medium">
                Question {currentQuestion + 1} of {questions.length}
              </p>
              <p className="text-blue-800 mt-2">
                {questions[currentQuestion]}
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                disabled={currentQuestion === questions.length - 1}
              >
                Next
              </Button>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Recording Tips</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <p>Look directly at the camera for good eye contact</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <p>Sit up straight and maintain good posture</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <p>Speak clearly and at a moderate pace</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                <p>Use natural hand gestures to emphasize points</p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">What We Analyze</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Eye size={16} className="text-blue-500" />
                <span className="text-sm text-gray-700">Eye contact percentage</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Body posture and positioning</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mic size={16} className="text-purple-500" />
                <span className="text-sm text-gray-700">Speech clarity and pace</span>
              </div>
              <div className="flex items-center space-x-3">
                <Volume2 size={16} className="text-red-500" />
                <span className="text-sm text-gray-700">Confidence and engagement</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {isAnalyzing && (
        <Card>
          <div className="text-center py-8">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Your Video</h3>
            <p className="text-gray-600">
              Our AI is analyzing your eye contact, posture, speech quality, and overall confidence...
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default VideoAnalysis;