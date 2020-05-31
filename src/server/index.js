const express = require('express');
const app = express();

// built-in
const fs = require('fs');

// third-party
const {MongoClient} = require('mongodb');

const PORT = process.env.PORT || 8090;

const DATABASE_NAME = "sensebe_dictionary"
const VIDEO_ARCHIVE_PATH = "collections/SB_VIDEO"
const VIDEO_COLLECTION = "SB_VIDEO"

const PASSWORD = fs.readFileSync("./pw.txt", "utf8")

async function getVideo(req, res) {
    const uri = `mongodb+srv://sensebe:${PASSWORD}@agjakmdb-j9ghj.azure.mongodb.net/test`
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

    try {
        // Connect to the MongoDB cluster
        await client.connect()

        let id = req.query.id
        
        result = await client.db(DATABASE_NAME).collection(VIDEO_COLLECTION).findOne({ _id: id });
            
        if (result) {
            return res.json(result)
        } else {
            throw result
        }
    } catch (e) {
        console.error(e)
        res.json({res:e})
    } finally {
        await client.close()
    }
}

app.get('/api/getVideo', (req, res) => getVideo(req, res));

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

async function createListing(client, newListing, collection){
    const result = await client.db(DATABASE_NAME).collection(collection).insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}(${newListing['link']})`);
}

async function replaceListing(client, listing, collection) {
    result = await client.db(DATABASE_NAME).collection(collection).replaceOne({
        _id : listing['_id']
    }, 
    {
        $set: listing
    });
    
    // console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`_id : ${listing['_id']}, for "${listing["link"]}" replaced : matchedCount(${result.matchedCount}), modiefiedCount(${result.modifiedCount})`);
}