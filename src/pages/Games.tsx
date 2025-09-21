import React, { useState } from 'react';
import { 
  Brain, 
  Eye, 
  Puzzle, 
  Target, 
  Timer,
  Trophy,
  Play,
  RotateCcw,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface GameScore {
  score: number;
  accuracy: number;
  time: number;
  date: Date;
}

interface Game {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  bestScore?: number;
  lastPlayed?: string;
}

const games: Game[] = [
  {
    id: 'memory',
    title: 'Memory Game',
    description: 'Test and improve your memory with pattern sequences',
    icon: Brain,
    color: 'from-blue-500 to-blue-600',
    difficulty: 'Medium',
    bestScore: 1250,
    lastPlayed: '2 hours ago'
  },
  {
    id: 'attention',
    title: 'Attention Test',
    description: 'Track your focus and sustained attention span',
    icon: Eye,
    color: 'from-green-500 to-emerald-500',
    difficulty: 'Medium',
    bestScore: 92,
    lastPlayed: '3 days ago'
  },
  {
    id: 'pattern',
    title: 'Pattern Recognition',
    description: 'Identify and complete complex visual patterns',
    icon: Puzzle,
    color: 'from-purple-500 to-indigo-500',
    difficulty: 'Hard',
    bestScore: 780,
    lastPlayed: '1 week ago'
  },
  {
    id: 'logic',
    title: 'Logic Puzzle',
    description: 'Solve challenging logical reasoning problems',
    icon: Target,
    color: 'from-red-500 to-pink-500',
    difficulty: 'Hard',
    bestScore: 650,
    lastPlayed: '5 days ago'
  },
];

export default function Games() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [gameActive, setGameActive] = useState(false);
  const [gameScore, setGameScore] = useState<GameScore | null>(null);

  const startGame = (game: Game) => {
    setSelectedGame(game);
    setGameActive(true);
    setGameScore(null);
  };

  const endGame = (score: GameScore) => {
    setGameActive(false);
    setGameScore(score);
    // Here you would save the score to the database
  };

  const resetGame = () => {
    setSelectedGame(null);
    setGameActive(false);
    setGameScore(null);
  };

  if (selectedGame) {
    return (
      <GameInterface
        game={selectedGame}
        isActive={gameActive}
        onEnd={endGame}
        onReset={resetGame}
        finalScore={gameScore}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Brain Training Games
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Enhance your cognitive abilities with AI-powered games
        </p>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <div
              key={game.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className={`h-32 bg-gradient-to-r ${game.color} flex items-center justify-center`}>
                <Icon className="h-16 w-16 text-white" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {game.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    game.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    game.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {game.difficulty}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {game.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Best Score:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {game.bestScore?.toLocaleString() || 'Not played'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Last Played:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {game.lastPlayed || 'Never'}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => startGame(game)}
                  className={`w-full bg-gradient-to-r ${game.color} text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2`}
                >
                  <Play className="h-4 w-4" />
                  <span>Play Game</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Your Performance
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Games Played</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
              <Target className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">87%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Average Accuracy</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-2">
              <Brain className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">+12%</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Improvement Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface GameInterfaceProps {
  game: Game;
  isActive: boolean;
  onEnd: (score: GameScore) => void;
  onReset: () => void;
  finalScore: GameScore | null;
}

function GameInterface({ game, isActive, onEnd, onReset, finalScore }: GameInterfaceProps) {
  const Icon = game.icon;
  const [countdown, setCountdown] = React.useState(0);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [gameTime, setGameTime] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [moves, setMoves] = React.useState(0);
  const [flippedCards, setFlippedCards] = React.useState<number[]>([]);
  const [matchedCards, setMatchedCards] = React.useState<number[]>([]);
  const [gameBoard, setGameBoard] = React.useState<number[]>([]);

  // Initialize game board for Memory Game
  React.useEffect(() => {
    if (game.id === 'memory' && gameStarted) {
      const cards = Array.from({ length: 8 }, (_, i) => Math.floor(i / 2));
      const shuffled = cards.sort(() => Math.random() - 0.5);
      setGameBoard(shuffled);
      setGameTime(0);
      setScore(0);
      setMoves(0);
      setFlippedCards([]);
      setMatchedCards([]);
    }
  }, [game.id, gameStarted]);

  // Initialize other games
  React.useEffect(() => {
    if (gameStarted) {
      if (game.id === 'logic') {
        setPuzzleQuestion(0);
        setPuzzleScore(0);
        setPuzzleTime(0);
        setSelectedAnswer(null);
      } else if (game.id === 'attention') {
        setAttentionScore(0);
        setAttentionTime(0);
        setCurrentTarget(0);
      } else if (game.id === 'pattern') {
        setPatternSequence([Math.floor(Math.random() * 4)]);
        setUserSequence([]);
        setPatternLevel(1);
        setPatternScore(0);
      }
    }
  }, [game.id, gameStarted]);

  // Game timer
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && game.id === 'memory') {
      interval = setInterval(() => {
        setGameTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, game.id]);

  // Check for matches
  React.useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (gameBoard[first] === gameBoard[second]) {
        setMatchedCards(prev => [...prev, first, second]);
        setScore(prev => prev + 10);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, gameBoard]);

  // Check if game is complete
  React.useEffect(() => {
    if (gameStarted && game.id === 'memory' && matchedCards.length === 8) {
      setTimeout(() => {
        onEnd({
          score: score + (100 - gameTime) * 2,
          accuracy: Math.round((matchedCards.length / 8) * 100),
          time: gameTime,
          date: new Date()
        });
      }, 1000);
    }
  }, [matchedCards.length, gameStarted, game.id, score, gameTime, onEnd]);

  const handleCardClick = (index: number) => {
    if (flippedCards.length < 2 && !flippedCards.includes(index) && !matchedCards.includes(index)) {
      setFlippedCards(prev => [...prev, index]);
    }
  };


  // Logic Puzzle Game Logic
  const [puzzleQuestion, setPuzzleQuestion] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null);
  const [puzzleScore, setPuzzleScore] = React.useState(0);
  const [puzzleTime, setPuzzleTime] = React.useState(0);

  const logicPuzzles = [
    {
      question: "If all roses are flowers and some flowers are red, which statement is true?",
      options: ["All roses are red", "Some roses are red", "No roses are red", "Cannot be determined"],
      correct: 1
    },
    {
      question: "A train leaves at 3 PM and arrives at 5 PM. If it travels 120 miles, what's its speed?",
      options: ["60 mph", "40 mph", "80 mph", "100 mph"],
      correct: 0
    },
    {
      question: "If 5 machines make 5 widgets in 5 minutes, how long for 100 machines to make 100 widgets?",
      options: ["5 minutes", "100 minutes", "20 minutes", "1 minute"],
      correct: 0
    }
  ];

  // Attention Test Game Logic
  const [attentionScore, setAttentionScore] = React.useState(0);
  const [attentionTime, setAttentionTime] = React.useState(0);
  const [currentTarget, setCurrentTarget] = React.useState(0);

  // Pattern Recognition Game Logic
  const [patternSequence, setPatternSequence] = React.useState<number[]>([]);
  const [userSequence, setUserSequence] = React.useState<number[]>([]);
  const [patternLevel, setPatternLevel] = React.useState(1);
  const [patternScore, setPatternScore] = React.useState(0);

  // AI Prediction System
  const generateAIPrediction = (gameId: string, score: number, accuracy: number, time: number) => {
    const predictions = {
      memory: {
        excellent: {
          issues: [],
          performance: "Exceptional memory function detected. Your working memory and pattern recognition are above average.",
          recommendations: ["Continue current cognitive activities", "Consider advanced memory training", "Maintain healthy lifestyle"]
        },
        good: {
          issues: ["Minor memory consolidation delays"],
          performance: "Good memory performance with room for improvement. Some minor delays in information processing.",
          recommendations: ["Practice memory exercises daily", "Use mnemonic techniques", "Get adequate sleep"]
        },
        fair: {
          issues: ["Mild working memory deficits", "Pattern recognition difficulties"],
          performance: "Fair memory performance. Some cognitive challenges detected that may benefit from targeted training.",
          recommendations: ["Engage in daily memory training", "Practice visualization techniques", "Consider cognitive therapy"]
        },
        poor: {
          issues: ["Significant working memory deficits", "Pattern recognition impairment", "Possible attention issues"],
          performance: "Memory performance below average. Multiple cognitive challenges detected requiring attention.",
          recommendations: ["Consult a neurologist", "Begin intensive memory training", "Consider medical evaluation"]
        }
      },
      attention: {
        excellent: {
          issues: [],
          performance: "Outstanding attention and focus. Your sustained attention and processing speed are excellent.",
          recommendations: ["Maintain current cognitive activities", "Continue challenging tasks", "Stay mentally active"]
        },
        good: {
          issues: ["Minor attention fluctuations"],
          performance: "Good attention performance with occasional lapses. Normal range with slight variability.",
          recommendations: ["Practice focus exercises", "Minimize distractions", "Take regular breaks"]
        },
        fair: {
          issues: ["Attention deficit tendencies", "Focus difficulties"],
          performance: "Fair attention performance. Some challenges with sustained focus and attention maintenance.",
          recommendations: ["Practice attention training", "Use focus techniques", "Consider ADHD evaluation"]
        },
        poor: {
          issues: ["Significant attention deficits", "Focus impairment", "Possible ADHD"],
          performance: "Attention performance below average. Significant challenges with focus and attention.",
          recommendations: ["Consult a specialist", "Consider ADHD assessment", "Begin attention training"]
        }
      },
      pattern: {
        excellent: {
          issues: [],
          performance: "Exceptional pattern recognition abilities. Your visual processing and pattern analysis are superior.",
          recommendations: ["Continue complex pattern tasks", "Engage in visual puzzles", "Maintain cognitive stimulation"]
        },
        good: {
          issues: ["Minor pattern processing delays"],
          performance: "Good pattern recognition with some processing delays. Generally effective visual analysis.",
          recommendations: ["Practice visual puzzles", "Engage in pattern games", "Work on processing speed"]
        },
        fair: {
          issues: ["Pattern recognition difficulties", "Visual processing challenges"],
          performance: "Fair pattern recognition. Some challenges with complex pattern analysis and visual processing.",
          recommendations: ["Practice visual exercises", "Work on pattern recognition", "Consider vision assessment"]
        },
        poor: {
          issues: ["Significant pattern recognition deficits", "Visual processing impairment", "Possible visual-spatial issues"],
          performance: "Pattern recognition below average. Significant challenges with visual pattern analysis.",
          recommendations: ["Consult a neurologist", "Consider visual assessment", "Begin intensive pattern training"]
        }
      },
      logic: {
        excellent: {
          issues: [],
          performance: "Exceptional logical reasoning abilities. Your analytical thinking and problem-solving are superior.",
          recommendations: ["Continue complex reasoning tasks", "Engage in analytical puzzles", "Maintain cognitive challenges"]
        },
        good: {
          issues: ["Minor reasoning delays"],
          performance: "Good logical reasoning with some processing delays. Generally effective analytical thinking.",
          recommendations: ["Practice logic puzzles", "Work on reasoning speed", "Engage in analytical tasks"]
        },
        fair: {
          issues: ["Reasoning difficulties", "Analytical thinking challenges"],
          performance: "Fair logical reasoning. Some challenges with complex problem-solving and analytical thinking.",
          recommendations: ["Practice reasoning exercises", "Work on analytical skills", "Consider cognitive training"]
        },
        poor: {
          issues: ["Significant reasoning deficits", "Analytical thinking impairment", "Possible executive function issues"],
          performance: "Logical reasoning below average. Significant challenges with problem-solving and analysis.",
          recommendations: ["Consult a specialist", "Consider executive function assessment", "Begin intensive reasoning training"]
        }
      }
    };

    const getPerformanceLevel = (score: number, accuracy: number) => {
      if (score >= 80 && accuracy >= 80) return 'excellent';
      if (score >= 60 && accuracy >= 60) return 'good';
      if (score >= 40 && accuracy >= 40) return 'fair';
      return 'poor';
    };

    const level = getPerformanceLevel(score, accuracy);
    return predictions[gameId as keyof typeof predictions]?.[level as keyof typeof predictions.memory] || predictions.memory.poor;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className={`bg-gradient-to-r ${game.color} p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Icon className="h-12 w-12" />
              <div>
                <h1 className="text-2xl font-bold">{game.title}</h1>
                <p className="opacity-90">{game.description}</p>
              </div>
            </div>
            <button
              onClick={onReset}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Back</span>
            </button>
          </div>
        </div>

        <div className="p-8">
          {!gameStarted && !finalScore ? (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                <Play className="h-12 w-12 text-gray-600 dark:text-gray-400" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Ready to play {game.title}?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Click start when you're ready to begin the challenge.
                </p>
                <button
                  onClick={() => {
                    setCountdown(1);
                    const countdownInterval = setInterval(() => {
                      setCountdown(prev => {
                        if (prev <= 1) {
                          clearInterval(countdownInterval);
                          setGameStarted(true);
                          if (game.id === 'memory') {
                            // Initialize memory game board
                            const newBoard = Array.from({ length: 8 }, (_, i) => Math.floor(i / 2) + 1).sort(() => Math.random() - 0.5);
                            setGameBoard(newBoard);
                          }
                          return 0;
                        }
                        return prev - 1;
                      });
                    }, 1000);
                  }}
                  className={`bg-gradient-to-r ${game.color} text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200`}
                >
                  Start Game
                </button>
              </div>
            </div>
          ) : gameStarted ? (
            countdown > 0 ? (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Starting in {countdown}...
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get ready!
                  </p>
                </div>
              </div>
            ) : gameStarted && game.id === 'memory' ? (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{gameTime}s</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Score</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{score}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Moves</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{moves}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                  {gameBoard.map((card, index) => (
                    <button
                      key={index}
                      onClick={() => handleCardClick(index)}
                      className={`aspect-square rounded-xl border-4 transition-all duration-500 transform hover:scale-105 active:scale-95 ${
                        flippedCards.includes(index) || matchedCards.includes(index)
                          ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white border-blue-600 shadow-lg'
                          : 'bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 border-gray-400 dark:border-gray-500 hover:from-gray-300 hover:to-gray-400 dark:hover:from-gray-600 dark:hover:to-gray-500 shadow-md'
                      }`}
                      disabled={flippedCards.includes(index) || matchedCards.includes(index)}
                    >
                      <div className="flex items-center justify-center h-full">
                        {flippedCards.includes(index) || matchedCards.includes(index) ? (
                          <div className="text-center">
                            <div className="text-4xl font-bold mb-1">{card}</div>
                            <div className="text-xs opacity-80">MATCHED!</div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="text-4xl mb-1">🎴</div>
                            <div className="text-xs opacity-60">Click me!</div>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                    <p className="text-blue-800 dark:text-blue-200 font-medium mb-2">
                      🧠 Memory Challenge Instructions:
                    </p>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                      <li>• Click cards to reveal numbers</li>
                      <li>• Find matching pairs (same numbers)</li>
                      <li>• Use your memory to remember positions</li>
                      <li>• Think strategically about which cards to flip</li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-3">
                      <div className="text-green-800 dark:text-green-200 font-bold text-lg">
                        {matchedCards.length / 2}/4
                      </div>
                      <div className="text-green-600 dark:text-green-400 text-xs">Pairs Found</div>
                    </div>
                    <div className="bg-purple-100 dark:bg-purple-900/20 rounded-lg p-3">
                      <div className="text-purple-800 dark:text-purple-200 font-bold text-lg">
                        {moves}
                      </div>
                      <div className="text-purple-600 dark:text-purple-400 text-xs">Moves Made</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : gameStarted && game.id === 'logic' ? (
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Logic Puzzle {puzzleQuestion + 1}/3
                  </h2>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Score: {puzzleScore}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Time: {puzzleTime}s</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-lg text-gray-900 dark:text-white mb-6">
                    {logicPuzzles[puzzleQuestion]?.question}
                  </p>
                  
                  <div className="space-y-4">
                    {logicPuzzles[puzzleQuestion]?.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedAnswer(index);
                          if (index === logicPuzzles[puzzleQuestion].correct) {
                            setPuzzleScore(prev => prev + 10);
                          }
                          setTimeout(() => {
                            if (puzzleQuestion < 2) {
                              setPuzzleQuestion(prev => prev + 1);
                              setSelectedAnswer(null);
                            } else {
                              onEnd({
                                score: puzzleScore + (index === logicPuzzles[puzzleQuestion].correct ? 10 : 0),
                                accuracy: Math.round(((puzzleScore + (index === logicPuzzles[puzzleQuestion].correct ? 10 : 0)) / 30) * 100),
                                time: puzzleTime,
                                date: new Date()
                              });
                            }
                          }, 1000);
                        }}
                        className={`w-full p-6 text-left border-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                          selectedAnswer === index
                            ? index === logicPuzzles[puzzleQuestion].correct
                              ? 'border-green-500 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 text-green-800 dark:text-green-200 shadow-lg'
                              : 'border-red-500 bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 text-red-800 dark:text-red-200 shadow-lg'
                            : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 shadow-md'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-lg ${
                            selectedAnswer === index
                              ? index === logicPuzzles[puzzleQuestion].correct
                                ? 'border-green-500 bg-green-500 text-white'
                                : 'border-red-500 bg-red-500 text-white'
                              : 'border-gray-400 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </div>
                          <div className="flex-1">
                            <p className="text-lg font-medium">{option}</p>
                            {selectedAnswer === index && (
                              <p className={`text-sm mt-1 ${
                                index === logicPuzzles[puzzleQuestion].correct ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                              }`}>
                                {index === logicPuzzles[puzzleQuestion].correct ? '✅ Correct!' : '❌ Incorrect'}
                              </p>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : gameStarted && game.id === 'attention' ? (
              <div className="p-6 text-center">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Attention Test
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Click the numbers in order from 1 to 10 as fast as you can!
                  </p>
                </div>
                
                <div className="grid grid-cols-5 gap-4 max-w-2xl mx-auto mb-6">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        if (currentTarget + 1 === num) {
                          setCurrentTarget(num);
                          setAttentionScore(prev => prev + 10);
                          if (num === 10) {
                            setTimeout(() => {
                              onEnd({
                                score: attentionScore + 10,
                                accuracy: 100,
                                time: attentionTime,
                                date: new Date()
                              });
                            }, 1000);
                          }
                        }
                      }}
                      className={`aspect-square rounded-xl border-4 text-2xl font-bold transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                        currentTarget >= num
                          ? 'bg-gradient-to-br from-green-500 to-green-600 text-white border-green-600 shadow-lg'
                          : currentTarget + 1 === num
                          ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white border-orange-500 shadow-lg animate-pulse'
                          : 'bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 text-gray-900 dark:text-white border-gray-400 dark:border-gray-500 hover:from-gray-300 hover:to-gray-400 dark:hover:from-gray-600 dark:hover:to-gray-500 shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-center h-full">
                        <span className="text-3xl">{num}</span>
                      </div>
                    </button>
                  ))}
                </div>
                
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-4">
                  <p className="text-yellow-800 dark:text-yellow-200 font-medium mb-2">
                    🎯 Attention Challenge Instructions:
                  </p>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                    <li>• Click numbers in sequence from 1 to 10</li>
                    <li>• Focus on the highlighted number</li>
                    <li>• Use your brain to maintain attention</li>
                    <li>• Click as fast as you can!</li>
                  </ul>
                </div>
                
                <div className="flex justify-center space-x-6 mb-4">
                  <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-3">
                    <div className="text-green-800 dark:text-green-200 font-bold text-lg">
                      {currentTarget}/10
                    </div>
                    <div className="text-green-600 dark:text-green-400 text-xs">Completed</div>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/20 rounded-lg p-3">
                    <div className="text-blue-800 dark:text-blue-200 font-bold text-lg">
                      {attentionScore}
                    </div>
                    <div className="text-blue-600 dark:text-blue-400 text-xs">Score</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                    Next: {currentTarget + 1}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {currentTarget + 1 <= 10 ? 'Click the highlighted number!' : 'Great job! Test complete!'}
                  </div>
                </div>
              </div>
            ) : gameStarted && game.id === 'pattern' ? (
              <div className="p-6 text-center">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Pattern Recognition - Level {patternLevel}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Watch the sequence and repeat it!
                  </p>
                </div>
                
                <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-6">
                  {Array.from({ length: 4 }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        const newSequence = [...userSequence, i];
                        setUserSequence(newSequence);
                        
                        if (newSequence.length === patternSequence.length) {
                          if (JSON.stringify(newSequence) === JSON.stringify(patternSequence)) {
                            setPatternScore(prev => prev + 10);
                            setPatternLevel(prev => prev + 1);
                            setPatternSequence(prev => [...prev, Math.floor(Math.random() * 4)]);
                            setUserSequence([]);
                          } else {
                            onEnd({
                              score: patternScore,
                              accuracy: Math.round((patternScore / (patternLevel * 10)) * 100),
                              time: 0,
                              date: new Date()
                            });
                          }
                        }
                      }}
                      className={`aspect-square rounded-lg border-2 text-2xl font-bold transition-all duration-200 ${
                        patternSequence.includes(i) && userSequence.length < patternSequence.length
                          ? 'bg-blue-500 text-white border-blue-600'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Score: {patternScore} | Level: {patternLevel}
                </div>
              </div>
            ) : (
            <div className="text-center space-y-6">
                <div className="w-16 h-16 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Game in Progress...
                </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                  Focus and do your best!
                </p>
              </div>
            </div>
            )
          ) : (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                <Trophy className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Game Complete!
                </h2>
                
                {/* Enhanced Results Display */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {finalScore?.score.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Score</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {finalScore?.accuracy || 0}%
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {finalScore?.time}s
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Time</p>
                  </div>
                </div>

                {/* AI Prediction Analysis */}
                {finalScore && (() => {
                  const prediction = generateAIPrediction(game.id, finalScore.score, finalScore.accuracy, finalScore.time);
                  return (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        🤖 AI Neurological Prediction
                      </h3>
                      
                      {/* Performance Assessment */}
                      <div className="mb-6">
                        <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
                          Performance Assessment
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {prediction.performance}
                        </p>
                      </div>

                      {/* Issues Detected */}
                      {prediction.issues.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-md font-semibold text-red-600 dark:text-red-400 mb-3">
                            ⚠️ Potential Issues Detected
                          </h4>
                          <div className="space-y-2">
                            {prediction.issues.map((issue, index) => (
                              <div key={index} className="flex items-start space-x-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                                <p className="text-red-800 dark:text-red-200 text-sm">{issue}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Recommendations */}
                      <div className="mb-6">
                        <h4 className="text-md font-semibold text-blue-600 dark:text-blue-400 mb-3">
                          💡 AI Recommendations
                        </h4>
                        <div className="space-y-2">
                          {prediction.recommendations.map((recommendation, index) => (
                            <div key={index} className="flex items-start space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                              <p className="text-blue-800 dark:text-blue-200 text-sm">{recommendation}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Risk Level */}
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Risk Level:</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            prediction.issues.length === 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            prediction.issues.length <= 2 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {prediction.issues.length === 0 ? 'LOW RISK' :
                             prediction.issues.length <= 2 ? 'MEDIUM RISK' : 'HIGH RISK'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Legacy Medical Analysis - Keeping for reference */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    🧠 Detailed Analysis
                  </h3>
                  

                  {game.id === 'memory' && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                          Memory Performance
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                          {(finalScore?.accuracy || 0) > 80 ? 'Excellent memory function!' : 
                           (finalScore?.accuracy || 0) > 60 ? 'Good memory performance.' :
                           'Memory training recommended.'}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Short-term Memory</h4>
                          <p className="text-sm text-purple-800 dark:text-purple-200">
                            {(finalScore?.accuracy || 0) > 80 ? 'Strong pattern recognition' : 
                             'Consider memory exercises'}
                          </p>
                        </div>
                        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                          <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Processing Speed</h4>
                          <p className="text-sm text-orange-800 dark:text-orange-200">
                            {finalScore?.time < 30 ? 'Fast cognitive processing' : 
                             'Normal processing speed'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {game.id === 'logic' && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                          Logical Reasoning
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                          {(finalScore?.accuracy || 0) > 80 ? 'Excellent problem-solving skills!' : 
                           (finalScore?.accuracy || 0) > 60 ? 'Good logical thinking.' :
                           'Consider cognitive training.'}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                          <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Analytical Thinking</h4>
                          <p className="text-sm text-red-800 dark:text-red-200">
                            {(finalScore?.accuracy || 0) > 80 ? 'Strong analytical abilities' : 
                             'Practice problem-solving exercises'}
                          </p>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                          <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Decision Making</h4>
                          <p className="text-sm text-yellow-800 dark:text-yellow-200">
                            {(finalScore?.accuracy || 0) > 80 ? 'Quick decision processing' : 
                             'Consider decision-making practice'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* General Recommendations */}
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📋 Recommendations</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>• Continue regular cognitive exercises</li>
                      <li>• Maintain a healthy lifestyle with proper sleep</li>
                      <li>• Consider brain training apps for daily practice</li>
                      <li>• Schedule follow-up assessment in 3 months</li>
                    </ul>
                  </div>
                </div>

                <div className="space-x-4">
                  <button
                    onClick={() => {
                      setGameStarted(false);
                      setGameTime(0);
                      setScore(0);
                      setMoves(0);
                      setFlippedCards([]);
                      setMatchedCards([]);
                      setGameBoard([]);
                      setCountdown(1);
                      const countdownInterval = setInterval(() => {
                        setCountdown(prev => {
                          if (prev <= 1) {
                            clearInterval(countdownInterval);
                            setGameStarted(true);
                            // Reset game-specific states
                            if (game.id === 'memory') {
                              const newBoard = Array.from({ length: 8 }, (_, i) => Math.floor(i / 2) + 1).sort(() => Math.random() - 0.5);
                              setGameBoard(newBoard);
                            }
                            return 0;
                          }
                          return prev - 1;
                        });
                      }, 1000);
                    }}
                    className={`bg-gradient-to-r ${game.color} text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200`}
                  >
                    Play Again
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Share Score
                  </button>
                  <button
                    onClick={onReset}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
                  >
                    Back to Games
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}