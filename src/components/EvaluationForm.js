import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import MetricsSelection from './MetricsSelection';
import MetricsModal from './MetricsModal'; // Import the modal component
import { evaluateBot } from '../services/apiService';

const EvaluationForm = () => {
  const [conversationHistory, setConversationHistory] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState(null);
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
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      conversationHistory,
      userQuestion,
      botAnswer,
      context,
      metrics: JSON.stringify(metrics),
      pdfFile,
    };

    try {
      const result = await evaluateBot(formData);
      setEvaluationResult(result);
      setModalOpen(true); // Open the modal after evaluation
    } catch (error) {
      console.error('Failed to evaluate:', error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfFile(file);
      // Optionally, you could read the file here and update conversation history
    }
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
                  placeholder="Paste conversation history here or upload a PDF..."
                  sx={{ backgroundColor: '#f5f5f5' }}
                />
                <Button 
                  variant="contained" 
                  component="label"
                  sx={{
                    background: 'linear-gradient(135deg, #42a5f5, #1976d2)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1e88e5, #1565c0)',
                    },
                    marginTop: 2,
                    width: '20%',
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
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ marginBottom: 2, backgroundColor: '#ffffff', boxShadow: 2, borderRadius: 2 }}>
              <CardContent>
                <TextField
                  fullWidth
                  label="Latest User Question (Optional)"
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
                  label="Latest Bot Answer (Optional)"
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
            <Box display="flex" justifyContent="center" marginTop={2}>
                <Button type="submit" variant="contained" color="primary" sx={{ boxShadow: 4, borderRadius: 1, width: '20%' }}>
                    Evaluate
                </Button>
            </Box>
        </Grid>
        </Grid>
      </form>
      {/* <MetricsModal 
        open={modalOpen} 
        handleClose={handleCloseModal} 
        evaluationResult={evaluationResult} 
      /> */}
    </Box>
  );
};

export default EvaluationForm;
