var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var pageSchema = new mongoose.Schema({
  title:    String,
  url_name: String,
  owner_id: String,
  body:     String,
  date:     { type: Date, default: Date.now },
  status:   Number,
  tags:     [String]
});

pageSchema.virtual('full_route').get(function() {
  return '/wiki/' + this.url_name;
});

pageSchema.virtual('tags').get = function() {
  return this.tags.join(' ');
};

pageSchema.virtual('tags').set = function() {
  return this.tags.split(' ');
};

pageSchema.statics.findByTag = function(tag,cb) {
  this.find({tags: {$elemMatch: {$in: tag}}}, cb);
};

pageSchema.methods.findSimilar = function(url_name,cb) {
  Page.findByTag(this.tags,function(err,pages){
    pages = pages.filter(function(page){
      if(page.url_name !== url_name)
        return true;
    });
    cb(pages);
  });
};

var userSchema = new mongoose.Schema({
  name:  { first: String, last: String },
  email: String
});

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
  Page: Page,
  User: User
};