//This file is for converting all of the individual captions file into one JSON file for upload into mongodb  
var fs = require('fs'),
    request = require('sync-request'),
    sleep = require('sleep');
    reTitle = /<title>(.+) - YouTube</i,
    response,
    url,
    titleStr,
    filesArr,
    index,
    fileString,
    filesArr = fs.readdirSync('.');


for (index in filesArr) {
  if (filesArr[index] != 'JSONConverter.js' && filesArr[index] != 'captions.json' && filesArr[index] != 'node_modules') {
    fileString = fs.readFileSync(filesArr[index]);
    url = 'https://www.youtube.com/watch?v=' + filesArr[index];
    console.log(url);
    response = request('GET', url);
    body = response.body.toString();
    titleStr = body.match(reTitle);
    console.log(response.statusCode + " and " + response.headers.toString());
    console.log(titleStr[1]);
    fs.appendFile('captions.json', '{"_id": "youtube' + filesArr[index] + '", "title": "' + titleStr[1] + '", "url": "https://www.youtube.com/watch?v=' + filesArr[index] + '", "captions" : ' + fileString + '}\n');
  }
}