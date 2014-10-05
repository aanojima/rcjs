var http = require('http');
var fs = require('fs');
var path = require("path");
var url = require('url');

exports.load = function(req,res){
	console.log(req.params);
	// var filepath = req.params.example_path;
	// var mimeTypes = {
 //            "html": "text/html",
 //            "jpeg": "image/jpeg",
 //            "jpg": "image/jpeg",
 //            "png": "image/png",
 //            "js": "text/javascript",
 //            "css": "text/css",
 //            "xml": "application/xml",
 //            "dat": "application/octet-stream"
 //    };
 //    var filename = path.join("./examples/", unescape(filepath));
 //    var stats;
 //    var indexFilename = path.join(filename, unescape('index.html'));

 //    try
 //    {
 //        stats = fs.lstatSync(filename); // throws if path doesn't exist
 //    }
 //    catch (e)
 //    {
 //        res.writeHead(404,
 //        {
 //            'Content-Type': 'text/plain'
 //        });
 //        res.send('404 Not Found\n');
 //        return;
 //    }


 //    if (stats.isFile())
 //    {
 //        // path exists, is a file
 //        var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
 //        res.writeHead(200,
 //        {
 //            'Content-Type': mimeType
 //        });

 //        var fileStream = fs.createReadStream(filename).pipe(res);
 //    }
 //    else if (stats.isDirectory())
 //    {
 //        // path exists, is a directory
 //        res.writeHead(200,
 //        {
 //            'Content-Type': "text/html"
 //        });
 //        var fileStream = fs.createReadStream(indexFilename).pipe(res);
 //    }
 //    else
 //    {
 //        // Symbolic link, other?
 //        res.writeHead(500,
 //        {
 //            'Content-Type': 'text/plain'
 //        });
 //        res.write('500 Internal server error\n');
 //        res.end();
 //    }
}