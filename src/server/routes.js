const cors = require('cors')
const bodyParser = require('body-parser')
const bh = require('brawlhalla-api')(process.env.API_KEY)

const { computeRemainingXp } = require('../lib/exp')

function setupRoutes (api) {
  api.use(cors())
  api.use(bodyParser.json())

  api.get('/api/legends', allLegendsHandler)
  api.post('/api/find-account', findAccountHandler)
}

module.exports = {
  setupRoutes,
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
