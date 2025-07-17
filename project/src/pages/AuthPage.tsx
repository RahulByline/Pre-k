import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAudio } from '../contexts/AudioContext';
import KodeitLogo from '../components/KodeitLogo';
import AnimatedButton from '../components/AnimatedButton';
import AudioButton from '../components/AudioButton';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'parent'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register } = useAuth();
  const { speak } = useAudio();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        speak("Welcome back! Redirecting to your dashboard.");
        
        // Route based on email pattern for demo
        if (formData.email.includes('admin')) {
          navigate('/admin');
        } else if (formData.email.includes('teacher')) {
          navigate('/teacher');
        } else {
          navigate('/parent-dashboard');
        }
      } else {
        await register(formData.email, formData.password, formData.name, formData.role);
        speak("Registration successful! Welcome to KODEIT!");
        
        if (formData.role === 'parent') {
          navigate('/parent-dashboard');
        } else if (formData.role === 'teacher') {
          navigate('/teacher');
        } else {
          navigate('/admin');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
      speak("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center p-4">
      <AudioButton />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <KodeitLogo size="md" className="justify-center mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">
            {isLogin ? 'Welcome Back!' : 'Join KODEIT'}
          </h2>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Sign in to continue your learning journey' : 'Create your account to get started'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <div className="relative">
                <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                >
                  <option value="parent">Parent</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm"
            >
              {error}
            </motion.div>
          )}

          <AnimatedButton
            type="submit"
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </AnimatedButton>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-600 hover:text-purple-700 font-medium mt-1"
          >
            {isLogin ? 'Sign up here' : 'Sign in here'}
          </button>
        </div>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-gray-50 rounded-xl"
        >
          <p className="text-xs text-gray-500 text-center mb-2">Demo Credentials:</p>
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>Parent:</strong> parent@demo.com / password</p>
            <p><strong>Teacher:</strong> teacher@demo.com / password</p>
            <p><strong>Admin:</strong> admin@demo.com / password</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;