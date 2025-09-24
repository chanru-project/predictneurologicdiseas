
import React, { useState, memo, useCallback } from 'react';
import { Upload, Brain, AlertCircle, CheckCircle, X, FileImage } from 'lucide-react';

interface AnalysisResult {
  summary: string;
  key_terms: string[];
  findings: string[];
  abnormalities: string[];
  risk_score: number;
  recommendation: string;
}

const AIDetection = memo(function AIDetection() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
      setResult(null);
      setError(null);
    }
  }, []);

  const removeFile = useCallback(() => {
    setFile(null);
    setPreview('');
    setResult(null);
    setError(null);
  }, []);

  const analyzeReport = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('/analyze-report', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to analyze report.');
      }
      const data = await response.json();
      setResult(data.analysis);
    } catch (err: any) {
      setError(err.message || 'Unknown error occurred.');
    } finally {
      setLoading(false);
    }
  }, [file]);

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
    if (score < 70) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
    return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400';
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
                onClick={analyzeReport}
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
      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-200 p-4 rounded-lg mb-4">
          <AlertCircle className="inline h-5 w-5 mr-2 align-text-bottom" />
          {error}
        </div>
      )}
      {result && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Analysis Results
          </h2>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Summary</h3>
            <p className="text-gray-700 dark:text-gray-300">{result.summary}</p>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Key Medical Terms</h4>
            <ul className="list-disc list-inside text-sm text-blue-800 dark:text-blue-200">
              {result.key_terms.map((term, idx) => <li key={idx}>{term}</li>)}
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-1">Findings</h4>
            <ul className="list-disc list-inside text-sm text-green-800 dark:text-green-200">
              {result.findings.map((finding, idx) => <li key={idx}>{finding}</li>)}
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold text-red-700 dark:text-red-300 mb-1">Abnormalities</h4>
            <ul className="list-disc list-inside text-sm text-red-800 dark:text-red-200">
              {result.abnormalities.length > 0 ? result.abnormalities.map((abn, idx) => <li key={idx}>{abn}</li>) : <li>None detected</li>}
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-1">Health Risk Score</h4>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(result.risk_score)}`}>
              {result.risk_score} / 100
            </span>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">AI Recommendation</h4>
            <p className="text-blue-800 dark:text-blue-200 text-sm">{result.recommendation}</p>
          </div>
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