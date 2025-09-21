import React, { memo } from 'react';
import { Brain, Gamepad2, ClipboardList, TrendingUp, Award, Clock, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = memo(function Dashboard() {
  const { profile } = useAuth();

  const stats = [
    { icon: Brain, label: 'AI Detections', value: '8', change: '+2 this week', color: 'blue' },
    { icon: Gamepad2, label: 'Games Played', value: '24', change: '+5 today', color: 'green' },
    { icon: ClipboardList, label: 'Tests Completed', value: '12', change: '+1 this week', color: 'purple' },
    { icon: Award, label: 'Best Score', value: '92%', change: 'Memory Game', color: 'yellow' },
  ];

  const recentActivities = [
    { activity: 'Completed Memory Game', score: '88%', time: '2 hours ago', type: 'game' },
    { activity: 'AI Brain Scan Analysis', result: 'Low Risk', time: '1 day ago', type: 'analysis' },
    { activity: 'Attention Test', score: '85%', time: '2 days ago', type: 'test' },
    { activity: 'Reaction Time Game', score: '450ms avg', time: '3 days ago', type: 'game' },
  ];

  const quickActions = [
    { 
      title: 'New AI Detection', 
      description: 'Upload brain scan for analysis', 
      icon: Brain, 
      link: '/ai-detection',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      title: 'Play Brain Games', 
      description: 'Train your cognitive abilities', 
      icon: Gamepad2, 
      link: '/games',
      color: 'from-green-500 to-green-600'
    },
    { 
      title: 'Take Assessment', 
      description: 'Complete neurological test', 
      icon: ClipboardList, 
      link: '/tests',
      color: 'from-purple-500 to-purple-600'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back, {profile?.full_name || 'User'}!
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Here's your neurological health overview
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            Account Active
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.link}
                className="group relative overflow-hidden rounded-lg p-6 bg-gradient-to-r text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${action.color.replace('from-', '').replace('to-', ', ')})` }}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-8 w-8" />
                  <div>
                    <h3 className="font-medium">{action.title}</h3>
                    <p className="text-sm opacity-90">{action.description}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 transition-opacity duration-300"></div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  activity.type === 'game' ? 'bg-green-400' :
                  activity.type === 'analysis' ? 'bg-blue-400' : 'bg-purple-400'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.activity}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.score || activity.result} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Health Insights
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Cognitive Performance
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Improving over time
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Risk Assessment
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Low risk detected
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Next Checkup
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Recommended in 30 days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Dashboard;