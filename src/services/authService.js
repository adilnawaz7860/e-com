
import axios from 'axios';
import { BASE_URL } from '@/utils/constants';





const AuthService = {
 
 

  logIn: async (requestBody) => { 
    console.log(requestBody,BASE_URL ,'nody')
   
    
    try {
    
      
      // Send the POST request with the request body
      const response = await axios.post(`${BASE_URL}/api/users/auth`, requestBody);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },


  register: async (values) => {
    
  
    try {
      // Send the POST request with the request body
      const response = await axios.post(`${BASE_URL}/api/users`, values);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

   forgotPassword: async (values) => {
    
  
    try {
      // Send the POST request with the request body
      const response = await axios.post(`${BASE_URL}/api/users/forgot-password`, values);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

     resetPassword: async (reqBody) => {
      // console.log(token , password ,"asa")
    
  
    try {
      // Send the POST request with the request body
      const response = await axios.post(`${BASE_URL}/api/users/change-password`,reqBody);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },



  
  



}

export default AuthService;
