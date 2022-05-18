export const userDomain = 'https://user.vscj.com';
export const hostDomain = 'https://host.vscj.com';
// export const hostDomain = 'http://127.0.0.1:9200';

import axios from 'axios';

const domainMap = {
  user: userDomain,
  host: hostDomain,
};

type domainType = keyof typeof domainMap;
export const getAxios = (domain: domainType, token?: string) => {
  const instance = axios.create({
    baseURL: domainMap[domain],
  });
  instance.interceptors.response.use(
    function (response) {
      return response.data;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  instance.interceptors.request.use((config) => {
    if (token) {
      Object.assign(config.headers, {
        // Authorization: `Bearer ${token}`,
        Authorization: token,
      });
    }
    return config;
  });
  return instance;
};

export const getUserAxios = (token?: string) => getAxios('user', token);
export const getHostAxios = (token?: string) => getAxios('host', token);
