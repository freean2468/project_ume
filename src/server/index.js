const express = require('express');
const app = express();

// built-in
const fs = require('fs');

// third-party
const {MongoClient} = require('mongodb');

const PORT = process.env.PORT || 8090;

const DATABASE_NAME = "sensebe_dictionary";
const VIDEO_ARCHIVE_PATH = "collections/SB_VIDEO"
const VIDEO_COLLECTION = "SB_VIDEO";
const WORD_COLLECTION = "SB_ENG_BASE";

const PASSWORD = fs.readFileSync("./pw.txt", "utf8")

const LIST_WORD = "list_word.json"

var listWordJson = JSON.parse(fs.readFileSync(LIST_WORD, "utf8"));

app.use(express.static("dist"));

function preSearch(req, res) {
    const splitAt = index => x => [x.slice(0, index), x.slice(index)]
    const query = req.query;
    const search = query.search;
    let result = {}

    // gotta change the algorithm later
    switch(search[0]) {
        case '@': // Kor
            const aSearch = splitAt(1)(search);
            break;
        case '$': // Game titles
            const bSearch = splitAt(1)(search);
            break;
        default: // Eng
            for (let key in listWordJson) {
                if (key.includes(search)) {
                    result[key] = listWordJson[key]    
                }
                if (Object.keys(result).length >= 10) {
                    break;
                }
            }
            break;
    }

    if (Object.keys(result).length >= 2) {
        result = sortObject(result);
    }

    function sortObject(o) {
        var sorted = {},
        key, a = [];
    
        for (key in o) {
            if (o.hasOwnProperty(key)) {
                    a.push(key);
            }
        }
    
        a.sort();

        for (key = 0; key < a.length; key++) {
            sorted[a[key]] = o[a[key]];
        }
        return sorted;
    }

    res.json(result);
}

async function search(req, res) {
    const uri = `mongodb+srv://sensebe:${PASSWORD}@agjakmdb-j9ghj.azure.mongodb.net/test`
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    const query = req.query;
    const id = query.id;

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        
        const result = await client.db(DATABASE_NAME).collection(WORD_COLLECTION).findOne({ _id: parseInt(id) });
        
        if (result) {
            delete result._id;
            return res.json(result)
        } else {
            throw "[Search] something wrong"
        }
    } catch (e) {
        console.error(e.stack)
        res.json({res:e})
    } finally {
        await client.close()
    }
}

async function getVideo(req, res) {
    const uri = `mongodb+srv://sensebe:${PASSWORD}@agjakmdb-j9ghj.azure.mongodb.net/test`
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    const id = req.query.id

    try {
        // Connect to the MongoDB cluster
        await client.connect()
        
        const result = await client.db(DATABASE_NAME).collection(VIDEO_COLLECTION).findOne({ _id: id });
            
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

app.get('/api/preSearch', (req, res) => preSearch(req, res));
app.get('/api/search', (req, res) => search(req, res));
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