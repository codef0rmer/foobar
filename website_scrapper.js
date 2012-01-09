var request = require('request'),
    url = require('url'),
    http = require('http'),
    jsdom = require('jsdom');
    //cheerio = require('cheerio');

var server = http.createServer(function (request, response) {
    getPage("http://isohunt.com/torrents/?iht=-1&ihq=life+is+beautiful", function (body) {
        jsdom.env({
            html: body,
            scripts: ['http://code.jquery.com/jquery-1.6.min.js']
        }, function(err, window){
            var $ = window.jQuery;
            hhtml = '';
            $('table#serps > tbody').each (function () {
                hhtml = $(this).html();
            });
            response.end(hhtml);
        });
        /*$ = cheerio.load(body);
        //html = $('table#serps').html();
        html = $('table#serps tr').html();
        hhtml = '';
        $(html).each (function () {
            hhtml = $(this).html();
        });*/
        //var html = $(html).
        //response.writeHead(200, {'Content-Type' : 'text/html'});
        //response.write(hhtml);
    })
});
server.listen(3000);

function getPage(someUri, callback) {
    request({uri : someUri}, function (error, response, body) {
       callback(body);
    });
}
