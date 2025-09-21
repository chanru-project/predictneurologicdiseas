import React, { useState } from 'react';
import { 
  ClipboardList, 
  Brain, 
  Activity, 
  Users, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  TrendingUp,
  FileText
} from 'lucide-react';

interface Test {
  id: string;
  title: string;
  description: string;
  duration: string;
  questions: number;
  icon: React.ElementType;
  color: string;
  difficulty: string;
  lastTaken?: string;
  bestScore?: number;
}

interface TestResult {
  testId: string;
  score: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
  completedAt: Date;
}

// Test Questions Data
const testQuestions = {
  test1: [
    {
      question: "What is the next number in the sequence: 2, 4, 8, 16, ?",
      options: ["24", "32", "20", "28"],
      correct: 1,
      explanation: "Each number is multiplied by 2 to get the next number."
    },
    {
      question: "If you have 12 apples and give away 3, then buy 7 more, how many do you have?",
      options: ["16", "15", "14", "13"],
      correct: 0,
      explanation: "12 - 3 + 7 = 16 apples."
    },
    {
      question: "Which word does NOT belong with the others?",
      options: ["Car", "Truck", "Bicycle", "Airplane"],
      correct: 2,
      explanation: "Bicycle is the only non-motorized vehicle."
    },
    {
      question: "What comes next in the pattern: A, C, E, G, ?",
      options: ["H", "I", "J", "K"],
      correct: 1,
      explanation: "The pattern skips one letter: A, C, E, G, I."
    },
    {
      question: "If a train travels 60 mph for 2 hours, how far does it go?",
      options: ["120 miles", "100 miles", "140 miles", "80 miles"],
      correct: 0,
      explanation: "Distance = Speed × Time = 60 × 2 = 120 miles."
    }
  ],
  test2: [
    {
      question: "Which activity requires the most fine motor control?",
      options: ["Walking", "Writing with a pen", "Running", "Jumping"],
      correct: 1,
      explanation: "Writing requires precise finger and hand movements."
    },
    {
      question: "What is the primary function of the cerebellum?",
      options: ["Memory storage", "Motor coordination", "Language processing", "Emotional regulation"],
      correct: 1,
      explanation: "The cerebellum is responsible for motor coordination and balance."
    },
    {
      question: "Which symptom is most associated with Parkinson's disease?",
      options: ["Memory loss", "Tremors", "Vision problems", "Hearing loss"],
      correct: 1,
      explanation: "Tremors are a hallmark symptom of Parkinson's disease."
    },
    {
      question: "What is the normal range for resting heart rate in adults?",
      options: ["40-60 bpm", "60-100 bpm", "100-140 bpm", "140-180 bpm"],
      correct: 1,
      explanation: "Normal resting heart rate for adults is 60-100 beats per minute."
    },
    {
      question: "Which test assesses balance and coordination?",
      options: ["Memory test", "Romberg test", "Vision test", "Hearing test"],
      correct: 1,
      explanation: "The Romberg test evaluates balance and proprioception."
    }
  ],
  test3: [
    {
      question: "How would you respond if someone tells you they're feeling sad?",
      options: ["Ignore them", "Listen and offer support", "Tell them to cheer up", "Change the subject"],
      correct: 1,
      explanation: "Listening and offering support shows empathy and social awareness."
    },
    {
      question: "What is the most important factor in building trust?",
      options: ["Being funny", "Being consistent", "Being wealthy", "Being popular"],
      correct: 1,
      explanation: "Consistency in behavior and words builds trust over time."
    },
    {
      question: "How do you handle a disagreement with a friend?",
      options: ["Avoid them", "Listen to their perspective", "Insist you're right", "Get angry"],
      correct: 1,
      explanation: "Listening to their perspective shows emotional intelligence and social skills."
    },
    {
      question: "What does 'reading between the lines' mean?",
      options: ["Literally reading text", "Understanding hidden meanings", "Reading quickly", "Reading aloud"],
      correct: 1,
      explanation: "It means understanding implied or hidden meanings in communication."
    },
    {
      question: "How do you show respect in a conversation?",
      options: ["Interrupt frequently", "Listen actively", "Talk loudly", "Ignore the speaker"],
      correct: 1,
      explanation: "Active listening demonstrates respect and social awareness."
    }
  ]
};

