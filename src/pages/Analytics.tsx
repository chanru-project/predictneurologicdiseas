import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Target,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Download,
  User,
  Stethoscope,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

interface AnalysisData {
  cognitiveScore: number;
  memoryScore: number;
  attentionScore: number;
  motorScore: number;
  socialScore: number;
  overallRisk: 'low' | 'medium' | 'high';
  problems: string[];
  recommendations: string[];
  doctorConsultation: boolean;
}

interface DoctorProfile {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  location: string;
  phone: string;
  email: string;
  availability: string;
  consultationFee: number;
}

const mockAnalysisData: AnalysisData = {
  cognitiveScore: 78,
  memoryScore: 82,
  attentionScore: 75,
  motorScore: 88,
  socialScore: 71,
  overallRisk: 'medium',
  problems: [
    'Mild attention deficit detected',
    'Slight decline in social cognition',
    'Processing speed below average'
  ],
  recommendations: [
    'Engage in daily memory exercises',
    'Practice attention training games',
    'Maintain regular social interactions',
    'Consider cognitive behavioral therapy',
    'Schedule follow-up assessment in 3 months'
  ],
  doctorConsultation: false
};

const doctors: DoctorProfile[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Neurologist',
    rating: 4.9,
    experience: '15 years',
    location: 'New York, NY',
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@neuroclinic.com',
    availability: 'Mon-Fri 9AM-5PM',
    consultationFee: 250
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Cognitive Specialist',
    rating: 4.8,
    experience: '12 years',
    location: 'Los Angeles, CA',
    phone: '+1 (555) 987-6543',
    email: 'michael.chen@braincenter.com',
    availability: 'Mon-Thu 8AM-6PM',
    consultationFee: 200
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Neuropsychologist',
    rating: 4.7,
    experience: '10 years',
    location: 'Chicago, IL',
    phone: '+1 (555) 456-7890',
    email: 'emily.rodriguez@neuropsych.com',
    availability: 'Tue-Sat 10AM-4PM',
    consultationFee: 180
  }
];

export default function Analytics() {
  const [analysisData, setAnalysisData] = useState<AnalysisData>(mockAnalysisData);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorProfile | null>(null);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [consultationRequested, setConsultationRequested] = useState(false);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-400';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/20';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/20';
    return 'bg-red-100 dark:bg-red-900/20';
  };

  const requestConsultation = (doctor: DoctorProfile) => {
    setSelectedDoctor(doctor);
    setShowDoctorModal(true);
  };

  const confirmConsultation = () => {
    setConsultationRequested(true);
    setShowDoctorModal(false);
    // Here you would typically send a request to the backend
    console.log('Consultation requested with:', selectedDoctor);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Neurological Analysis Report
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Comprehensive assessment of your cognitive health and recommendations
        </p>
      </div>

      {/* Overall Risk Assessment */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Overall Risk Assessment
          </h2>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(analysisData.overallRisk)}`}>
            {analysisData.overallRisk.toUpperCase()} RISK
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className={`p-4 rounded-lg ${getScoreBgColor(analysisData.cognitiveScore)}`}>
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-gray-900 dark:text-white">Cognitive</span>
            </div>
            <p className={`text-2xl font-bold ${getScoreColor(analysisData.cognitiveScore)}`}>
              {analysisData.cognitiveScore}%
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${getScoreBgColor(analysisData.memoryScore)}`}>
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-gray-900 dark:text-white">Memory</span>
            </div>
            <p className={`text-2xl font-bold ${getScoreColor(analysisData.memoryScore)}`}>
              {analysisData.memoryScore}%
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${getScoreBgColor(analysisData.attentionScore)}`}>
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="h-5 w-5 text-green-600" />
              <span className="font-medium text-gray-900 dark:text-white">Attention</span>
            </div>
            <p className={`text-2xl font-bold ${getScoreColor(analysisData.attentionScore)}`}>
              {analysisData.attentionScore}%
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${getScoreBgColor(analysisData.motorScore)}`}>
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <span className="font-medium text-gray-900 dark:text-white">Motor</span>
            </div>
            <p className={`text-2xl font-bold ${getScoreColor(analysisData.motorScore)}`}>
              {analysisData.motorScore}%
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${getScoreBgColor(analysisData.socialScore)}`}>
            <div className="flex items-center space-x-2 mb-2">
              <User className="h-5 w-5 text-pink-600" />
              <span className="font-medium text-gray-900 dark:text-white">Social</span>
            </div>
            <p className={`text-2xl font-bold ${getScoreColor(analysisData.socialScore)}`}>
              {analysisData.socialScore}%
            </p>
          </div>
        </div>
      </div>

      {/* Problems Detected */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Problems Detected
        </h2>
        <div className="space-y-3">
          {analysisData.problems.map((problem, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-red-800 dark:text-red-200">{problem}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          AI Recommendations
        </h2>
        <div className="space-y-3">
          {analysisData.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-blue-800 dark:text-blue-200">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Doctor Consultation Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Doctor Consultation
          </h2>
          {consultationRequested && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Consultation Requested
            </span>
          )}
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Based on your analysis, we recommend consulting with a neurological specialist. 
            Choose from our network of qualified doctors:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Stethoscope className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{doctor.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{doctor.specialty}</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span>{doctor.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>{doctor.availability}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>⭐ {doctor.rating}</span>
                  <span>• {doctor.experience}</span>
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  ${doctor.consultationFee}/consultation
                </div>
              </div>
              
              <button
                onClick={() => requestConsultation(doctor)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Request Consultation
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => window.print()}
          className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          <Download className="h-5 w-5" />
          <span>Download Report</span>
        </button>
        
        <button
          onClick={() => window.location.href = '/tests'}
          className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          <Target className="h-5 w-5" />
          <span>Take More Tests</span>
        </button>
      </div>

      {/* Doctor Consultation Modal */}
      {showDoctorModal && selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Request Consultation with {selectedDoctor.name}
            </h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preferred Contact Method
                </label>
                <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option>Phone Call</option>
                  <option>Video Call</option>
                  <option>In-Person</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preferred Time
                </label>
                <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option>Morning (9AM-12PM)</option>
                  <option>Afternoon (12PM-5PM)</option>
                  <option>Evening (5PM-8PM)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Additional Notes
                </label>
                <textarea 
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                  placeholder="Any specific concerns or questions..."
                />
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDoctorModal(false)}
                className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmConsultation}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Confirm Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
