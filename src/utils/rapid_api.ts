import axios from 'axios'

export const rapidAPI = axios.create({
  baseURL: 'https://api-football-v1.p.rapidapi.com/v3',
  headers: {
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }
})