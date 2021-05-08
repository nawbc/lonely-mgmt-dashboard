import axios from 'axios';
import { message } from 'antd';

export const req = axios.create({
  timeout: 8000,
  baseURL: import.meta.env.VITE_API as string,
});

req.interceptors.request.use(
  function (config) {
    console.log('request....', config);
    const jwt = localStorage.getItem('t');
    config.headers['Authorization'] = `Bearer ${jwt}`;
    return config;
  },
  function (error) {
    return Promise.resolve(error);
  },
);

req.interceptors.response.use(
  function (response) {
    const data = response.data;

    if (data.code <= 0 && data.message) {
      message.error(data.message);
    }

    return response;
  },
  function (error) {
    if (error.response) {
      const data = error.response.data;
      console.error(error.response);

      if (data.message) {
        message.error(data.message);
      }

      if (data.statusCode === 401) {
        localStorage.removeItem('t');
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    } else {
      message.error('无响应');
    }

    return Promise.resolve(error.response);
  },
);

export const reqClient = axios.create({
  timeout: 8000,
  baseURL: import.meta.env.VITE_API as string,
});

reqClient.interceptors.request.use(
  function (config) {
    console.log('request client....', config);
    if (config.data) {
      config.data.packageName = import.meta.env.VITE_PACKAGENAME;
    } else {
      config.data = {
        packageName: import.meta.env.VITE_PACKAGENAME as any,
      };
    }
    const jwt = localStorage.getItem('client_auth');
    config.headers['Authorization'] = `Bearer ${jwt}`;
    return config;
  },
  function (error) {
    return Promise.resolve(error);
  },
);

reqClient.interceptors.response.use(
  function (response) {
    const data = response.data;

    if (data.code <= 0 && data.message) {
      message.error(data.message);
    }

    return response;
  },
  function (error) {
    if (error.response) {
      const data = error.response.data;
      console.log(error.response);

      if (data.message) {
        message.error(data.message);
      }

      if (data.statusCode === 401) {
        localStorage.removeItem('t');
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    } else {
      message.error('无响应');
    }
    return Promise.resolve(error.response);
  },
);
