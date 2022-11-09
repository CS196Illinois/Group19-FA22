from pprint import pprint
import requests

def get_news_sentiment(ticker: str, company_name: str):
    url = 'https://newsapi.org/v2/everything?'
    
    p1 = {
        'q': ticker,
        'pageSize': 25,
        'apiKey': 'd3bf7c2a235047c5a2a1f9c9706a9ab6'
    }
    p2 = {
        'q': company_name,
        'pageSize': 25,
        'apiKey': 'd3bf7c2a235047c5a2a1f9c9706a9ab6'
    }
    
    a = requests.get(url, params=p1)
    b = requests.get(url, params=p2)
    
    articles = a.json()
    print(len(articles))
    for i in articles['articles']:
        print(i['title'])

get_news_sentiment("AAPL", "apple")