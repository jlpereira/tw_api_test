import Axios from 'axios'
import API_CONFIG from '@/config.json'

const axiosInstance = Axios.create({
  baseURL: API_CONFIG.apiUrl,
})

const GetRequest = (url, data = {}) => axiosInstance.get(url, { params: Object.assign({}, API_CONFIG.apiParams, data) })

const GetTaxonName = (id) => axiosInstance.get(`/taxon_names/${id}.json`, { params: API_CONFIG.apiParams })

export {
  GetRequest,
  GetTaxonName
}