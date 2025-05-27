
import axios from 'axios';

import { BASE_URL } from '@/utils/constants';

const superAdminService = {

  updateCharge: async (updateData) => {

    const token = sessionStorage.getItem("superToken");
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // Send the POST request with the request body
      const response = await axios.put(`${BASE_URL}/super/verification/update-charge`, updateData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },

  updateChargeAmount: async (adminId, chargeId, amount, status) => {
    const updateData = {
      adminId,
      chargeId,
      updateData: { amount, status },
    };
    const token = sessionStorage.getItem("superToken");     
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // Send the POST request with the request body
      const response = await axios.put(`${BASE_URL}/super/verification/update-charge`, updateData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },

   setNumberOfUsers : async (userLimit ,id) => {
      const token = sessionStorage.getItem("superToken");     
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
        
        // Send the POST request with the request body
        const response = await axios.patch(`${BASE_URL}/super/admin/user-limit/${id}`,{userLimit}, { headers });
        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
  
    },
  

    getAnalytics : async () => {
      const token = sessionStorage.getItem("superToken");     
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
        
        // Send the POST request with the request body
        const response = await axios.get(`${BASE_URL}/super/merchant/get-analytics`, { headers });
        return response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
  
    },
  assignCharges: async (values, adminId) => {
    const token = sessionStorage.getItem("superToken");
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // Send the POST request with the request body
      const response = await axios.put(`${BASE_URL}/super/verification/assign-charge/${adminId}`, { charges: values }, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },

  addBalance: async (values, adminId) => {
    const token = sessionStorage.getItem("superToken");
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // Send the POST request with the request body
      const response = await axios.post(`${BASE_URL}/super/verification/add-wallet/${adminId}`, { amount: values }, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },
  deductBalance: async (values, adminId) => {
    const token = sessionStorage.getItem("superToken");
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // Send the POST request with the request body
      const response = await axios.post(`${BASE_URL}/super/verification/deduct-wallet/${adminId}`, { amount: values }, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },

  getSingleAdmin: async (id) => {
    const token = sessionStorage.getItem("superToken");
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // Send the POST request with the request body
      const response = await axios.get(`${BASE_URL}/super/user/get-admin/${id}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },

  registerAdmin: async (values, charges) => {
    const formData = {
      ...values,
      "charges": [
        { "type": "AADHAAR", "amount": charges.aadhaar },
        { "type": "PAN", "amount": charges.pan },
        { "type": "GST", "amount": charges.gst },
        { "type": "CIN", "amount": charges.cin },
        { "type": "UDHYAM", "amount": charges.udhyam },
        { "type": "MOBILE", "amount": charges.mobile }
      ]
    }

    const token = sessionStorage.getItem("superToken");
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // Send the POST request with the request body
      const response = await axios.post(`${BASE_URL}/super/user/register-admin`, formData, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },

  getAllAdmins: async () => {
    const token = sessionStorage.getItem("superToken");
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // Send the POST request with the request body
      const response = await axios.get(`${BASE_URL}/super/user/all-admin`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },
  getOnboarded : async (id) => {
    const token = sessionStorage.getItem("superToken");     
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      
      // Send the POST request with the request body
      const response = await axios.get(`${BASE_URL}/super/analytics/user-analytics/${id}
`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },
  getOnboardedAdmins : async (id) => {
    const token = sessionStorage.getItem("superToken");     
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      
      // Send the POST request with the request body
      const response = await axios.get(`${BASE_URL}/super/analytics/admin-analytics/${id}
`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },

  getUsersByAdminId: async (id) => {
    const token = sessionStorage.getItem("superToken");
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // Send the POST request with the request body
      const response = await axios.get(`${BASE_URL}/super/user/get-user/${id}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },

  getAllCharges: async () => {
    const token = sessionStorage.getItem("superToken");
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // Send the POST request with the request body
      const response = await axios.get(`${BASE_URL}/super/verification/get-vrecord`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },

  getChargesByAdmin: async (id) => {
    const token = sessionStorage.getItem("superToken");
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // Send the POST request with the request body
      const response = await axios.get(`${BASE_URL}/super/verification/admin-verification/${id}`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },

  getAllUsers: async () => {
    const token = sessionStorage.getItem("superToken");
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // Send the POST request with the request body
      const response = await axios.get(`${BASE_URL}/super/user/all-user`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },

  getUser: async (id) => {
    const token = sessionStorage.getItem("superToken");
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // Send the POST request with the request body
      const response = await axios.get(`${BASE_URL}/users/current-user`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },

  checkAadhaar: async (formData) => {
    const requestData = {
      "aadhaar": formData
    };



    try {
      const token = sessionStorage.getItem("superToken");
      if (!token) {
        throw new Error('You need to log in.');
      }

      const response = await axios.post(`${BASE_URL}/verification/verify-aadhaar`, requestData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Verification failed');
      }

      return response.data;
    } catch (error) {
      console.error(error); // Log the error for debugging
      throw error; // Rethrow the error to handle it in handleSubmit
    }
  },

  checkPAN: async (formData) => {
    const requestData = {
      "pan": formData
    };


    try {
      const token = sessionStorage.getItem("superToken");
      if (!token) {
        throw new Error('You need to log in.');
      }



      const response = await axios.post(`${BASE_URL}/verification/verify-pan`, requestData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data; // You can return the response if needed.
    } catch (error) {
      throw error; // Rethrow the error so it can be handled in handleSubmit
    }
  },

  checkGST: async (formData) => {

    const requestData = {
      "gst": formData
    };


    try {
      const token = sessionStorage.getItem("superToken");
      if (!token) {
        throw new Error('You need to log in.');
      }



      const response = await axios.post(`${BASE_URL}/verification/verify-gst`, requestData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data; // You can return the response if needed.
    } catch (error) {
      throw error; // Rethrow the error so it can be handled in handleSubmit
    }
  },

  checkCIN: async (formData) => {
    const requestData = {
      "cin": formData
    };



    try {
      const token = sessionStorage.getItem("superToken");
      if (!token) {
        throw new Error('You need to log in.');
      }



      const response = await axios.post(`${BASE_URL}/verification/verify-cin`, requestData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data; // You can return the response if needed.
    } catch (error) {
      throw error; // Rethrow the error so it can be handled in handleSubmit
    }
  },

  checkBankAcc: async (formData) => {




    try {
      const token = sessionStorage.getItem("superToken");
      if (!token) {
        throw new Error('You need to log in.');
      }



      const response = await axios.post(`${BASE_URL}/verification/verify-bank`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data; // You can return the response if needed.
    } catch (error) {
      throw error; // Rethrow the error so it can be handled in handleSubmit
    }
  },

  updateAdmin: async (id) => {
    const token = sessionStorage.getItem("superToken");
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // Send the POST request with the request body
      const response = await axios.patch(`${BASE_URL}/super/user/update-status/${id}`, {}, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }



  },

  getAllMerchants: async () => {
    const token = sessionStorage.getItem("superToken");
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // Send the POST request with the request body
      const response = await axios.get(`${BASE_URL}/super/merchant/all-merchant`, { headers });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }

  },


}

export default superAdminService;