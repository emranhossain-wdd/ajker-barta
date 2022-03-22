import run from '../../../utils/database';
const ObjectId = require('mongodb').ObjectId;

export default async function handler(req, res) {
    const { database } = await run();
    const news = database.collection('news');


    if (req.method === 'GET') {
        const result = await news.find({}).toArray();
        res.status(200).json(result);
    }
    else if (req.method === 'POST') {
        const singleNews = req.body;
        const result = await news.insertOne(singleNews);
        res.status(201).json(result);
    }
    // delete news
    if (req.method === 'DELETE') {
        const id = req.query.id;
        const query = { '_id': ObjectId(id) };
        const result = await news.deleteOne(query);
        res.status(200).json(result)
    }

    // update news 
    else if (req.method === 'PATCH') {
        const id = req.query.id;
        const data = req.body;
        console.log("Edit English News: Hitted ", id, "----", req.body);
        const query = { '_id': ObjectId(id) };
        const updateDoc = {
            $set: data,
        }
        const result = await news.updateOne(query, updateDoc);
        res.status(201).json(result);
    }
}