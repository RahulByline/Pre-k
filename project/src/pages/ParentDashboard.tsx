import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, User, LogOut, MessageCircle, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAudio } from '../contexts/AudioContext';
import KodeitLogo from '../components/KodeitLogo';
import AnimatedButton from '../components/AnimatedButton';
import AudioButton from '../components/AudioButton';
import ProgressWheel from '../components/ProgressWheel';

const ParentDashboard: React.FC = () => {
  const { user, logout, createChild } = useAuth();
  const { speak } = useAudio();
  const navigate = useNavigate();
  const [showCreateChild, setShowCreateChild] = useState(false);
  const [childForm, setChildForm] = useState({
    name: '',
    age: 4,
    avatar: '👧',
    gender: 'girl' as 'boy' | 'girl'
  });

  useEffect(() => {
    if (user) {
      speak(`Welcome back, ${user.name}! Let's continue the learning adventure.`);
    }
  }, [user, speak]);

  const handleCreateChild = (e: React.FormEvent) => {
    e.preventDefault();
    createChild(childForm);
    setShowCreateChild(false);
    setChildForm({ name: '', age: 4, avatar: '👧', gender: 'girl' });
    speak(`${childForm.name} has been added to your family! Let's start learning together.`);
  };

  const avatars = {
    girl: ['👧', '👩', '🧒', '👱‍♀️'],
    boy: ['👦', '👨', '🧒', '👱‍♂️']
  };

  const getOverallProgress = (child: any) => {
    const progressValues = Object.values(child.progress) as number[];
    return progressValues.reduce((sum, val) => sum + val, 0) / progressValues.length;
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <AudioButton />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <KodeitLogo size="md" />
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user.name}</span>
            <AnimatedButton
              variant="secondary"
              size="sm"
              onClick={logout}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </AnimatedButton>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Children Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Your Children</h1>
            <AnimatedButton
              onClick={() => setShowCreateChild(true)}
              className="flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Child</span>
            </AnimatedButton>
          </div>

          {/* Children Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {user.children?.map((child, index) => (
              <motion.div
                key={child.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/child-dashboard/${child.id}`)}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{child.avatar}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{child.name}</h3>
                  <p className="text-gray-600 mb-4">Age: {child.age}</p>
                  
                  <div className="mb-4">
                    <ProgressWheel progress={getOverallProgress(child)} size={80}>
                      <span className="text-sm font-bold text-purple-600">
                        {Math.round(getOverallProgress(child))}%
                      </span>
                    </ProgressWheel>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <span>🔥</span>
                      <span>{child.streak} day streak</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>🏆</span>
                      <span>{child.badges.length} badges</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Parent Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-3xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Parent Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-purple-50 rounded-2xl">
                <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">Progress Reports</h3>
                <p className="text-gray-600 text-sm">View detailed analytics of your child's learning journey</p>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-2xl">
                <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">Community</h3>
                <p className="text-gray-600 text-sm">Connect with other parents and share experiences</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-2xl">
                <User className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-800 mb-2">Tips & Guides</h3>
                <p className="text-gray-600 text-sm">Expert advice on supporting your child's development</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Create Child Modal */}
      {showCreateChild && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 w-full max-w-md"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Your Child</h3>
            <form onSubmit={handleCreateChild} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={childForm.name}
                  onChange={(e) => setChildForm({ ...childForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter child's name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  min="3"
                  max="8"
                  value={childForm.age}
                  onChange={(e) => setChildForm({ ...childForm, age: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setChildForm({ ...childForm, gender: 'girl', avatar: '👧' })}
                    className={`flex-1 p-4 rounded-xl border-2 ${
                      childForm.gender === 'girl' 
                        ? 'border-pink-500 bg-pink-50' 
                        : 'border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">👧</div>
                    <div className="text-sm font-medium">Girl</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setChildForm({ ...childForm, gender: 'boy', avatar: '👦' })}
                    className={`flex-1 p-4 rounded-xl border-2 ${
                      childForm.gender === 'boy' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">👦</div>
                    <div className="text-sm font-medium">Boy</div>
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Choose Avatar</label>
                <div className="grid grid-cols-4 gap-2">
                  {avatars[childForm.gender].map((avatar, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setChildForm({ ...childForm, avatar })}
                      className={`p-3 rounded-xl border-2 text-2xl ${
                        childForm.avatar === avatar 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-300'
                      }`}
                    >
                      {avatar}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-4">
                <AnimatedButton
                  type="button"
                  variant="secondary"
                  onClick={() => setShowCreateChild(false)}
                  className="flex-1"
                >
                  Cancel
                </AnimatedButton>
                <AnimatedButton
                  type="submit"
                  className="flex-1"
                >
                  Add Child
                </AnimatedButton>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ParentDashboard;