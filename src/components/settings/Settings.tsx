import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Download, 
  Trash2, 
  Moon, 
  Sun,
  Globe,
  Camera,
  Mic,
  Volume2
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    // Account settings
    name: 'Alex Johnson',
    email: 'alex.johnson@university.edu',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Notification settings
    emailNotifications: true,
    practiceReminders: true,
    weeklyReports: true,
    marketingEmails: false,
    
    // Privacy settings
    profileVisibility: 'private',
    dataSharing: false,
    analyticsTracking: true,
    
    // Appearance settings
    theme: 'light',
    language: 'en',
    
    // Device settings
    cameraPermission: true,
    microphonePermission: true,
    autoRecord: false
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Sun },
    { id: 'devices', label: 'Devices', icon: Camera }
  ];

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
        <div className="space-y-4">
          <Input
            label="Full Name"
            value={settings.name}
            onChange={(e) => handleSettingChange('name', e.target.value)}
          />
          <Input
            label="Email Address"
            type="email"
            value={settings.email}
            onChange={(e) => handleSettingChange('email', e.target.value)}
          />
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
        <div className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            value={settings.currentPassword}
            onChange={(e) => handleSettingChange('currentPassword', e.target.value)}
          />
          <Input
            label="New Password"
            type="password"
            value={settings.newPassword}
            onChange={(e) => handleSettingChange('newPassword', e.target.value)}
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={settings.confirmPassword}
            onChange={(e) => handleSettingChange('confirmPassword', e.target.value)}
          />
          <Button>Update Password</Button>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Export Data</h4>
              <p className="text-sm text-gray-600">Download all your data and reports</p>
            </div>
            <Button variant="secondary">
              <Download size={16} className="mr-2" />
              Export
            </Button>
          </div>
          <div className="flex justify-between items-center p-4 border border-red-200 rounded-lg bg-red-50">
            <div>
              <h4 className="font-medium text-red-900">Delete Account</h4>
              <p className="text-sm text-red-600">Permanently delete your account and all data</p>
            </div>
            <Button variant="danger">
              <Trash2 size={16} className="mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive general notifications via email' },
            { key: 'practiceReminders', label: 'Practice Reminders', desc: 'Get reminded to practice regularly' },
            { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Receive weekly progress summaries' },
            { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive updates about new features and tips' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{item.label}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[item.key as keyof typeof settings] as boolean}
                  onChange={(e) => handleSettingChange(item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Controls</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Profile Visibility</h4>
              <p className="text-sm text-gray-600">Control who can see your profile</p>
            </div>
            <select
              value={settings.profileVisibility}
              onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="friends">Friends Only</option>
            </select>
          </div>

          {[
            { key: 'dataSharing', label: 'Data Sharing', desc: 'Allow anonymous data sharing for research' },
            { key: 'analyticsTracking', label: 'Analytics Tracking', desc: 'Help improve the platform with usage analytics' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{item.label}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[item.key as keyof typeof settings] as boolean}
                  onChange={(e) => handleSettingChange(item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Download Your Data</h4>
              <p className="text-sm text-gray-600">Get a copy of all your data</p>
            </div>
            <Button variant="secondary">
              <Download size={16} className="mr-2" />
              Download
            </Button>
          </div>
          <div className="flex justify-between items-center p-4 border border-red-200 rounded-lg bg-red-50">
            <div>
              <h4 className="font-medium text-red-900">Clear All Data</h4>
              <p className="text-sm text-red-600">Permanently delete all your practice data</p>
            </div>
            <Button variant="danger">
              <Trash2 size={16} className="mr-2" />
              Clear Data
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { value: 'light', label: 'Light', icon: Sun },
            { value: 'dark', label: 'Dark', icon: Moon },
            { value: 'system', label: 'System', icon: SettingsIcon }
          ].map((theme) => {
            const Icon = theme.icon;
            return (
              <label key={theme.value} className="relative">
                <input
                  type="radio"
                  name="theme"
                  value={theme.value}
                  checked={settings.theme === theme.value}
                  onChange={(e) => handleSettingChange('theme', e.target.value)}
                  className="sr-only"
                />
                <div className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  settings.theme === theme.value 
                    ? 'border-black bg-gray-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <div className="flex flex-col items-center space-y-2">
                    <Icon size={24} />
                    <span className="font-medium">{theme.label}</span>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Language & Region</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Globe size={20} className="text-gray-500" />
              <div>
                <h4 className="font-medium text-gray-900">Language</h4>
                <p className="text-sm text-gray-600">Choose your preferred language</p>
              </div>
            </div>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-black focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderDeviceSettings = () => (
    <div className="space-y-6">
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Camera & Microphone</h3>
        <div className="space-y-4">
          {[
            { key: 'cameraPermission', label: 'Camera Access', desc: 'Allow access to camera for video recording', icon: Camera },
            { key: 'microphonePermission', label: 'Microphone Access', desc: 'Allow access to microphone for audio recording', icon: Mic },
            { key: 'autoRecord', label: 'Auto-Record', desc: 'Automatically start recording during practice sessions', icon: Volume2 }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon size={20} className="text-gray-500" />
                  <div>
                    <h4 className="font-medium text-gray-900">{item.label}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[item.key as keyof typeof settings] as boolean}
                    onChange={(e) => handleSettingChange(item.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Information</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Camera Status</h4>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Connected</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Microphone Status</h4>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Connected</span>
              </div>
            </div>
          </div>
          <Button variant="secondary" className="w-full">
            Test Camera & Microphone
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return renderAccountSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'devices':
        return renderDeviceSettings();
      default:
        return renderAccountSettings();
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account preferences and application settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                  activeTab === tab.id
                    ? 'bg-black text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {renderContent()}
          
          {/* Save Button */}
          <div className="mt-8 flex justify-end space-x-3">
            <Button variant="secondary">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;