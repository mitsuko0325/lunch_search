const axios = require('axios')

// 環境変数にAPI_KEYを仕込む
const API_KEY = process.env.MAP_API_KEY


const FINDPLACEBASEURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"
const FINDPLACEFIELDS = 'geometry'

const NEARBYSEARCHBASEURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

var findPlaceConfig = {
  method: 'get',
  url: '',
  headers: {}
}

var nearbySearchConfig = {
  method: 'get',
  url: '',
  headers: {}
}


const lunch_serach = async () => {
  const location = await findPlace()
  const result = await nearbySearch(location)
  return result
} 

async function findPlace (input='shibuya station') {

  findPlaceConfig.url = `${FINDPLACEBASEURL}?input=${input}&inputtype=textquery&fields=${FINDPLACEFIELDS}&key=${API_KEY}`
  
  const result = axios(findPlaceConfig).then((res)=>{
    // console.log(JSON.stringify(res.data))
    // axios内でreturnしてもaxiosから抜けるだけ
    return res.data.candidates[0].geometry.location    
  }).catch((err)=>{
    throw new Error(err)
  })

  // async内でresolveしたいので、findPlaceでreturn
  return result
}

async function nearbySearch (location, radius=1500, type='restaurant', keyword='lunch') {
  
  nearbySearchConfig.url = `${NEARBYSEARCHBASEURL}?location=${location.lat},${location.lng}&radius=${radius}&type=${type}&keyword=${keyword}&key=${API_KEY}`

  const result = axios(nearbySearchConfig).then((res) => {
    return res.data.results
  }).catch((err) => {
    throw new Error(err)
  })

  return result
}

module.exports = lunch_serach