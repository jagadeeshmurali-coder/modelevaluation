import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress,
} from '@mui/material';
import MetricsSelection from './MetricsSelection';
import ChartModal from './ChartModal';
import { analyzeBot, evaluateBot } from '../services/apiService';
import * as pdfjsLib from 'pdfjs-dist/webpack';

const EvaluationForm = () => {
  const [conversationHistory, setConversationHistory] = useState('');
  const [userQuestion, setUserQuestion] = useState('');
  const [botAnswer, setBotAnswer] = useState('');
  const [context, setContext] = useState('');
  const [metrics, setMetrics] = useState({
    clarity: false,
    relevance: false,
    responsiveness: false,
    engagement: false,
    errorRate: false,
    coherence: false,
  });
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      conversationHistory,
      userQuestion,
      botAnswer,
      context,
      metrics: JSON.stringify(metrics),
    };

    setLoading(true);

    try {
      const inputData = await evaluateBot(formData);
      const scores = await analyzeBot(inputData.data);
      
      setEvaluationResult(scores);
      setModalOpen(true);
    } catch (error) {
      console.error('Failed to evaluate:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await extractTextFromPdf(file);
    }
  };

  const extractTextFromPdf = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    loadingTask.promise.then(async (pdfDoc) => {
      let text = '';
      for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const textContent = await page.getTextContent();
        textContent.items.forEach(item => {
          text += item.str + ' ';
        });
        text += '\n';
      }
      setConversationHistory(text);
    }).catch((error) => {
      console.error('Error extracting PDF text:', error);
    });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#eaecef', borderRadius: 2, boxShadow: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card sx={{ marginBottom: 2, backgroundColor: '#ffffff', boxShadow: 2, borderRadius: 2 }}>
              <CardContent>
                <TextField
                  fullWidth
                  label="Conversation History (Text or Upload)"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={conversationHistory}
                  onChange={(e) => setConversationHistory(e.target.value)}
                  placeholder="Paste the conversation history here or upload a PDF..."
                  sx={{ backgroundColor: '#f5f5f5' }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
                  <Button 
                    variant="contained" 
                    component="label"
                    sx={{
                      background: 'linear-gradient(135deg, #42a5f5, #1976d2)',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1e88e5, #1565c0)',
                      },
                      marginRight: 2,
                    }}
                  >
                    Upload PDF
                    <input 
                      type="file" 
                      accept="application/pdf"
                      onChange={handleFileChange}
                      hidden
                    />
                  </Button>
                  {conversationHistory && (
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                      PDF content loaded successfully
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ marginBottom: 2, backgroundColor: '#ffffff', boxShadow: 2, borderRadius: 2 }}>
              <CardContent>
                <TextField
                  fullWidth
                  label="User Question (Optional)"
                  variant="outlined"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="What did the user ask? (Optional)"
                  sx={{ backgroundColor: '#f5f5f5' }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ marginBottom: 2, backgroundColor: '#ffffff', boxShadow: 2, borderRadius: 2 }}>
              <CardContent>
                <TextField
                  fullWidth
                  label="Bot Answer (Optional)"
                  variant="outlined"
                  value={botAnswer}
                  onChange={(e) => setBotAnswer(e.target.value)}
                  placeholder="What did the bot respond? (Optional)"
                  sx={{ backgroundColor: '#f5f5f5' }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ marginBottom: 2, backgroundColor: '#ffffff', boxShadow: 2, borderRadius: 2 }}>
              <CardContent>
                <TextField
                  fullWidth
                  label="Context"
                  variant="outlined"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Provide any relevant context..."
                  sx={{ backgroundColor: '#f5f5f5' }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <MetricsSelection metrics={metrics} setMetrics={setMetrics} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
              {loading ? <CircularProgress size={24} sx={{ color: 'white', marginRight: 1 }} /> : 'Evaluate'}
            </Button>
          </Grid>
        </Grid>
      </form>

      <ChartModal open={modalOpen} onClose={handleCloseModal} evaluationResult={evaluationResult} loading={loading} />
    </Box>
  );
};

export default EvaluationForm;
