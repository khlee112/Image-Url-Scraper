# Introduction
This is a simple scraper based on node.js and the images-scraper lib for scraping Google and Bing Image Search, supporting pagination.

# Requirements and Installation
* GUI environment
* node.js
* images-scraper package (https://github.com/pevers/images-scraper)
* request package


# Usage
    node scrape.js [Query File] [Output File]

### Query File Format
    [category]\t[query]\t[scrape depth]\n

###Output File Format
    [category]\t[query]\t[source{google|bing}]\t[return position]\t[url]\n
