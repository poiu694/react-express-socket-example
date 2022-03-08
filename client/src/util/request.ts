import axios, { AxiosPromise } from 'axios';
import { RequestBody } from './type';

const baseUrl = 'http://localhost:8080';

const getHeader = () => {
  return {
    withCredentials: true,
  };
};

class RequestAPI {
  get(path: string): Promise<AxiosPromise> {
    return axios.get(`${baseUrl}${path}`, getHeader());
  }

  post(path: string, body: RequestBody): Promise<AxiosPromise> {
    return axios.post(`${baseUrl}${path}`, body, getHeader());
  }
}

const requestAPI = new RequestAPI();

export default requestAPI;
