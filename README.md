# Express Redis Photo API With Docker

## Overview
This Express application provides a simple API to fetch, cache, update, and delete photo data using Redis as a caching layer. The application fetches photo data from an external API and uses Redis to cache this data for faster retrieval.

## Prerequisites
Node.js
npm (Node Package Manager)
Docker and Docker Compose

## Installation

### Setting Up Redis with Docker
#### Start Redis Container:
Ensure Docker is running on your machine.
Use Docker Compose to start a Redis container:
```
docker-compose up -d
```
This command starts a Redis instance running on port `6379`.

### Setting Up the Application
#### Clone the Repository:
git clone [https://github.com/muhammadamas/Docker-With-Redis.git]
cd Docker-With-Redis

#### Install Dependencies:
Navigate to the project directory and run:
```
npm install
```
This command installs all necessary Node.js dependencies including `express`, `cors`, `axios`, and `redis`.

### Running the Application
Start the server with:
```
npm run dev
```
The server will start on `http://localhost:3000`.


### API Endpoints
#### Get Photos
URL: /photos
Method: GET
Description: Fetches photo data. Retrieves from Redis cache if available, otherwise fetches from the external API and caches it.

#### Read Data from Redis
URL: /read/:key
Method: GET
Description: Reads data from Redis cache based on the provided key.

#### Update Data in Redis
URL: /update/:key
Method: PUT
Description: Updates data in Redis cache for the given key.
Body:
```json
{
  "value": {
    "albumId": 111111,
    "id": 1,
    "title": "New Title",
    "url": "https://via.placeholder.com/600/new",
    "thumbnailUrl": "https://via.placeholder.com/150/new"
  }
}
```

#### Delete Data from Redis
URL: /delete/:key
Method: DELETE
Description: Deletes data from Redis cache for the given key.

### Error Handling
All endpoints return appropriate status codes and error messages in case of failure.