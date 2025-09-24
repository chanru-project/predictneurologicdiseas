const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Dummy AI analysis function (replace with real AI/ML logic or API call)
function analyzeReportText(text) {
  // Example: simple keyword extraction and scoring
  const keyTerms = [];
  const findings = [];
  const abnormalities = [];
  let riskScore = 0;
  let summary = '';
  let recommendation = '';

  if (/atrophy|lesion|abnormal/i.test(text)) {
    abnormalities.push('Abnormal findings detected');
    riskScore += 70;
    summary = 'Warning: Abnormalities found in the scan report.';
    recommendation = 'Consult a neurologist for further evaluation.';
  } else if (/normal/i.test(text)) {
    findings.push('Normal scan');
    summary = 'Scan appears normal.';
    riskScore = 10;
    recommendation = 'Continue regular checkups.';
  } else {
    findings.push('No significant findings');
    summary = 'No major abnormalities detected.';
    riskScore = 30;
    recommendation = 'Maintain healthy lifestyle and monitor regularly.';
  }

  // Extract some key terms (very basic example)
  if (/brain/i.test(text)) keyTerms.push('brain');
  if (/atrophy/i.test(text)) keyTerms.push('atrophy');
  if (/stroke/i.test(text)) keyTerms.push('stroke');
  if (/normal/i.test(text)) keyTerms.push('normal');

  return {
    summary,
    key_terms: keyTerms,
    findings,
    abnormalities,
    risk_score: riskScore,
    recommendation,
  };
}

router.post('/analyze-report', upload.single('file'), async (req, res) => {
  try {
    let reportText = '';
    if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });
    // Only support text files for this demo
    if (req.file.mimetype.startsWith('text/')) {
      reportText = fs.readFileSync(req.file.path, 'utf8');
    } else {
      return res.status(400).json({ error: 'Only text files are supported in this demo.' });
    }
    const analysis = analyzeReportText(reportText);
    res.json({ analysis });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (req.file) fs.unlinkSync(req.file.path);
  }
});

module.exports = router;
