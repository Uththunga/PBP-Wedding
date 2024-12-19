import { toast as hotToast } from 'react-hot-toast';

const toast = {
  success: (message: string) => {
    hotToast.success(message, {
      style: {
        background: '#333',
        color: '#fff',
        borderRadius: '10px',
      },
      duration: 4000,
    });
  },
  error: (message: string) => {
    hotToast.error(message, {
      style: {
        background: '#333',
        color: '#fff',
        borderRadius: '10px',
      },
      duration: 4000,
    });
  },
};

export default toast;
