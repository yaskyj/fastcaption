//This file is for converting all of the individual captions file into one JSON file for upload into mongodb  
var fs = require('fs'),
    request = require('sync-request'),
    reTitle = /<title>(.+) - YouTube</i,
    response,
    url,
    titleStr,
    filesArr,
    index,
    fileString,
    title,
    filesArr = fs.readdirSync('.');

for (index in filesArr) {
  if (filesArr[index] != 'JSONConverter.js' && filesArr[index] != 'captions.json' && filesArr[index] != 'node_modules' && filesArr[index] != '.DS_Store') {
    fileString = fs.readFileSync(filesArr[index]);
    url = 'https://www.youtube.com/watch?v=' + filesArr[index];
    console.log(url);
    response = request('GET', url);
    body = response.body.toString();
    titleStr = body.match(reTitle);
    console.log(response.statusCode + " and " + response.headers.toString());
    title = titleStr !== null ? titleStr[1] : 'need to add title manually'; 
    console.log(title);
    fs.appendFile('captions.json', '{"_id": "youtube' + filesArr[index] + '", "title": "' + title + '", "url": "https://www.youtube.com/watch?v=' + filesArr[index] + '", "captions" : ' + fileString + '}\n');
  }
}