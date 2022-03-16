import run from '../../../utils/database';

export default async function handler(req, res) {
    const { database } = await run();
    const bnnews = database.collection('bnnews');

    if (req.method === 'GET') {
        const result = await bnnews.find({}).toArray();
        res.status(200).json(result);
    }
    else if (req.method === 'POST') {
        const singleNews = req.body;
        const result = await bnnews.insertOne(singleNews);
        res.status(201).json(result);
    }
    else if (req.method === 'PATCH') {
        const id = req.query.id;
        const { heading, images, description, reporter } = req.body;
        console.log("Hitted Edit Bengali News: ", id);
        // const query = { _id: ObjectId(id) };
        // const updateDoc = {
        //     $set: reporter, description, images, heading,
        // }
        // const result = await bnnews.updateOne(query, updateDoc);
        res.status(201).json("Bangla news edit Hitted");
    }
}