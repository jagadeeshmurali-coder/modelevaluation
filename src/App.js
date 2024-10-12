import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import EvaluationForm from './components/EvaluationForm';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import './styles/App.css'; // Import the CSS file

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container className="container">
        <Box className="overlay" />
        <Box className="title-card">
          <Typography variant="h4" className="title">
            AI Conversational Bot Performance Evaluation Tool
          </Typography>
          <Typography variant="h8" className="subtitle">
           Asses your Conversational Model Performance with dynamic metric sets
          </Typography>
        </Box>
        <EvaluationForm />
      </Container>
    </ThemeProvider>
  );
};

export default App;
