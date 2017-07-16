# Image-Url-Scraper
Simple node.js scraper for scraping Google and Bing Image Search, supporting pagination

Requirements:
    images-scraper (https://github.com/pevers/images-scraper)
    request

Usage:
    node scrape.js [Query File] [Output File]

Query File Format:
    {category}\t{query}\t{scrape depth}\n

Output File Format:
    {category}\t{query}\t{return position}\t{url}\n  
