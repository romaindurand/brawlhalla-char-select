require('dotenv').config()
const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const bh = require('brawlhalla-api')(process.env.API_KEY)
const getXpTarget = require('../lib/exp')

const api = express()
api.use(cors())
api.use(bodyParser.json())

api.get('/legends', (req, res) => {
  const legends = bh.legends.get('all')
  res.json(legends)
})

api.post('/closest-exp', async (req, res) => {
  const steamUrl = req.body.steamUrl
  const bhId = await bh.getBhidBySteamUrl(steamUrl)
  const stats = await bh.getPlayerStats(String(bhId.brawlhalla_id))
  const legends = stats.legends.map(legend => {
    const percent = legend.xp_percentage
    const level = legend.level
    const totalXp = getXpTarget(level)
    const xp = totalXp * percent
    return {
      name: legend.legend_name_key,
      level,
      percent,
      xp,
      xpToLvlUp: totalXp - xp
    }
  }).sort((a, b) => a.xpToLvlUp - b.xpToLvlUp)
  res.json(legends)
})

console.log(`API server listening on http://localhost:${process.env.REACT_APP_API_PORT}`)
api.listen(process.env.REACT_APP_API_PORT)