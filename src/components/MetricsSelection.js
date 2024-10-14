import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const metricsList = [
  { id: 'clarity', label: 'Question Clarity', description: 'How clear and understandable is the user question?' },
  { id: 'relevance', label: 'Answer Relevance', description: 'How relevant is the bot\'s answer to the question asked?' },
  { id: 'responsiveness', label: 'Response Time', description: 'How quickly does the bot respond to user queries?' },
  { id: 'engagement', label: 'User Engagement', description: 'How engaged is the user during the conversation?' },
  { id: 'errorRate', label: 'Error Rate', description: 'How often does the bot provide incorrect responses?' },
  { id: 'coherence', label: 'Coherence', description: 'Is the bot\'s answer coherent and logical?' },
];

const MetricsSelection = ({ metrics, setMetrics }) => {
  const handleToggle = (id) => {
    setMetrics((prevMetrics) => ({ ...prevMetrics, [id]: !prevMetrics[id] }));
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      {/* <Typography variant="h6" align="center" sx={{ marginBottom: 2 }}>
        Select Metrics to Evaluate
      </Typography> */}
      <Grid container spacing={2}>
        {metricsList.map(({ id, label, description }) => (
          <Grid item xs={12} sm={6} key={id}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 2,
                background: metrics[id] ? 'linear-gradient(135deg, #42a5f5, #1976d2)' : '#f5f5f5',
                transition: 'background 0.3s',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: metrics[id] ? 6 : 3,
                  background: metrics[id] ? 'linear-gradient(135deg, #1e88e5, #1565c0)' : '#e0e0e0',
                },
              }}
              onClick={() => handleToggle(id)} 
            >
              <CardContent sx={{ padding: 2 }}>
                <Typography variant="body1" sx={{ color: metrics[id] ? 'white' : 'black' }}>
                  {label}
                </Typography>
                <Typography variant="caption" sx={{ color: metrics[id] ? 'white' : 'gray' }}>
                  {description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MetricsSelection;
