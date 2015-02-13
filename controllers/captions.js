var _ = require('lodash'),
    Captions = require('../models/Captions');

exports.getCaptions = function(req, res) {
    Captions.find(function(err, captions) {
        if (err) console.log(err);
        res.json(captions);
    });
};

exports.getVideo = function(req, res) {
    console.log(req);
    Captions.findOne({_id:req}, function(err, caption) {
      if (err) console.log(err);
      res.json(caption)
    });
};