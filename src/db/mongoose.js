const mongoose = require('mongoose');

const url = process.env.URL || "mongodb+srv://@cluster0.tvmwl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(url,{
    dbName: `neostore`,
    user: `mattNeo`,
    pass: `okkwGEA4jGOWcV5A`,
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
}).then(() => {
    
    console.log(`Connected to Mongo Cluster NeoStore`);

}).catch(() => {

    console.log(`Error while connecting to the MongoDB`);

});