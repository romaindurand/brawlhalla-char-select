import ky from 'ky'

export function getClosestExp(url) {
  return ky.post(`${getApiBasePath()}/closest-exp`, {
    json: {
      steamUrl: url
    }
  }).json()
}

export function getLegends() {
  return ky.get(`${getApiBasePath()}/legends`).json()
}

function getApiBasePath () {
  const port = process.env.REACT_APP_API_PORT
  if (process.env.NODE_ENV === 'production') return '/api'
  return `http://localhost:${port}/api`
}