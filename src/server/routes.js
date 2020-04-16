import cors from 'cors'
import bodyParser from 'body-parser'
import BrawlhallaApi from 'brawlhalla-api'
import { computeRemainingXp } from '../lib/exp'

const bh = BrawlhallaApi(process.env.API_KEY)
console.log(process.env.API_KEY)

export function setupRoutes (api) {
  api.use(cors())
  api.use(bodyParser.json())

  api.get('/api/legends', allLegendsHandler)
  api.post('/api/find-account', findAccountHandler)
}

async function findAccountHandler (req, res) {
  const steamUrl = req.body.steamUrl
  try {
    const bhId = await bh.getBhidBySteamUrl(steamUrl)
    const stats = await bh.getPlayerStats(String(bhId.brawlhalla_id))
    const legends = stats.legends.map(computeRemainingXp)
    res.json({ ...stats, legends })
  } catch (ex) {
    res.status(400).json({ errorMessage: ex.message, stack: ex.stack })
  }
}

function allLegendsHandler (_, res) {
  const legends = bh.legends.get('all')
  res.json(legends)
}
