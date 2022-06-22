import Visitor from '../models/visitor.js';

export const addVisitor = async (req, res) => {
    const {ip, date} = req.body;
    try {
        const isExist = await Visitor.findOne({ip: ip, date: date});
        if(isExist){
            return res.json(isExist);
        }else{
            const visitor = new Visitor({ip, date});
            await visitor.save();
            return res.json(visitor);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
};

export const getVisitors = async (req, res) => {
    try {
        await Visitor.aggregate([
            {
                $group:{
                    _id: "$date",
                    total: {$sum: 1}
                }
            },{
                $sort: {_id: 1}
            }
        ]).then((result) => {
            return res.json(result);
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Something went wrong."});
    }
}