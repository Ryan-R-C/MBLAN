import axios, { AxiosRequestConfig } from 'axios'

const TIMEOUT_SECONDS = 30
const IP = process.env.VUE_APP_BACKEND_HOST as string
const PORT = process.env.VUE_APP_BACKEND_PORT as string

interface ApiConfig {
    ip: string;
    port: string;
    timeout: number;
    headers: AxiosRequestConfig['headers'];
}

const apiConfigurations: ApiConfig = {
  ip: IP,
  port: PORT,
  timeout: 1000 * TIMEOUT_SECONDS,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
}

export const api = axios.create({
  baseURL: `${apiConfigurations.ip}${apiConfigurations.port}`,
  timeout: apiConfigurations.timeout,
  headers: {
    ...apiConfigurations.headers
  }
})
