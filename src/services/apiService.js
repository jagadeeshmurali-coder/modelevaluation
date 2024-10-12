import axios from 'axios';

const API_ENDPOINT = 'YOUR_API_ENDPOINT'; // Replace with your actual API endpoint

export const evaluateBot = async (data) => {
  const formData = new FormData();

  // Append the data to the FormData object
  for (const key in data) {
    if (data[key] !== null) {
      formData.append(key, data[key]);
    }
  }

  try {
    const response = await axios.post(API_ENDPOINT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error evaluating metrics:', error);
    throw error; // Throw the error to handle it in the calling function
  }
};
