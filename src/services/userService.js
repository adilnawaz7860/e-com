// import axios from 'axios';

// const BASE_URL = process.env.NEXT_PUBLIC_URL;

// // Helper function to parse error responses
// const parseErrorResponse = async (response) => {
//   try {
//     const text = await response.data.text();
//     try {
//       return JSON.parse(text).message || text;
//     } catch {
//       return text;
//     }
//   } catch {
//     return response.statusText;
//   }
// };

// const userService = {
//   registerUser: async (values) => {
//     const token = sessionStorage.getItem("token");     
//     try {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };
      
//       const response = await axios.post(`${BASE_URL}/users/register`, values, { headers });
//       return response.data;
//     } catch (error) {
//       console.error('Error registering user:', error);
//       throw error;
//     }
//   },

//   getAllUsers: async () => {
//     const token = sessionStorage.getItem("token");     
//     try {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };
      
//       const response = await axios.get(`${BASE_URL}/users/all-user`, { headers });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       throw error;
//     }
//   },

//   getAnalytics: async () => {
//     const token = sessionStorage.getItem("token");     
//     try {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };
      
//       const response = await axios.get(`${BASE_URL}/users/analytics`, { headers });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching analytics:', error);
//       throw error;
//     }
//   },

//   getVRecords: async () => {
//     const token = sessionStorage.getItem("token");     
//     try {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };
      
//       const response = await axios.get(`${BASE_URL}/verification/get-vrecord`, { headers });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching verification records:', error);
//       throw error;
//     }
//   },

//   updateUser: async (id) => {
//     const token = sessionStorage.getItem("token");     
//     try {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };
      
//       const response = await axios.patch(`${BASE_URL}/users/update-status/${id}`, {}, { headers });
//       return response.data;
//     } catch (error) {
//       console.error('Error updating user:', error);
//       throw error;
//     }
//   },

//   updateMerchant: async (id, status) => {
//     const token = sessionStorage.getItem("token");     
//     try {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };
      
//       const response = await axios.patch(`${BASE_URL}/merchant/verify/${id}`, { status }, { headers });
//       return response.data;
//     } catch (error) {
//       console.error('Error updating merchant:', error);
//       throw error;
//     }
//   },

//   getUser: async () => {
//     const token = sessionStorage.getItem("token");     
//     try {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };
      
//       const response = await axios.get(`${BASE_URL}/users/current-user`, { headers });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching user:', error);
//       throw error;
//     }
//   },

//   getOnboarded: async (id) => {
//     const token = sessionStorage.getItem("token");     
//     try {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };
      
//       const response = await axios.get(`${BASE_URL}/analytics/user-analytics/${id}`, { headers });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching onboarded data:', error);
//       throw error;
//     }
//   },

//   getDocuments: async (mId) => {
//     const token = sessionStorage.getItem("token");
//     try {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         // No Content-Type for blob responses
//       };
      
//       const response = await axios.get(
//         `${BASE_URL}/super/document/${mId}/download-documents`, 
//         { 
//           headers,
//           responseType: 'blob', // Crucial for file downloads
//           timeout: 120000 // 2 minutes timeout
//         }
//       );
      
//       // Verify response is a blob
//       if (!(response.data instanceof Blob)) {
//         const text = await response.data.text();
//         throw new Error(`Unexpected response: ${text.substring(0, 100)}`);
//       }
      
//       return response;
//     } catch (error) {
//       console.error('Error downloading documents:', error);
      
//       // Enhance error information
//       if (error.response) {
//         error.serverMessage = await parseErrorResponse(error.response);
//       }
      
//       throw error;
//     }
//   },

//   checkAadhaar: async (formData) => {
//     const requestData = {
//       "aadhaar": formData
//     };

//     try {
//       const token = sessionStorage.getItem("token"); 
//       if (!token) {
//         throw new Error('You need to log in.');
//       }
  
//       const response = await axios.post(`${BASE_URL}/verification/verify-aadhaar`, requestData, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       if (response.status !== 200) {
//         throw new Error('Verification failed');
//       }
  
//       return response.data;
//     } catch (error) {
//       console.error('Error verifying Aadhaar:', error);
//       throw error;
//     }
//   },
  
//   checkPAN: async (formData) => {
//     const requestData = {
//       "pan": formData
//     };
   
//     try {
//       const token = sessionStorage.getItem("token"); 
//       if (!token) {
//         throw new Error('You need to log in.');
//       }
//       const response = await axios.post(`${BASE_URL}/verification/verify-pan`, requestData, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       return response.data;
//     } catch (error) {
//       console.error('Error verifying PAN:', error);
//       throw error;
//     }
//   },

//   checkGST: async (formData) => {
//     const requestData = {
//       "gst": formData
//     };
//     try {
//       const token = sessionStorage.getItem("token"); 
//       if (!token) {
//         throw new Error('You need to log in.');
//       }

//       const response = await axios.post(`${BASE_URL}/verification/verify-gst`, requestData, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       return response.data;
//     } catch (error) {
//       console.error('Error verifying GST:', error);
//       throw error;
//     }
//   },

//   checkCIN: async (formData) => {
//     const requestData = {
//       "cin": formData
//     };
   
//     try {
//       const token = sessionStorage.getItem("token"); 
//       if (!token) {
//         throw new Error('You need to log in.');
//       }

//       const response = await axios.post(`${BASE_URL}/verification/verify-cin`, requestData, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       return response.data;
//     } catch (error) {
//       console.error('Error verifying CIN:', error);
//       throw error;
//     }
//   },

//   checkBankAcc: async (formData) => {
//     try {
//       const token = sessionStorage.getItem("token"); 
//       if (!token) {
//         throw new Error('You need to log in.');
//       }
  
