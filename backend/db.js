
const mongoose=require('mongoose');
//const mongoURL="mongodb://localhost:27017/voting";
//require('dotenv').config();
const mongoURL="mongodb+srv://aryansri666:1js21is021@cluster0.smvthel.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoURL,{//mongoose se connection build ho rha db se
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});
module.exports=db;