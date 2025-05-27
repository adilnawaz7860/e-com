
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';





const AdminService = {
 
  getAllUsers : async () => {
     const token = sessionStorage.getItem("token");     
     try {
       const headers = {
         Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json',
       };
       
       // Send the POST request with the request body
       const response = await axios.get(`${BASE_URL}/api/users`, { headers });
       return response.data;
     } catch (error) {
       console.error('Error fetching data:', error);
       throw error;
     }
 
   },

   

     createUser : async () => {
     const token = sessionStorage.getItem("token");     
     try {
       const headers = {
         Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json',
       };
       
       // Send the POST request with the request body
       const response = await axios.post(`${BASE_URL}/api/users/createuser`,{}, { headers });
       return response.data;
     } catch (error) {
       console.error('Error fetching data:', error);
       throw error;
     }
 
   },

     deleteUser : async (id) => {
     const token = sessionStorage.getItem("token");     
     try {
       const headers = {
         Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json',
       };
       
       // Send the POST request with the request body
       const response = await axios.delete(`${BASE_URL}/api/users/${id}`, { headers });
       return response.data;
     } catch (error) {
       console.error('Error fetching data:', error);
       throw error;
     }
 
   },

     updateUser : async (id, values) => {
     const token = sessionStorage.getItem("token");     
     try {
       const headers = {
         Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json',
       };
       
       // Send the POST request with the request body
       const response = await axios.put(`${BASE_URL}/api/users/${id}`,values, { headers });
       return response.data;
     } catch (error) {
       console.error('Error fetching data:', error);
       throw error;
     }
 
   },

  //  Products

    getAllProducts : async () => {
     const token = sessionStorage.getItem("token");     
     try {
       const headers = {
         Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json',
       };
       
       // Send the POST request with the request body
       const response = await axios.get(`${BASE_URL}/api/products`, { headers });
       return response.data;
     } catch (error) {
       console.error('Error fetching data:', error);
       throw error;
     }
 
   },

      createProduct : async () => {
     const token = sessionStorage.getItem("token");     
     try {
       const headers = {
         Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json',
       };
       
       // Send the POST request with the request body
       const response = await axios.post(`${BASE_URL}/api/products`,{}, { headers });
       return response.data;
     } catch (error) {
       console.error('Error fetching data:', error);
       throw error;
     }
 
   },

      deleteProduct : async (id) => {
     const token = sessionStorage.getItem("token");     
     try {
       const headers = {
         Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json',
       };
       
       // Send the POST request with the request body
       const response = await axios.delete(`${BASE_URL}/api/products/${id}`, { headers });
       return response.data;
     } catch (error) {
       console.error('Error fetching data:', error);
       throw error;
     }
 
   },


updateProduct: async (id, values) => {
  console.log("hell", values.image);
  const token = sessionStorage.getItem("token");
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'

      // Do NOT set 'Content-Type' manually here for FormData
    };

    const response = await axios.put(
      `${BASE_URL}/api/products/${id}`,
      values, // `values` should be a FormData instance from your form
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
},

  productById : async (id) => {
     const token = sessionStorage.getItem("token");     
     try {
       const headers = {
         Authorization: `Bearer ${token}`,
         'Content-Type': 'application/json',
       };
       
       // Send the POST request with the request body
       const response = await axios.get(`${BASE_URL}/api/products/${id}`, { headers });
       return response.data;
     } catch (error) {
       console.error('Error fetching data:', error);
       throw error;
     }
 
   },





  
  



}

export default AdminService;
