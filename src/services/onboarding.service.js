
import axios from 'axios';

import { BASE_URL } from '@/utils/constants';

const onboardingService = {
  
  getAllOnboards : async () => {
    const token = sessionStorage.getItem("userToken");     
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      
      // Send the POST request with the request body
      const response = await axios.get(`${BASE_URL}/merchant/all-merchant`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },

   reSendOnboardingLink : async (values) => {
    const token = sessionStorage.getItem("userToken");     
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      
      // Send the POST request with the request body
      const response = await axios.post(`${BASE_URL}/merchant/resend-invite`,{email : values}, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },

  sendOnboardingLink : async (values) => {
    const token = sessionStorage.getItem("userToken");     
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      
      // Send the POST request with the request body
      const response = await axios.post(`${BASE_URL}/merchant/onboarding-referral`,values, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },

//   updateUser : async (id) => {
//     const token = sessionStorage.getItem("userToken");     
//     try {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };
      
//       // Send the POST request with the request body
//       const response = await axios.patch(`${BASE_URL}/users/update-status/${id}`,{}, { headers });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       throw error;
//     }

//   },

}

export default onboardingService;