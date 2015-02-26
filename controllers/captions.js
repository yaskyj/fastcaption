var _ = require('lodash'),
    Captions = require('../models/Captions'),
    request = require('request'),
    uriMatch,
    reASR = /ttsurl":"(.+?)"/i,
    reVidID = /youtube(.+)/i,
    asrURI,
    videoID,
    videoURL,
    langCode;

exports.getCaptions = function(req, res) {
    Captions.find(function(err, captions) {
        if (err) console.log(err);
        res.json(captions);
    });
};

exports.getVideo = function(req, res) {
    Captions.findById(req.params.id, function(err, caption) {
      if (err) console.log(err);

      if (caption) {
        res.json(caption);
      }
      else {
        videoID = req.params.id.match(reVidID)[1];
        console.log(videoID);
        videoURL = 'https://www.youtube.com/watch?v=' + videoID 
        request(videoURL, function(error, response, body) {
          if (error) {
            // console.log(response);
          }
          if (!error && response.statusCode == 200) {
            uriMatch = body.match(reASR);
            // console.log(body);
            asrURI = uriMatch[1];
            // console.log(asrURI);
            asrURI = asrURI.replace(/\\u0026/g, '&');
            asrURI = asrURI.replace(/\\/g, '');
            asrURI = asrURI.replace(/%2C/g, ',');
            asrURI = asrURI + '&type=track&lang=en&name&kind=asr&fmt=1'
            console.log(asrURI);
            request(asrURI, function(error, response, body) {
              console.log(body);
            });
          }
        });        
      }
    });
};

exports.getCaption = function(req, res) {
    Captions.findById(req.params.id, function(err, caption) {
      if (err) console.log(err);

      if (caption) {
          res.json(caption.captions);
      }
      else {
        res.send('this is the error')
        console.log('this');
      }
    });
};

exports.getTitle = function(req, res) {
    Captions.findById(req.params.id, function(err, caption) {
      if (err) console.log(err);
      res.json(caption.title)
    });
};