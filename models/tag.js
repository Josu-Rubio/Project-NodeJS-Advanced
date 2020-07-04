'use strict';

const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
  tag:{ type:String, index:true },
  message: mongoose.Schema.Types.Mixed,
});

tagSchema.statics.lista = function(filter, sort, skip, limit, fields) {
  var query = Tag.find(filter); 
  query.sort(sort);
  query.skip(skip);
  query.limit(limit);
  query.select(fields);
  return query.exec();
};

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
