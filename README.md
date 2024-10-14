# Chatbot Evaluation Frontend

## Overview

The Chatbot Evaluation Frontend is a React-based application that allows users to evaluate chatbot interactions. Users can input conversation histories, user questions, and bot answers, then analyze the chatbot's performance based on various metrics.

## Features

- **User Input Forms**: Users can enter conversation history, user questions, and bot responses.
- **File Upload**: Supports PDF uploads to extract conversation history automatically.
- **Metric Selection**: Users can select specific metrics for evaluation (clarity, relevance, responsiveness, etc.).
- **Chart Display**: Visual representation of evaluation results using charts.
- **Downloadable Reports**: Users can download evaluation results as a PDF.

## Technologies Used

- React
- Material-UI (MUI) for UI components
- Chart.js for data visualization
- Axios for API requests
- jsPDF for PDF generation

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. **Clone the repository**:

   git clone https://github.com/jagadeeshmurali-coder/modelevaluation.git
   cd modelevaluation

2. **Install Dependencies**:

    npm install

3. **Connect Backend Server running in port 5000**

    API_ENDPOINT = 'http://localhost:5000/api';

3. **Start the server**:

     node server.js     

    The server will run on http://localhost:3000.   
