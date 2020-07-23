const {MongoClient} = require('mongodb');
const fs = require('fs');

module.exports = function Enum() {
    this.PASSWORD = fs.readFileSync("./pw.txt", "utf8");
    this.URI = `mongodb+srv://sensebe:${this.PASSWORD}@agjakmdb-j9ghj.azure.mongodb.net/test`;
    this.DB = {}; 
    this.COL = {};
    this.SOURCE = {};

    this.WORD = {};

    this.initialize = async function () {
        const client = new MongoClient(this.URI, { useNewUrlParser: true, useUnifiedTopology: true });

        try {
            // Connect to the MongoDB cluster
            await client.connect();

            this.DB.PRODUCT = 'sensebe_dictionary';

            result = await client.db(this.DB.PRODUCT).collection("SB_ENUM").findOne({_id:"SOURCE"});
            
            delete result._id;

            Object.keys(result).map((item) => {
                this.SOURCE[item] = result[item];
            });

            result = await client.db(this.DB.PRODUCT).collection("SB_ENUM").findOne({_id:"COLLECTION"});
            
            delete result._id;

            Object.keys(result).map((item) => {
                this.COL[item] = result[item];
            });

            await client.db(this.DB.PRODUCT).collection("SB_ENG_LIST").find({}).toArray().then((result) => {
                this.WORD = {};

                for (let i in result) {
                    this.WORD[result[i]._id] = result[i].hash;
                }
            });    
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    };

    this.updateWord = async function () {
        const client = new MongoClient(this.URI, { useNewUrlParser: true, useUnifiedTopology: true });

        try {
            // Connect to the MongoDB cluster
            await client.connect();

            await client.db(this.DB.PRODUCT).collection("SB_ENG_LIST").find({}).toArray().then((result) => {
                this.WORD = {};

                for (let i in result) {
                    this.WORD[result[i]._id] = result[i].hash;
                }
            });    
        } catch (e) {
            console.error(e);
        } finally {
            await client.close();
        }
    }

    this.pushWord = function (wd, hash) {
        this.WORD[wd] = hash;
    }

    this.pullWord = function (wd) {
        delete this.WORD[wd];
    }

    this.getWord = function (wd) {
        return this.WORD[wd];
    }

    this.verifySource = function (source) {
        for (let key in this.SOURCE) {
            if (this.SOURCE[key] === source) return true;
        }
        return false;
    }
}