const tests: Test[] = [
  {
    id: 'test1',
    title: 'Cognitive Assessment',
    description: 'Comprehensive evaluation of memory, attention, and processing speed',
    duration: '15-20 min',
    questions: 5,
    icon: Brain,
    color: 'from-blue-500 to-indigo-600',
    difficulty: 'Medium',
    lastTaken: '1 week ago',
    bestScore: 85
  },
  {
    id: 'test2',
    title: 'Motor Function Test',
    description: 'Assessment of motor skills, coordination, and movement patterns',
    duration: '10-15 min',
    questions: 5,
    icon: Activity,
    color: 'from-green-500 to-emerald-600',
    difficulty: 'Easy',
    lastTaken: '3 days ago',
    bestScore: 92
  },
  {
    id: 'test3',
    title: 'Social Cognition Evaluation',
    description: 'Measures social understanding, empathy, and interpersonal skills',
    duration: '20-25 min',
    questions: 5,
    icon: Users,
    color: 'from-purple-500 to-pink-600',
    difficulty: 'Hard',
    lastTaken: '2 weeks ago',
    bestScore: 78
  }
];

export default function Tests() {
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [testInProgress, setTestInProgress] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);

  const startTest = (test: Test) => {
    setSelectedTest(test);
    setTestInProgress(true);
    setCurrentQuestion(0);
    setTestResult(null);
    setUserAnswers([]);
    setScore(0);
  };

  const handleAnswer = (answerIndex: number) => {
    if (!selectedTest) return;
    
    const newAnswers = [...userAnswers, answerIndex];
    setUserAnswers(newAnswers);
    
    // Check if answer is correct
    const questions = testQuestions[selectedTest.id as keyof typeof testQuestions];
    const currentQ = questions[currentQuestion];
    if (answerIndex === currentQ.correct) {
      setScore(prev => prev + 1);
    }
    
    // Move to next question or complete test
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      completeTest(newAnswers);
    }
  };

  const completeTest = (answers: number[]) => {
    if (!selectedTest) return;
    
    const questions = testQuestions[selectedTest.id as keyof typeof testQuestions];
    const correctAnswers = answers.filter((answer, index) => 
      answer === questions[index].correct
    ).length;
    
    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    
    const mockResult: TestResult = {
      testId: selectedTest.id,
      score: finalScore,
      riskLevel: finalScore >= 80 ? 'low' : finalScore >= 60 ? 'medium' : 'high',
      recommendations: getRecommendations(selectedTest.id, finalScore),
      completedAt: new Date()
    };

    setTestInProgress(false);
    setTestResult(mockResult);
  };

  const getRecommendations = (testId: string, score: number) => {
    const baseRecommendations = [
      'Continue regular cognitive exercises',
      'Maintain a healthy lifestyle',
      'Schedule follow-up assessment in 6 months'
    ];
    
    if (score < 60) {
      return [
        'Consider consulting a neurologist',
        'Engage in daily brain training exercises',
        'Maintain a consistent sleep schedule',
        'Follow up with healthcare provider in 3 months'
      ];
    } else if (score < 80) {
      return [
        'Increase cognitive stimulation activities',
        'Practice memory exercises daily',
        'Maintain social connections',
        'Schedule follow-up in 4 months'
      ];
    }
    
    return baseRecommendations;
  };

  const resetTest = () => {
    setSelectedTest(null);
    setTestInProgress(false);
    setTestResult(null);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
  };

  if (selectedTest && (testInProgress || testResult)) {
    return (
      <TestInterface
        test={selectedTest}
        inProgress={testInProgress}
        currentQuestion={currentQuestion}
        result={testResult}
        onAnswer={handleAnswer}
        onReset={resetTest}
        currentQuestionIndex={currentQuestion}
        userAnswers={userAnswers}
        score={score}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <ClipboardList className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Neurological Tests
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Comprehensive assessments powered by AI analysis
        </p>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {tests.map((test) => {
          const Icon = test.icon;
          return (
            <div
              key={test.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className={`h-32 bg-gradient-to-r ${test.color} flex items-center justify-center`}>
                <Icon className="h-16 w-16 text-white" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {test.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    test.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    test.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {test.difficulty}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {test.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Duration:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {test.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Questions:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {test.questions}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Best Score:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {test.bestScore ? `${test.bestScore}%` : 'Not taken'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Last Taken:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {test.lastTaken || 'Never'}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => startTest(test)}
                  className={`w-full bg-gradient-to-r ${test.color} text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2`}
                >
                  <ClipboardList className="h-4 w-4" />
                  <span>Start Test</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Test History & Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recent Test Results
          </h2>
          
          <div className="space-y-4">
            {[
              { test: 'Cognitive Assessment', score: 85, date: '2 days ago', risk: 'low' },
              { test: 'Motor Function Test', score: 92, date: '1 week ago', risk: 'low' },
              { test: 'Social Cognition Evaluation', score: 78, date: '2 weeks ago', risk: 'medium' },
            ].map((result, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{result.test}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{result.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{result.score}%</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    result.risk === 'low' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    result.risk === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {result.risk} risk
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center justify-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Download Full Report</span>
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Performance Analytics
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Overall Improvement</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Last 3 months</p>
                </div>
              </div>
              <span className="text-xl font-bold text-green-600 dark:text-green-400">+12%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Cognitive Score</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Current average</p>
                </div>
              </div>
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">85%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <ClipboardList className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Tests Completed</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total count</p>
                </div>
              </div>
              <span className="text-xl font-bold text-purple-600 dark:text-purple-400">12</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-100">Next Recommendation</p>
                <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                  Continue with regular cognitive assessments. Your progress is excellent!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TestInterfaceProps {
  test: Test;
  inProgress: boolean;
  currentQuestion: number;
  result: TestResult | null;
  onAnswer: (answerIndex: number) => void;
  onReset: () => void;
  currentQuestionIndex: number;
  userAnswers: number[];
  score: number;
}

function TestInterface({ 
  test, 
  inProgress, 
  currentQuestion, 
  result, 
  onAnswer, 
  onReset, 
  currentQuestionIndex,
  userAnswers,
  score
}: TestInterfaceProps) {
  const Icon = test.icon;
  const progress = ((currentQuestionIndex + 1) / test.questions) * 100;
  
  const questions = testQuestions[test.id as keyof typeof testQuestions];
  const currentQ = questions[currentQuestionIndex];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-400';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className={`bg-gradient-to-r ${test.color} p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Icon className="h-12 w-12" />
              <div>
                <h1 className="text-2xl font-bold">{test.title}</h1>
                <p className="opacity-90">{test.description}</p>
              </div>
            </div>
            <button
              onClick={onReset}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg"
            >
              Back
            </button>
          </div>
        </div>

        <div className="p-8">
          {inProgress ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Question {currentQuestionIndex + 1} of {test.questions}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Score: {score}/{currentQuestionIndex}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${test.color} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              
              <div className="py-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {currentQ.question}
                  </h2>
                </div>
                
                <div className="space-y-4 max-w-2xl mx-auto">
                  {currentQ.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => onAnswer(index)}
                      className="w-full p-4 text-left border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 transform hover:scale-105 active:scale-95"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full border-2 border-gray-400 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center justify-center font-bold">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-lg">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Choose the best answer and click to continue
                  </p>
                </div>
              </div>
            </div>
          ) : result ? (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Test Complete!
                </h2>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        {result.score}%
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Overall Score</p>
                    </div>
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(result.riskLevel)}`}>
                        {result.riskLevel.toUpperCase()} RISK
                      </span>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Risk Level</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                    AI Recommendations
                  </h3>
                  <ul className="text-left space-y-2">
                    {result.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-blue-800 dark:text-blue-200">
                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-x-4">
                  <button
                    onClick={() => window.print()}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Download Report
                  </button>
                  <button
                    onClick={onReset}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Back to Tests
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}