const express = require('express');
const cors = require('cors');
const analyzeReportRoute = require('./analyze-report');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', analyzeReportRoute);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
