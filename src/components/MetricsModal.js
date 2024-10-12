import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { saveAs } from 'file-saver';

const MetricsModal = ({ open, handleClose, evaluationResult }) => {
  const chartData = {
    labels: Object.keys(evaluationResult),
    datasets: [
      {
        label: 'Metric Scores',
        data: Object.values(evaluationResult),
        backgroundColor: 'rgba(62, 142, 247, 0.6)',
      },
    ],
  };

  const downloadData = () => {
    const blob = new Blob([JSON.stringify(evaluationResult, null, 2)], {
      type: 'application/json',
    });
    saveAs(blob, 'evaluation_results.json');
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ 
        width: 400, 
        bgcolor: 'background.paper', 
        boxShadow: 24, 
        p: 4, 
        borderRadius: 2,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}>
        <Typography variant="h6" gutterBottom>
          Evaluation Results
        </Typography>
        <Bar data={chartData} />
        <Button 
          variant="contained" 
          onClick={downloadData} 
          sx={{ marginTop: 2, backgroundColor: '#3e8ef7', color: 'white' }}
        >
          Download Results
        </Button>
      </Box>
    </Modal>
  );
};

export default MetricsModal;
