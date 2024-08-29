const { log } = require('console');
const express = require('express');
const app = express();



// serve static assets for default path
app.use(express.static('./public'))

app.get('/api/:date', (req, res) => {
  //const date = Number(req.params.date); use this to convert a unix input
  let date = req.params.date; // use this for string input of date
  let timestamp;
  if(date.length <= 10){
    timestamp = getUTC(date);
    res.send(timestamp);
  } else if (date.length > 10) {
    date = Number(date);
    timestamp = getUTC(date);
    res.send(timestamp);
  } else {
    res.send({error: "Invalid Date"})
  }
})

app.get('/api', (req, res) => {
  const timestamp = getUTC();
  res.send(timestamp);
})

app.listen(5000, () => {
  console.log("Express is running on port 5000...")
})

/*
  Logic for getting current date and respective values
*/
const getUTC = (date) => {
  let unix;
  let timestamp;
  if (date){
    unix = Math.floor(new Date(date).getTime())
    timestamp = new Date(date); 
  } else {
    unix = Date.now();
    timestamp = new Date();
  }
    
  // add zeros to single digit "seconds" || "minutes" || "hours"
  const addZero = (i) => {
    if (i < 10) {
      i = "0" + i
    } return i;
  }
  // Get UTC components
  const year = timestamp.getUTCFullYear();
  let month = timestamp.getUTCMonth();
  const day = timestamp.getUTCDate();
  let dayOfWeek = timestamp.getUTCDay();
  const hours = addZero(timestamp.getUTCHours());
  const minutes = addZero(timestamp.getUTCMinutes());
  const seconds = addZero(timestamp.getUTCSeconds());
  
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  dayOfWeek = weekday[dayOfWeek];
  
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  month = months[month];
  return {"unix": unix, "utc": `${dayOfWeek.slice(0,3)}, ${day} ${month.slice(0,3)} ${year} ${hours}:${minutes}:${seconds} GMT`}
}