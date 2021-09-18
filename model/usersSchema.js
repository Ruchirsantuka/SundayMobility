const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectID
const crypto = require('crypto');

mongoose
  .connect('mongodb://127.0.0.1:27017/SundayMobility', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

const usersSchema = new mongoose.Schema(  
    {
        firstName: {        
            type: String,        
            required: [true, "must provide value"],        
            match: [/^[a-zA-Z]+$/, 'format is invalid'],        
            maxlength: [20, "cannot be more than 20 characters"]    
        },    
        middleName: {        
            type: String,        
            match: [/^[a-zA-Z]+$/, 'format is invalid'],        
            maxlength: [20, "cannot be more than 20 characters"]    
        },    
        lastName: {        
            type: String,        
            match: [/^[a-zA-Z]+$/, 'format is invalid'],        
            maxlength: [20, "cannot be more than 20 characters"]    
        },    
        mobile: {        
            type: String,        
            required: [true, "must provide value"],        
            match: [/^[0-9]+$/, 'format is invalid'],        
            maxlength: [10, "cannot be more than 10 characters"]    
        },    
        emailId: {        
            type: String,        
            required: [true, "must provide value"],        
            match: [/^[0-9]+$/, 'format is invalid'],        
            maxlength: [30, "cannot be more than 30 characters"]    
        },    
        username: {        
            type: String,        
            match: [/^[a-zA-Z0-9]+$/, 'format is invalid'],        
            maxlength: [15, "cannot be more than 15 characters"]    
        },    
        password: {        
            type: String    
        },    
        role: {        
            type: String,        
            enum: ['ADMIN', 'USER']    
        },    
        hash: String,    
        salt: String  
    });

usersSchema.pre("save", function(next) {
    if (!this.username) { 
        this.username = new ObjectId();    
        this.password = this.username.substring(this.username.length - 10, this.username.length);    
        this.username = this.username.substring(0, 15);    
        this.salt = crypto.randomBytes(16).toString('hex');    
        this.hash = crypto.pbkdf2Sync(this.password, this.salt, 10000, 512, 'sha512').toString('hex');    
    }
    next();
});

usersSchema.methods.validatePassword = function(password) {  
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');  
    return this.hash === hash;
};

const UsersModel = mongoose.model("users", usersSchema);
module.exports = UsersModel;