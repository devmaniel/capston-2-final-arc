// hooks/axiosStudentFetchRequest.js
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import Cookies from 'js-cookie';


const axiosStudentFetchRequest = async (statusFilter, statusDate, searchBar) => {
  try {
    const sessionId = Cookies.get('sessionId');  // Retrieve sessionId from cookies
    const response = await axios.post('/student/postfetch_bookmark_history', {
      sessionId: sessionId,  // Send sessionId as data
      statusFilter: statusFilter.toLowerCase(),  // Include statusFilter and make lowercase
      statusDate: statusDate.toLowerCase(),      // Include statusDate and make lowercase
      searchBar: searchBar                       // Include searchBar in the request
    });
    console.log('Full Server Response:', response);
    console.log('Server Response Status:', response.status);
    console.log('Server Response Data:', response.data);  // Log response data
    return response.data;  // Return the response data
  } catch (error) {
    console.error('Error posting bookmark history:', error);
    throw error;  // Rethrow error to be handled by the caller
  }
};

export default axiosStudentFetchRequest;