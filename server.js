// app entry point


const axios = require('axios'),
      express = require('express'),
      { MongoClient } = require('mongodb');

const app = express(),
      baseUrl = process.env.BASE_URL,
      collectionName = 'img-find',
      dataKeyMap = {
        contextLink: 'context',
        link: 'url',
        thumbnailLink: 'thumbnail',
        title: 'snippet',
      },
      dbUrl = process.env.DB_URL,
      endUrl = process.env.GOOGLE_URL_END,
      queryKeyMap = {
        num: 'num',
        offset: 'start',
        q: 'q',
        rights: 'rights',
        size: 'imgSize',
        type: 'fileType',
      },
      storeKeys = ['term', 'when'];

let db, collection, listener;


app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));

app.get('/queryKeyMap', (req, res) => res.json(queryKeyMap));

app.get('/search', async (req, res) => {
  const query = req.query;
  
  let newSearch,
      url = baseUrl;
  
  if (query.hasOwnProperty('offset')) {
    query.offset = query.hasOwnProperty('num') ?
      +query.offset * +query.num : 
      +query.offset * 10;
  }
  
  for (let key in query) {
    if (url.slice(-1) !== '?') url += '&';
    if (queryKeyMap.hasOwnProperty(key)) url += `${queryKeyMap[key]}=${query[key]}`;
  } 
  
  url += url.slice(-1) === '&' ? endUrl : '&' + endUrl;
  
  try {
    const response = await axios.get(url);
    const json = response.data.items.map( el => {
      let item = {};
      
      for (let key in dataKeyMap) {
        el.hasOwnProperty(key) ? 
          item[dataKeyMap[key]] = el[key] : 
          item[dataKeyMap[key]] = el.image[key];
      }
      
      return item;
    });
    
    newSearch = { [storeKeys[0]]: query.q, [storeKeys[1]]: new Date().toISOString() };
    collection.insert(newSearch);
    res.set({ 'Content-Type': 'application/json' });
    res.send(JSON.stringify(json, null, '  '));
  } 
  catch (err) { console.log(err), res.end(err) }
});

app.get('/latest', async (req, res) => {
  try {
    const count = await collection.count();
    const num = req.query.hasOwnProperty('num') && typeof +req.query.num === 'number' ?
      Math.min(+req.query.num, count):
      Math.min(+req.query.num, 10);

    const latestSearches = await collection.find().limit(num).sort({ when: -1 }).toArray();

    res.set({ 'Content-Type': 'application/json' });
    res.send(JSON.stringify(latestSearches, storeKeys, '  '));
  }
  catch(err) { console.log(err), res.end(err) }
});


MongoClient.connect(dbUrl, (err, database) => {
  if (err) throw err;
  
  db = database;
  collection = db.collection(collectionName);
  
  listener = app.listen(process.env.PORT, () => {
    console.log('Your app is listening on port ' + listener.address().port);
  });
});