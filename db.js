var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('./config').config;
var ObjectId = Schema.ObjectId;

//mongoose.connect(config.db);
mongoose.connect('mongodb://Yujian:zhang@121.199.29.125:27017/trip');

var ScenicSchema = new Schema({  
    id         :    { type : Number,default:0 },
    title      :    { type : String },
    province   :    { type : String },
    city       :    { type : String },
    area       :    { type : String },
    geography  :    { type : String },
    weather    :    { type : String },
    grade      :    { type : String },
    price      :    { type : String },
    buildtime  :    { type : String },
    category   :    { type : String },
    content    :    { type : String },
    img        :    [String],
    publish    :    { type: Boolean, default: false },
    date       :    { type: Date, default: Date.now },
    son        :    [{ son_name: String, son_content: String, son_img: [String] }], 
});

mongoose.model('Scenic', ScenicSchema);