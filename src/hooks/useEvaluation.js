import { useState } from 'react';
import axios from 'axios';

const useEvaluation = ({ userQuestion, botAnswer, context, metrics }) => {
  const [results, setResults] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleEvaluate = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/evaluate', {
        userQuestion,
        botAnswer,
        context,
        metrics,
      });
      setResults(response.data);
      setSnackbarMessage('Evaluation successful!');
    } catch (error) {
      setSnackbarMessage('Evaluation failed. Please try again.');
    }
    setOpenSnackbar(true);
  };

  return { results, handleEvaluate, openSnackbar, snackbarMessage, setOpenSnackbar };
};

export default useEvaluation;
