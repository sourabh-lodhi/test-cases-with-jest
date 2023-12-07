const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/student-api',{
    useNewUrlParser : true,
    useUnifiedTopology :true
})
.then(()=>{
   console.log('connection successful with database');
})
.catch((error)=>{
    console.log(error);
})