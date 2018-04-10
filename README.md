# Introduction
This is a simple scraper based on node.js and the images-scraper lib for scraping Google and Bing Image Search, supporting pagination.

# Requirements and Installation
* Having any web browser
* node.js
* images-scraper (https://github.com/pevers/images-scraper)
* request (https://github.com/request/request)

# Usage
    node scrape.js [Query File] [Output File]

##### Query File Format
    [category]\t[query]\t[scrape depth]\n

##### Output File Format
    [category]\t[query]\t[source{google|bing}]\t[return position]\t[url]\n