//       const response = await axios.post(`${BASE_URL}/verification/verify-bank`, formData, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       return response.data;
//     } catch (error) {
//       console.error('Error verifying bank account:', error);
//       throw error;
//     }
//   },

//   onboardUser: async (values, mId) => {
//     const token = sessionStorage.getItem("token");
//     try {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data',
//       };
//       const response = await axios.patch(`${BASE_URL}/merchant/complete/${mId}`, values, { headers });
//       return response.data;
//     } catch (error) {
//       console.error('Error onboarding user:', error);
//       throw error;
//     }
//   },

//   onboardUser1Step: async (values, mId) => {
//     const token = sessionStorage.getItem("token");
//     try {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };
//       const response = await axios.patch(`${BASE_URL}/merchant/step-one/${mId}`, values, { headers });
//       return response.data;
//     } catch (error) {
//       console.error('Error in step one onboarding:', error);
//       throw error;
//     }
//   },

//   onboardUser2Step: async (values, mId) => {
//     const token = sessionStorage.getItem("token");
//     try {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data',
//       };
//       const response = await axios.patch(`${BASE_URL}/merchant/step-two/${mId}`, values, { headers });
//       return response.data;
//     } catch (error) {
//       console.error('Error in step two onboarding:', error);
//       throw error;
//     }
//   },

//   getStep1: async (mId) => {
//     const token = sessionStorage.getItem("token");
//     try {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };
//       const response = await axios.get(`${BASE_URL}/merchant/${mId}/step1`, { headers });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching step one data:', error);
//       throw error;
//     }
//   },

//   getStep2: async (mId) => {
//     const token = sessionStorage.getItem("token");
//     try {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };
//       const response = await axios.get(`${BASE_URL}/merchant/${mId}/step2`, { headers });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching step two data:', error);
//       throw error;
//     }
//   },

//   getStep3: async (mId) => {
//     const token = sessionStorage.getItem("token");
//     try {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };
//       const response = await axios.get(`${BASE_URL}/merchant/${mId}/step3`, { headers });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching step three data:', error);
//       throw error;
//     }
//   },

//   getStep4: async (mId) => {
//     const token = sessionStorage.getItem("token");
//     try {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };
//       const response = await axios.get(`${BASE_URL}/merchant/${mId}/step4`, { headers });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching step four data:', error);
//       throw error;
//     }
//   },

//   onboardUser3Step: async (values, mId) => {
//     const token = sessionStorage.getItem("token");
//     try {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data',
//       };
//       const response = await axios.patch(`${BASE_URL}/merchant/step-three/${mId}`, values, { headers });
//       return response.data;
//     } catch (error) {
//       console.error('Error in step three onboarding:', error);
//       throw error;
//     }
//   },

//   onboardUser4Step: async (values, mId) => {
//     const token = sessionStorage.getItem("token");
//     try {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data',
//       };
//       const response = await axios.patch(`${BASE_URL}/merchant/step-four/${mId}`, values, { headers });
//       return response.data;
//     } catch (error) {
//       console.error('Error in step four onboarding:', error);
//       throw error;
//     }
//   },

//   merchantData: async (mId) => {
//     const token = sessionStorage.getItem("token") || sessionStorage.getItem("superToken");
//     try {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };
//       const response = await axios.get(`${BASE_URL}/merchant/single-merchant/${mId}`, { headers });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching merchant data:', error);
//       throw error;
//     }
//   },

//   updateMerchantDocument: async (mId, body) => {
//     const token = sessionStorage.getItem("token");
//     try {
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };
//       const response = await axios.patch(`${BASE_URL}/merchant/verify-document/${mId}`, body, { headers });
//       return response.data;
//     } catch (error) {
//       console.error('Error updating merchant document:', error);
//       throw error;
//     }
//   }
// };

// export default userService;


import axios from 'axios';

import { BASE_URL } from '@/utils/constants';

const parseErrorResponse = async (response) => {
  try {
    const text = await response.data.text();
    try {
      return JSON.parse(text).message || text;
    } catch {
      return text;
    }
  } catch {
    return response.statusText;
  }
};

const userService = {
  registerUser : async (values) => {
    const token = sessionStorage.getItem("token");     
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      
      // Send the POST request with the request body
      const response = await axios.post(`${BASE_URL}/users/register`,values, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },

  getAllUsers : async () => {
    const token = sessionStorage.getItem("token");     
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      
      // Send the POST request with the request body
      const response = await axios.get(`${BASE_URL}/users/all-user`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },

  getAnalytics : async () => {
    const token = sessionStorage.getItem("token");     
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      
      // Send the POST request with the request body
      const response = await axios.get(`${BASE_URL}/users/analytics`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },
  getVRecords : async () => {
    const token = sessionStorage.getItem("token");     
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      
      // Send the POST request with the request body
      const response = await axios.get(`${BASE_URL}/verification/get-vrecord`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },

  updateUser : async (id) => {
    const token = sessionStorage.getItem("token");     
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      
      // Send the POST request with the request body
      const response = await axios.patch(`${BASE_URL}/users/update-status/${id}`,{}, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },

  updateMerchant : async (id , status) => {
    const token = sessionStorage.getItem("token");     
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      
      // Send the POST request with the request body
      const response = await axios.patch(`${BASE_URL}/merchant/verify/${id}`,{status : status}, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },

  getUser : async () => {
    const token = sessionStorage.getItem("token");     
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      
      // Send the POST request with the request body
      const response = await axios.get(`${BASE_URL}/api/users/profile`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },


  



  
}

export default userService;