var _ = require('lodash'),
    parseString = require('xml2js').parseString,
    reTitle = /<title>(.+) - YouTube</i,
    Captions = require('../models/Captions'),
    request = require('request'),
    uriMatch,
    reASR = /ttsurl":"(.+?)"/i,
    reVidID = /youtube(.+)/i,
    relang = /thing/i,
    asrURI,
    videoID,
    videoURL,
    title,
    titleStr,
    langCode,
    captionsAsr = [],
    craptionObj,
    craptionID;

exports.getCaptions = function(req, res) {
    Captions.find(function(err, captions) {
        if (err) console.log(err);
        res.json(captions);
    });
};

exports.saveVideo = function(req, res) {
  Captions.findByIdAndUpdate(req.body['_id'], req.body, function(err, caption) {
    if (err) {console.log(err)};

    if (caption) {console.log(caption.title)};
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
        craptionID = 'youtube' + videoID;
        videoURL = 'https://www.youtube.com/watch?v=' + videoID;
        request(videoURL, function(error, response, body) {
          if (error) {
            // console.log(response);
          }
          if (!error && response.statusCode == 200) {
            titleStr = body.match(reTitle);
            title = titleStr !== null ? titleStr[1] : 'No title was found';
            uriMatch = body.match(reASR);
            if (uriMatch) {
              console.log(uriMatch);
              asrURI = uriMatch[1];
              asrURI = asrURI.replace(/\\u0026/g, '&');
              asrURI = asrURI.replace(/\\/g, '');
              asrURI = asrURI.replace(/%2C/g, ',');
              asrURI = asrURI + '&type=track&lang=en&name&kind=asr&fmt=1'
              console.log(asrURI);
              request(asrURI, function(error, response, body) {
                parseString(body, function(err, result) {
                  _.forEach(result.transcript.text, function(element) {
                    captionsAsr.push({
                      'start': parseFloat(element['$'].start),
                      'dur': parseFloat(element['$'].dur),
                      'value': element['_'],
                      'extra_data': []
                    });
                  }); 
                  // console.log(captionsAsr);
                  craptionObj = new Captions({
                    '_id': craptionID,
                    'title': title,
                    'url': videoURL,
                    'captions': captionsAsr
                  });
                  craptionObj.save(function(err, craptionObj) {
                    if (err) return console.error(err);
                    console.log(craptionObj);
                    Captions.findById(req.params.id, function(err, caption) {
                      if (err) console.log(err);

                      if (caption) {
                        res.json(caption);
                      }
                    });
                  });
                });
              });
            }
            else {
              craptionObj = new Captions({
                '_id': craptionID,
                'title': title,
                'url': videoURL,
                'transcript': '',
                'captions': []
              });
              console.log(craptionObj);
              craptionObj.save(function(err, craptionObj) {
                if (err) return console.error(err);
                console.log(craptionObj);
                Captions.findById(req.params.id, function(err, caption) {
                  if (err) console.log(err);

                  if (caption) {
                    res.json(caption);
                  }
                });
              });
            }
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