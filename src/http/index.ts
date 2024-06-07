import axios, { AxiosInstance } from "axios"

const httpClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3333'
})

export default httpClient