import React, { useState } from 'react';
import { Upload, FileText, Download, RefreshCw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import CircularProgress from '../ui/CircularProgress';

const ResumeAnalysis: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setAnalysis({
        atsScore: 87,
        overallRating: 'A',
        strengths: [
          'Strong technical skills section',
          'Clear work experience descriptions',
          'Proper formatting and structure',
          'Relevant keywords present'
        ],
        weaknesses: [
          'Missing soft skills section',
          'Could include more metrics',
          'Education section needs improvement'
        ],
        suggestions: [
          'Add a professional summary at the top',
          'Include more quantifiable achievements',
          'Optimize for applicant tracking systems',
          'Consider adding relevant certifications'
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  if (analysis) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Resume Analysis Results</h1>
          <Button
            onClick={() => {
              setAnalysis(null);
              setSelectedFile(null);
            }}
            variant="secondary"
          >
            <RefreshCw size={18} className="mr-2" />
            Analyze New Resume
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Overall Score */}
            <Card>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">ATS Compatibility Score</h2>
                <CircularProgress 
                  value={analysis.atsScore} 
                  size={150}
                  color="#10B981"
                />
                <p className="text-lg font-medium text-gray-600 mt-4">
                  Your resume is highly optimized for ATS systems
                </p>
              </div>
            </Card>

            {/* Detailed Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Strengths</h3>
                  <p className="text-3xl font-bold text-green-600">{analysis.strengths.length}</p>
                  <p className="text-sm text-gray-500">Areas of excellence</p>
                </div>
              </Card>

              <Card>
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle size={32} className="text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Improvements</h3>
                  <p className="text-3xl font-bold text-orange-600">{analysis.weaknesses.length}</p>
                  <p className="text-sm text-gray-500">Areas to improve</p>
                </div>
              </Card>

              <Card>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText size={32} className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Overall</h3>
                  <p className="text-3xl font-bold text-blue-600">{analysis.overallRating}</p>
                  <p className="text-sm text-gray-500">Grade rating</p>
                </div>
              </Card>
            </div>

            {/* Detailed Sections */}
            <Card>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Strengths</h3>
              <div className="space-y-3">
                {analysis.strengths.map((strength: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{strength}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Areas for Improvement</h3>
              <div className="space-y-3">
                {analysis.weaknesses.map((weakness: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <XCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{weakness}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommendations</h3>
              <div className="space-y-3">
                {analysis.suggestions.map((suggestion: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3">
                    <AlertCircle size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{suggestion}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <Button className="w-full">
                  <Download size={18} className="mr-2" />
                  Download Report
                </Button>
                <Button variant="secondary" className="w-full">
                  <FileText size={18} className="mr-2" />
                  View Improved Resume
                </Button>
                <Button variant="ghost" className="w-full">
                  Share Results
                </Button>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-gray-900 mb-4">Next Steps</h3>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900">Practice Video Interview</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Test your interview skills with AI-powered feedback
                  </p>
                  <Button variant="ghost" size="sm" className="mt-2">
                    Start Practice →
                  </Button>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900">Live Interview Simulation</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Experience realistic interview scenarios
                  </p>
                  <Button variant="ghost" size="sm" className="mt-2">
                    Schedule Now →
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
        <h1 className="text-3xl font-bold text-gray-900">Resume Analysis</h1>
        <p className="text-gray-600 mt-2">
          Upload your resume and job description to get detailed ATS compatibility analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Resume</h2>
          
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center transition-colors
              ${dragOver ? 'border-black bg-gray-50' : 'border-gray-300'}
              ${selectedFile ? 'bg-green-50 border-green-300' : ''}
            `}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
          >
            {selectedFile ? (
              <div className="space-y-4">
                <CheckCircle size={48} className="text-green-500 mx-auto" />
                <div>
                  <p className="font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedFile(null)}
                >
                  Remove File
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload size={48} className="text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Drag and drop your resume here
                  </p>
                  <p className="text-gray-500">or click to browse files</p>
                </div>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                  className="hidden"
                  id="resume-upload"
                />
                <Button
                  variant="secondary"
                  onClick={() => document.getElementById('resume-upload')?.click()}
                >
                  Choose File
                </Button>
              </div>
            )}
          </div>
          
          <p className="text-xs text-gray-500 mt-2 text-center">
            Supported formats: PDF (Max 10MB)
          </p>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description (Optional)</h2>
          
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here to get tailored feedback..."
            className="w-full h-64 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
          
          <p className="text-xs text-gray-500 mt-2">
            Adding a job description helps us provide more targeted recommendations
          </p>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleAnalyze}
          disabled={!selectedFile}
          loading={isAnalyzing}
          className="px-8"
        >
          {isAnalyzing ? 'Analyzing Resume...' : 'Analyze Resume'}
        </Button>
      </div>

      {isAnalyzing && (
        <Card>
          <div className="text-center py-8">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Analyzing Your Resume</h3>
            <p className="text-gray-600">
              Our AI is reviewing your resume for ATS compatibility, formatting, and content optimization...
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ResumeAnalysis;