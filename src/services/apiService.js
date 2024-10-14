import axios from 'axios';

const API_ENDPOINT = 'http://localhost:5000/api';

export const evaluateBot = async (data) => {
    const formData = new FormData();

    // Log the incoming data
    console.log(data, "data object before creating formData");

    formData.append('conversationHistory', data.conversationHistory);

    if (data.userQuestion) {
        formData.append('userQuestion', data.userQuestion);
    }

    if (data.botAnswer) {
        formData.append('botAnswer', data.botAnswer);
    }

    if (data.context) {
        formData.append('context', data.context);
    }

    if (data.metrics) {
        const parsedObject = JSON.parse(data.metrics);
        const trueKeys = Object.keys(parsedObject).filter(key => parsedObject[key]);
        formData.append('metrics', JSON.stringify(trueKeys));
    }

    try {
        const response = await axios.post(`${API_ENDPOINT}/evaluate`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error evaluating metrics:', error);
        throw error;
    }
};

export const analyzeBot = async (data) => {
    try {
        const response = await axios.post(`${API_ENDPOINT}/analyze`, data);
        return response.data;
    } catch (error) {
        console.error('Error analyzing bot:', error);
        throw error;
    }
};

