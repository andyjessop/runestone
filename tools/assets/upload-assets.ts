var path = require('path');
var fs = require('fs');

var distPath = path.join(process.cwd(), 'apps/static-app/dist');

fs.readdirSync(distPath).forEach((filename: string) => {
  const absolutePath = path.resolve(distPath, filename);

  console.log("filename : ", filename);
  console.log("absolutePath : ", absolutePath);

  if (!filename.includes('manifest')) {
    uploadToCdn(filename, absolutePath);
  }
});

function uploadToCdn(filename, absolutePath) {
  const exec = require('child_process').exec;
  
  exec(`curl -request POST --data-binary @${absolutePath} https://cdn.runeslab.com/${filename}`);
}