import React, { useState } from 'react';
import { User, Mail, GraduationCap, MapPin, Calendar, Camera, Save, Edit3 } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    university: 'Stanford University',
    course: 'Computer Science',
    graduationYear: '2024',
    location: 'San Francisco, CA',
    bio: 'Passionate computer science student with a focus on full-stack development and machine learning. Looking for opportunities to apply my skills in a dynamic tech environment.',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Machine Learning', 'SQL'],
    experience: [
      {
        title: 'Software Engineering Intern',
        company: 'Tech Startup Inc.',
        duration: 'Summer 2023',
        description: 'Developed full-stack web applications using React and Node.js'
      },
      {
        title: 'Teaching Assistant',
        company: 'Stanford University',
        duration: '2022-2023',
        description: 'Assisted in CS101 course, helping students with programming fundamentals'
      }
    ],
    achievements: [
      'Dean\'s List - Fall 2023',
      'Hackathon Winner - Stanford TreeHacks 2023',
      'Google Code-in Finalist',
      'Published Research Paper on ML Applications'
    ]
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillsChange = (skills: string) => {
    setProfileData(prev => ({ 
      ...prev, 
      skills: skills.split(',').map(skill => skill.trim()).filter(skill => skill) 
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-2">Manage your personal information and preferences</p>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save size={18} className="mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit3 size={18} className="mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          {/* Profile Picture & Basic Info */}
          <Card>
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={32} className="text-gray-600" />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">
                    <Camera size={16} />
                  </button>
                )}
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{profileData.name}</h2>
              <p className="text-gray-600">{profileData.course}</p>
              <p className="text-gray-500 text-sm">{profileData.university}</p>
            </div>
          </Card>

          {/* Quick Stats */}
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Resume Score</span>
                <span className="font-medium">87%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Practice Sessions</span>
                <span className="font-medium">45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Success Rate</span>
                <span className="font-medium">89%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium">Jan 2024</span>
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4">Recent Achievements</h3>
            <div className="space-y-3">
              {profileData.achievements.slice(0, 3).map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">{achievement}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  label="Full Name"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Input
                  label="Email Address"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Input
                  label="University"
                  value={profileData.university}
                  onChange={(e) => handleInputChange('university', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Input
                  label="Course/Major"
                  value={profileData.course}
                  onChange={(e) => handleInputChange('course', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Input
                  label="Graduation Year"
                  value={profileData.graduationYear}
                  onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Input
                  label="Location"
                  value={profileData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </Card>

          {/* Bio */}
          <Card>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Bio</h3>
            <textarea
              value={profileData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              disabled={!isEditing}
              rows={4}
              className={`w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-black focus:border-transparent ${
                !isEditing ? 'bg-gray-50' : ''
              }`}
              placeholder="Tell us about yourself, your interests, and career goals..."
            />
          </Card>

          {/* Skills */}
          <Card>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills</h3>
            {isEditing ? (
              <div>
                <Input
                  label="Skills (comma-separated)"
                  value={profileData.skills.join(', ')}
                  onChange={(e) => handleSkillsChange(e.target.value)}
                  placeholder="JavaScript, React, Node.js, Python..."
                />
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </Card>

          {/* Experience */}
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Experience</h3>
              {isEditing && (
                <Button variant="ghost" size="sm">
                  Add Experience
                </Button>
              )}
            </div>
            <div className="space-y-6">
              {profileData.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-gray-200 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900">{exp.title}</h4>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500">{exp.duration}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* All Achievements */}
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Achievements</h3>
              {isEditing && (
                <Button variant="ghost" size="sm">
                  Add Achievement
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileData.achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">{achievement}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;