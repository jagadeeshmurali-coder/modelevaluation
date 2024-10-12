import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const ResultsDisplay = ({ results }) => {
  if (!results) return null;

  return (
    <Box mt={4}>
      <Typography variant="h5">Evaluation Results:</Typography>
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <pre>{JSON.stringify(results, null, 2)}</pre>
      </Paper>
    </Box>
  );
};

export default ResultsDisplay;
