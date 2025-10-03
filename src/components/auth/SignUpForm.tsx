import React, { useState } from 'react';
import { Mail, Lock, User, GraduationCap, Eye, EyeOff } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

interface SignUpFormProps {
  onSignUp: (data: SignUpData) => void;
  onSwitchToLogin: () => void;
  loading?: boolean;
}

interface SignUpData {
  name: string;
  email: string;
  university: string;
  course: string;
  password: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp, onSwitchToLogin, loading = false }) => {
  const [formData, setFormData] = useState<SignUpData>({
    name: '',
    email: '',
    university: '',
    course: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (field: keyof SignUpData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignUp(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-black rounded-2xl flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">P</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-600 mt-2">Start your interview preparation journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange('name')}
              className="pl-10"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange('email')}
              className="pl-10"
              required
            />
          </div>

          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="University"
              value={formData.university}
              onChange={handleChange('university')}
              className="pl-10"
              required
            />
          </div>

          <div className="relative">
            <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Course/Major"
              value={formData.course}
              onChange={handleChange('course')}
              className="pl-10"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange('password')}
              className="pl-10 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <label className="flex items-start space-x-2">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="rounded border-gray-300 text-black focus:ring-black mt-0.5"
              required
            />
            <span className="text-sm text-gray-600">
              I agree to the{' '}
              <a href="#" className="text-black hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-black hover:underline">Privacy Policy</a>
            </span>
          </label>

          <Button type="submit" className="w-full" loading={loading}>
            Create Account
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="font-medium text-black hover:underline"
          >
            Sign in
          </button>
        </p>
      </Card>
    </div>
  );
};

export default SignUpForm;