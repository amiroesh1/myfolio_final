from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
from talem_spider import TalemSpider

def run_spiders():
    process = CrawlerProcess(get_project_settings())
    
    # Add spiders to the process
    process.crawl(TalemSpider)
    
    # Start the crawling process
    process.start()

if __name__ == "__main__":
    run_spiders() 