export interface User {
  id: string;
  email: string;
  full_name: string;
  profile_picture?: string;
  created_at: string;
}

export interface GameScore {
  id: string;
  user_id: string;
  game_type: 'memory' | 'reaction' | 'attention' | 'pattern' | 'logic' | 'visual';
  score: number;
  duration: number;
  accuracy: number;
  created_at: string;
}

export interface TestResult {
  id: string;
  user_id: string;
  test_type: 'test1' | 'test2' | 'test3';
  results: Record<string, any>;
  ai_analysis: {
    risk_level: 'low' | 'medium' | 'high';
    confidence: number;
    recommendations: string[];
  };
  created_at: string;
}

export interface AIDetectionResult {
  id: string;
  user_id: string;
  image_url: string;
  predictions: {
    disease: string;
    probability: number;
    confidence: number;
  }[];
  analysis: string;
  created_at: string;
}