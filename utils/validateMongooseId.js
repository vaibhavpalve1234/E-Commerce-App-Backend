const mongoose = require('mongoose');
const validateMongoDbId = (id) =>{
    const isvalid = mongoose.Schema.Types.ObjectId.isvalid(id);
    if(!isvalid) throw new Error("This id is not valid or not Found")
}
module.exports = validateMongoDbId