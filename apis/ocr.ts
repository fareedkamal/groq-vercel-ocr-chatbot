'use server';
import { configs } from '@/constants/configs';
import axios from 'axios';

export const getOCR = async (formData: any) => {
  try {
    const response = await axios.post(
      'https://api.pspdfkit.com/build',
      formData,
      {
        headers: {
          Authorization: `Bearer ${configs.ocrKey}`,
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'json',
      }
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
