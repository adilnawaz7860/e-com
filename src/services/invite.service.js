import axiosInstance from '@/utils/config.axios'; // Import the singleton axios instance

// Fetch merchant data using the merchant code
export async function getMerchantDataFromMerchantCode(merchantCode) {
  try {
    const response = await axiosInstance.get(`/merchant/${merchantCode}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching merchant data:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to fetch merchant data');
  }
}

export async function getMerchantByID(merchantId) {
  try {
    const response = await axiosInstance.get(`/merchant/byId/${merchantId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching merchant data:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to fetch merchant data');
  }
}

export async function getBasicDetailsStep(merchantId) {
  try {
    const response = await axiosInstance.get(`/merchant/basic-detail/${merchantId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching merchant data:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to fetch merchant data');
  }
}

export async function getKYCDetailsStep(merchantId) {
  try {
    const response = await axiosInstance.get(`/merchant/kyc-detail/${merchantId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching merchant data:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to fetch merchant data');
  }
}

export async function getFundamentalsDetailsStep(merchantId) {
  try {
    const response = await axiosInstance.get(`/merchant/foundational-detail/${merchantId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching merchant data:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to fetch merchant data');
  }
}

export async function getMerchantDetailsByID(merchantId) {
  try {
    const response = await axiosInstance.get(`/merchant/details/${merchantId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching merchant data:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to fetch merchant Details');
  }
}

// Example of sending a document upload with the merchant code as part of the request
export async function uploadDocument(merchantCode, documentData) {
  try {
    const response = await axiosInstance.post(`/merchant/${merchantCode}/upload`, documentData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading document:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to upload document');
  }
}

// Example of submitting a basic form with the merchant code
export async function submitBasicForm(merchantCode, formData) {
  try {
    const response = await axiosInstance.post(`merchant/${merchantCode}/basic-info`, formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting basic form:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to submit form');
  }
}

export async function finalSubmitForm(merchantCode, formData) {
  try {
    const response = await axiosInstance.put(`merchant/${merchantCode}/final-submit`);
    return response.data;
  } catch (error) {
    console.error('Error submitting Final form:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to final submit form');
  }
}


export async function updateDocumentStatus(documentId, documentData) {
  try {
    const response = await axiosInstance.put(`/merchant/verify-document/${documentId}`, documentData, {
      headers: {
        'Content-Type': 'application/json', // Assuming it's JSON data, you can adjust if you use `multipart/form-data`
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating document:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to update document');
  }
}


export async function verifyDocumentApi(documentId) {
  try {
    const response = await axiosInstance.post(`/merchant/documents/${documentId}/verify`, {
      headers: {
        'Content-Type': 'application/json', // Assuming it's JSON data, you can adjust if you use `multipart/form-data`
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating document:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to update document');
  }
}

export const sendEmailVerificationLink = async (merchantId) => {
  try {
    const response = await axiosInstance.get(`/merchant/${merchantId}/send-verification-link`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to send verification link' };
  }
};

export const verifyEmailToken = async (token) => {
  try {
    const response = await axiosInstance.post(`/merchant/verify-email-token`, { token });
    return response.data;
  } catch (error) {
    console.error('Error verifying email token:', error.response || error);
    throw error.response?.data || { message: 'Email verification failed' };
  }
};


export const downloadAllDocumentsZip = async (merchantId) => {
  const response = await axiosInstance.get(`/merchant/${merchantId}/documents/download`, {
    responseType: "blob",
  });

  const blob = new Blob([response.data], { type: "application/zip" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `merchant_${merchantId}_documents.zip`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url); // Clean up
};

export async function updateDocumentDetails(documentId, docDetail) {
  try {
    const requestBody = {
      docDetail:JSON.stringify(docDetail)
    };
    const response = await axiosInstance.put(`/merchant/documents/${documentId}/edit`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating document details:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to update document details');
  }
}



