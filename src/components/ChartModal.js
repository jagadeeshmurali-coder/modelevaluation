import React from 'react';
import { Modal, Box, Button, Typography, IconButton, Card, CardContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Register all necessary components
Chart.register(...registerables);

// Define a theme with custom typography
const theme = createTheme({
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h6: {
            fontWeight: 600,
        },
        body2: {
            fontSize: '0.875rem',
        },
    },
});

const ChartModal = ({ open, onClose, evaluationResult }) => {
    const styles = {
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: 'white',
            borderRadius: '16px', // Increased border radius for the modal
            boxShadow: '24',
            padding: '16px',
            width: '80%',
            maxHeight: '80%',
            overflowY: 'auto',
            position: 'relative',
        },
        recommendationsCard: {
            marginTop: 2,
            padding: 2,
            backgroundColor: '#ffffff', // Changed to white
            boxShadow: 2,
        },
        chartGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            marginBottom: 2,
        },
        chartTitle: {
            fontWeight: 'bold',
            marginBottom: 1,
            color: '#333',
        },
        chart: {
            height: '250px',
        },
        downloadButton: {
            marginTop: 2,
            width: '100%',
        },
        card: {
            borderRadius: '12px', // Increased border radius for cards
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            },
        },
    };

    if (!evaluationResult) return null;

    const responseObject = JSON.parse(evaluationResult.result);
    const result = responseObject.result;
    const recommendations = responseObject.recommendations;

    const labels = Object.keys(result);

    // Prepare data for charts
    const confidenceScores = labels.map(label => parseFloat(result[label]['Overall confidence score']));
    const percentageRelations = labels.map(label => parseFloat(result[label]['Percentage relation']));
    const averageWordLengths = labels.map(label => parseFloat(result[label]['Average word length']));
    const responsePercentages = labels.map(label => parseFloat(result[label]['Response percentage clarification']));

    const barDataConfidence = {
        labels,
        datasets: [{
            label: 'Overall Confidence Scores',
            data: confidenceScores,
            backgroundColor: 'rgba(75, 192, 192, 0.8)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
        }],
    };

    const barDataPercentage = {
        labels,
        datasets: [{
            label: 'Percentage Relation',
            data: percentageRelations,
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
        }],
    };

    const lineDataAverageLength = {
        labels,
        datasets: [{
            label: 'Average Word Length',
            data: averageWordLengths,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
        }],
    };

    const pieDataResponse = {
        labels,
        datasets: [{
            label: 'Response Percentage Clarification',
            data: responsePercentages,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'],
        }],
    };

    const downloadAllCharts = async () => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageHeight = pdf.internal.pageSize.height;
        let currentHeight = 10; // Starting height from the top of the page

        const addChartToPdf = async (chartId) => {
            const chartCanvas = await html2canvas(document.getElementById(chartId));
            const imgData = chartCanvas.toDataURL('image/png');
            const imgHeight = (chartCanvas.height * 180) / chartCanvas.width; // Adjust height based on width

            if (currentHeight + imgHeight > pageHeight) {
                pdf.addPage(); // Add a new page if the current height exceeds page height
                currentHeight = 10; // Reset current height for new page
            }

            pdf.addImage(imgData, 'PNG', 10, currentHeight, 180, imgHeight);
            currentHeight += imgHeight + 10; // Update current height for next chart
        };

        // Add each chart to the PDF
        await addChartToPdf('confidenceChart');
        await addChartToPdf('percentageChart');
        await addChartToPdf('averageLengthChart');
        await addChartToPdf('responsePercentageChart');

        // Add recommendations with pagination
        pdf.text('Recommendations', 10, currentHeight);
        currentHeight += 10;

        const recommendationLines = pdf.splitTextToSize(recommendations, 180);
        for (const line of recommendationLines) {
            if (currentHeight > pageHeight - 10) { // Leave some margin at the bottom
                pdf.addPage(); // Add a new page if we exceed the height
                currentHeight = 10; // Reset current height for new page
            }
            pdf.text(line, 10, currentHeight);
            currentHeight += 10; // Move down for the next line
        }

        pdf.save('charts.pdf');
    };

    return (
        <ThemeProvider theme={theme}>
            <Modal open={open} onClose={onClose} sx={styles.modal}>
                <Box sx={styles.paper}>
                    <IconButton onClick={onClose} sx={{ position: 'absolute', top: 10, right: 10 }}>
                        <CloseIcon />
                    </IconButton>

                    <div style={styles.chartGrid}>
                        <Card sx={styles.card}>
                            <CardContent>
                                <Typography variant="h6" sx={styles.chartTitle}>Confidence Scores</Typography>
                                <div id="confidenceChart" style={styles.chart}>
                                    <Bar data={barDataConfidence} options={{ maintainAspectRatio: false }} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card sx={styles.card}>
                            <CardContent>
                                <Typography variant="h6" sx={styles.chartTitle}>Percentage Relation</Typography>
                                <div id="percentageChart" style={styles.chart}>
                                    <Bar data={barDataPercentage} options={{ maintainAspectRatio: false }} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card sx={styles.card}>
                            <CardContent>
                                <Typography variant="h6" sx={styles.chartTitle}>Average Word Length</Typography>
                                <div id="averageLengthChart" style={styles.chart}>
                                    <Line data={lineDataAverageLength} options={{ maintainAspectRatio: false }} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card sx={styles.card}>
                            <CardContent>
                                <Typography variant="h6" sx={styles.chartTitle}>Response Percentage Clarification</Typography>
                                <div id="responsePercentageChart" style={styles.chart}>
                                    <Pie data={pieDataResponse} options={{ maintainAspectRatio: false }} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card sx={styles.recommendationsCard}>
                        <CardContent>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                                Recommendations
                            </Typography>
                            <Typography variant="body2" sx={{ marginTop: 1 }}>
                                {recommendations}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Button
                        variant="contained"
                        onClick={downloadAllCharts}
                        sx={styles.downloadButton}
                    >
                        Download All Charts as PDF
                    </Button>
                </Box>
            </Modal>
        </ThemeProvider>
    );
};

export default ChartModal;
