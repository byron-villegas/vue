import type { Amiibo } from '@/models/Amiibo'
import axios from 'axios'

const serverUrl = import.meta.env.VITE_SERVER_URL

export async function findAmiibosBySerie(serie: string): Promise<Amiibo[]> {
  const response = await axios.get(`${serverUrl}/amiibo/?amiiboSeries=${serie}`)
  return response.data.amiibo as Amiibo[]
}