const express = require("express");
const app = express()
const lunch_search = require('./lunch_search')
 
app.get("/", async (req, res, next)=>{
  // TODO reqでkeyword, typeなど入れられるようにする
  const result = await lunch_search()
  var response = []
  // 上3件を表示
  for (var i =0; i < 3; i++) {
    const data = {
      name : result[i].name,
      rating : result[i].rating,
      types : result[i].user_ratings_total,
      opening_hours : result[i].opening_hours,
      vicinity : result[i].vicinity
    }

    response.push(data)
  }
  res.send(response)
})

app.get('/test', (req, res, next) => {
  res.send('test page')
})

const server = app.listen(3000, ()=>{
  console.log(`Node.js is listening on Port ${server.address().port}`)  
})