var request = require('request'),
    dataObj = {},
    tempArr,
    data,
    uri,
    re = /ttsurl":"(.+?)"/i,
    deURI;

request('https://www.youtube.com/watch?v=I2co-ot8PTQ', function(error, response, body) {
  if (error) {
    // console.log(response);
  }
  if (!error && response.statusCode == 200) {
    uri = body.match(re);
    // console.log(body);
    deURI = uri[1];
    deURI = deURI.replace(/\\u0026/g, '&');
    deURI = deURI.replace(/\\/g, '');
    deURI = deURI.replace(/%2C/g, ',');
    deURI = deURI + '&type=track&lang=en&name&kind=asr&fmt=1'
    console.log(deURI);
    request(deURI, function(error, response, body) {
      console.log(response);
      console.log(body);
    });
  }
});

//https://www.youtube.com/watch?v=fPloDzu_wcI
//https://www.youtube.com/api/timedtext?sparams=asr_langs,caps,v,expire&expire=1423807305&asr_langs=en,pt,de,it,ru,ko,es,ja,nl,fr&hl=en_US&signature=E24D36B66C0F37BA26B699E50B3EC7BA41411260.7417BF773A8210565ACFC5F2D8321F4916B657E4&v=fPloDzu_wcI&key=yttt1&caps=asr&type=track&lang=en&name&kind=asr&fmt=1