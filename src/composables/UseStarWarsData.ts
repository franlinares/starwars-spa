import axios from 'axios'

export async function fetchAllResources<T>(resource: 'people' | 'planets'): Promise<T[]> {
  const url = `https://swapi.info/api/${resource}`

  try {
    const { data } = await axios.get(url)

    if (Array.isArray(data)) return data as T[]
    if ('results' in data) return data.results as T[]

    console.log(`Unexpected response structure when fetching ${resource}.`)
  } catch (error) {
    console.error(`Error while fetching ${resource} from ${url}:`, error)
  }

  return []
}
