/*
Simple node.js scraper for scraping Google and Bing Image Search, supporting pagination

Requirements:
    images-scraper (https://github.com/pevers/images-scraper)
    request

Usage:
    node scrape.js [Query File] [Output File]

Query File Format:
    [category]\t[query]\t[scrape depth]\n

Output File Format:
    [category]\t[query]\t[source{google|bing}]\t[return position]\t[url]\n    
*/
var fs = require('fs'),
    request = require('request');

var queryfile = process.argv[2],
    outfile = process.argv[3];

var data = fs.readFileSync(queryfile, 'utf8');
lines = data.split('\n');

function ScrapeSync(google, bing, fd, category, query, depth, err){
    var g_ret = false;
    var b_ret = false;
    google.list({
        keyword: query,
        num: depth,
        detail: true,
        nightmare: {
            show: true
        }
    })
    .then(function (res) {
        for (var i=0; i<res.length; i++) {
            var murl = res[i]["url"];
            fs.writeSync(fd, category + "\t" + query + "\tgoogle\t" + i + "\t" + murl + "\n");
        }
        g_ret = true;
    }).catch(function(err) {
        console.log('err', err);
    });

    bing.list({
        keyword: query,
        num: depth,
        detail: true
    })
    .then(function (res) {
        for (var i=0; i<res.length; i++) {
            var murl = res[i]["url"];
            fs.writeSync(fd, category + "\t" + query + "\tbing\t"+ i + "\t" + murl + "\n");
        }
        b_ret = true;
    }).catch(function(err) {
        console.log('err',err);
    })

    while(!g_ret || !b_ret) {
        require('deasync').sleep(100);
    }
}

fs.open(outfile, 'w', (err, fd) => {
    for (var j = 0; j < lines.length; j++) {
        line = lines[j];
        var tuple = line.split('\t');
        var category = tuple[0].trim();
        var query = tuple[1].trim();
		var depth = parseInt(tuple[2].trim())
        var Scraper = require ('images-scraper')
            , google = new Scraper.Google()
            , bing = new Scraper.Bing();

        ScrapeSync(google, bing, fd, category, query, depth, err);
    }
});

