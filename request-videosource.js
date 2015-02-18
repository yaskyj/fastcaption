var request = require('request'),
    uriMatch,
    re = /ttsurl":"(.+?)"/i,
    asrURI;

request('https://www.youtube.com/watch?v=fPloDzu_wcI', function(error, response, body) {
  if (error) {
    // console.log(response);
  }
  if (!error && response.statusCode == 200) {
    uriMatch = body.match(reTitle);
    // console.log(body);
    asrURI = uriMatch[1];
    // console.log(asrURI);
    // asrURI = asrURI.replace(/\\u0026/g, '&');
    // asrURI = asrURI.replace(/\\/g, '');
    // asrURI = asrURI.replace(/%2C/g, ',');
    asrURI = asrURI + '&type=track&lang=en&name&kind=asr&fmt=1'
    request(asrURI, function(error, response, body) {
      console.log(body);
    });
  }
});

//https://www.youtube.com/watch?v=fPloDzu_wcI
