const express = require("express");
const cors = require("cors");
const axios = require("axios");
const createRedisClient = require("./redisClient");

const app = express();
app.use(express.json());
app.use(cors());

const redisClient = createRedisClient();

// ! to set data in redis (key is 'photos' in our case)
app.get("/photos", async (req, res) => {
  try {
    // Check for cached photos
    const cachedPhotos = await redisClient.get("photos");

    if (cachedPhotos) {
      console.log("Cache hit");
      res.json(JSON.parse(cachedPhotos));
    } else {
      console.log("Cache miss");
      // Fetch photos from the API
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      // Cache the response data
      await redisClient.set("photos", JSON.stringify(response.data));
      res.json(response.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});

// ! to read data from redis (key is 'photos' in our case)
app.get("/read/:key", async (req, res) => {
  try {
    const { key } = req.params;
    const value = await redisClient.get(key);
    if (value) {
      res.json(JSON.parse(value));
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});

// ! to update data in redis (key is 'photos' in our case)
// ? Body
/*
{
  "value": {
    "albumId": 101111,
    "id": 1,
    "title": "accusamus beatae ad facilis cum similique qui sunt",
    "url": "https://via.placeholder.com/600/92c952",
    "thumbnailUrl": "https://via.placeholder.com/150/92c952"
  }
}
*/

app.put("/update/:key", async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    // Verify that both key and value are provided
    if (!key) return res.status(400).send(`Key is ${key}`);

    if (!value) return res.status(400).send(`Value is ${value}`);

    const exists = await redisClient.exists(key);
    if (exists) {
      await redisClient.set(key, JSON.stringify(value));
      res.send("Updated");
    } else {
      res.status(404).send("Not Found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});

// ! to delete data from redis (key is 'photos' in our case)
app.delete("/delete/:key", async (req, res) => {
  try {
    const { key } = req.params;
    await redisClient.del(key);
    res.send("Deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
