import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Heart, Star, Users } from 'lucide-react';
import KodeitLogo from '../components/KodeitLogo';
import AnimatedButton from '../components/AnimatedButton';
import AudioButton from '../components/AudioButton';
import { useAudio } from '../contexts/AudioContext';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { speak } = useAudio();

  useEffect(() => {
    // Welcome message
    setTimeout(() => {
      speak("Welcome to All About Me and My Family! A fun learning adventure for young minds.");
    }, 1000);
  }, [speak]);

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description: "Engaging activities based on educational standards"
    },
    {
      icon: Heart,
      title: "Family-Centered",
      description: "Learn about emotions, family, and relationships"
    },
    {
      icon: Star,
      title: "Progress Tracking",
      description: "Monitor your child's learning journey"
    },
    {
      icon: Users,
      title: "Multi-Portal Access",
      description: "Separate dashboards for parents, teachers, and admins"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <AudioButton />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="mb-8">
            <KodeitLogo size="lg" className="justify-center" />
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-gray-800 mb-6"
          >
            Kodeit Educational
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
          >
            An interactive educational platform designed for Pre-K to early primary students. 
            Discover, learn, and grow through engaging activities about emotions, family, and self-discovery.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <AnimatedButton
              size="lg"
              onClick={() => navigate('/auth')}
              className="text-xl px-12 py-4"
            >
              Get Started 🚀
            </AnimatedButton>
          </motion.div>
        </motion.div>

        {/* Animated Characters */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex justify-center mt-16 space-x-8"
        >
          {['👧', '👦', '👨‍👩‍👧‍👦', '📚'].map((emoji, index) => (
            <motion.div
              key={index}
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                delay: index * 0.2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="text-6xl"
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-24 bg-white rounded-3xl p-12 shadow-xl"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At KODEIT, we believe every child deserves access to engaging, interactive learning experiences. 
              Our platform combines cutting-edge technology with proven educational methodologies to create 
              a safe, fun, and effective learning environment where children can explore their identity, 
              understand their emotions, and celebrate their family connections.
            </p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-16 text-center text-gray-500"
        >
          <p>© 2024 KODEIT INC. All rights reserved.</p>
          <p className="mt-2">Developed with ❤️ by KODEIT for young learners everywhere</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default LandingPage;