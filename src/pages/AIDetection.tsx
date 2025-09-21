import React, { useState, memo, useCallback } from 'react';
import { Upload, Brain, AlertCircle, CheckCircle, X, FileImage } from 'lucide-react';

interface DetectionResult {
  disease: string;
  probability: number;
  confidence: number;
  description: string;
  risk_level: 'low' | 'medium' | 'high';
}

const AIDetection = memo(function AIDetection() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DetectionResult[] | null>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
      setResults(null);
    }
  }, []);

  const removeFile = useCallback(() => {
    setFile(null);
    setPreview('');
    setResults(null);
  }, []);

  const analyzeImage = useCallback(async () => {
    if (!file) return;
    
    setLoading(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults: DetectionResult[] = [
        {
          disease: 'Alzheimer\'s Disease',
          probability: 0.15,
          confidence: 0.85,
          description: 'Early stage indicators detected with low probability',
          risk_level: 'low'
        },
        {
          disease: 'Parkinson\'s Disease',
          probability: 0.08,
          confidence: 0.78,
          description: 'Minimal indicators present',
          risk_level: 'low'
        },
        {
          disease: 'Stroke Risk',
          probability: 0.22,
          confidence: 0.92,
          description: 'Slight vascular changes observed',
          risk_level: 'medium'
        },
        {
          disease: 'Normal',
          probability: 0.55,
          confidence: 0.95,
          description: 'Brain structure appears normal for age',
          risk_level: 'low'
        }
      ];
      
      setResults(mockResults.sort((a, b) => b.probability - a.probability));
      setLoading(false);
    }, 3000);
  }, [file]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-400';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          AI Neurological Detection
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Upload brain scan images for AI-powered analysis
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Upload Medical Image
        </h2>
        
        {!file ? (
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center space-y-4"
            >
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900 dark:text-white">
                  Click to upload brain scan
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Supports: MRI, CT, PET scan images (PNG, JPG, JPEG)
                </p>
              </div>
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={preview}
                alt="Brain scan preview"
                className="w-full h-64 object-contain bg-gray-100 dark:bg-gray-700 rounded-lg"
              />
              <button
                onClick={removeFile}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FileImage className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {file.name}
                </span>
              </div>
              <button
                onClick={analyzeImage}
                disabled={loading}
                className="flex-1 max-w-xs bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 disabled:opacity-50 transition-all duration-200"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  'Analyze with AI'
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      {results && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Analysis Results
          </h2>
          
          <div className="space-y-4">
            {results.map((result, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {result.disease}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(result.risk_level)}`}>
                    {result.risk_level.toUpperCase()} RISK
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {result.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Probability</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full"
                          style={{ width: `${result.probability * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {(result.probability * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Confidence</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                          style={{ width: `${result.confidence * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {(result.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100">
                  AI Recommendations
                </h4>
                <ul className="mt-2 text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Continue regular monitoring and follow-up appointments</li>
                  <li>• Consider lifestyle modifications for brain health</li>
                  <li>• Discuss results with your neurologist for professional interpretation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-900 dark:text-yellow-100">
                  Important Disclaimer
                </h4>
                <p className="mt-1 text-sm text-yellow-800 dark:text-yellow-200">
                  This AI analysis is for informational purposes only and should not replace professional medical diagnosis. 
                  Always consult with qualified healthcare providers for medical decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default AIDetection;