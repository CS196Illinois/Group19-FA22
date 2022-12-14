#NLTK
import nltk
nltk.download('omw-1.4')
nltk.download("punkt")
nltk.download("stopwords")
nltk.download("wordnet")
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.tokenize import *
nltk.download('sentiwordnet')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')
from nltk.corpus import sentiwordnet as swn
from nltk.corpus import wordnet as wn
from nltk.tag import *
import re
import contractions
#JSON
import json
import csv
import pickle
import pandas as pd
from scipy.special import expit

def calculate_score(raw: str) -> int:
    fixed = contractions.fix(raw)
    words = word_tokenize(fixed)
    score = 0
    for word in words:
        if word in b:
            score += b[word]
    return (expit(score) - 0.5) * 2
    
def measure_accuracy() -> None:
    df = pd.read_csv("stock_data.csv")
    score = 0
    for i in range(1000):
        if calculate_score(df['Text'][i]) == df['Sentiment'][i]:
            score += 1
    print(score / 1000)

# Paragraphs to words using nltk
raw = ["The stock market looks really great right now", "Apple stock price went up 6%",
       "Every stock price is dropping right now", "Looking like a good stock to short"]
# paragraphs = []
# for i in raw:
#     fixed = contractions.fix(i)
#     paragraphs.append(fixed)
# print(paragraphs)
# words = [word_tokenize(str(word)) for word in paragraphs]

# # Removing unwanted characters (anything that is not a word or space using RegEx)
# cleaned_words = []
# for para in words:
#     temp = []
#     for w in para:
#         res = re.sub(r'[^\w\s]', '', w)
#         if res != '':
#             temp.append(res.lower())
#     cleaned_words.append(temp)

# ## ADD FINANCE WORDS TO A DICTIONARY AND SAVE USING PICKLE
# # with open('NTUSD_Fin_word_v1.0.json') as word_dict: 
# #     data = json.load(word_dict)
# # print(data[0:4])

# # finance_words = {}
# # for entry in data:
# #     finance_words[entry['token']] = entry['market_sentiment']


# # with open('finance_dictionary.pickle', 'wb') as handle:
# #     pickle.dump(finance_words, handle, protocol=pickle.HIGHEST_PROTOCOL)

# ## SET STOCK NAMES IN DICTIONARY TO 0
# # c = {}
# # with open('finance_dictionary.pickle', 'rb') as handle:
# #     c = pickle.load(handle)
# # df = pd.read_csv("stock_names.csv")
# # for name in df['Company Name']:
# #     n = name.lower()
# #     names = word_tokenize(str(n))
# #     for i in names:
# #         c[i] = 0
# #         print(i)
# # with open('financial_dictionary.pickle', 'wb') as handle:
# #     pickle.dump(c, handle, protocol=pickle.HIGHEST_PROTOCOL)



# # Removing stop words
# important_words = []
# for para in cleaned_words:
#     temp = []
#     for word in para:
#         if word not in stopwords.words("english"):
#             temp.append(word)
#     important_words.append(temp)

# for currNum in range(len(raw)):
#     currSentence = cleaned_words[currNum]
#     after_tagging = nltk.pos_tag(currSentence)

#     # calculating pos and neg sentiment scores
#     p = 0
#     n = 0
#     score = 0
    
#     for pair in after_tagging:
#         tag = pair[1]
#         word = pair[0]
#         if tag.startswith('J'):
#             synsets = swn.senti_synsets(word, wn.ADJ)
#         elif tag.startswith('V'):
#             synsets = swn.senti_synsets(word, wn.VERB)
#         elif tag.startswith('N'):
#             synsets = swn.senti_synsets(word, wn.NOUN)
#         elif tag.startswith('R'):
#             synsets = swn.senti_synsets(word, wn.ADV)
#         else:
#             synsets = swn.senti_synsets(word, '')
#         if synsets != None:
#             synsets = list(synsets)
#             if len(synsets) > 0:
#                 synset = synsets[0]
#                 p += synset.pos_score()
#                 n += synset.neg_score()
#     print("Financial Dictionary Model", score)
#     print("Common English Dictionary Model:", (p - n))
#     print("\n")

#     # # Remove stems (lemmatization)
#     # port = PorterStemmer()
#     # stemmed_words = [port.stem(word) for word in important_words]
#     # wordnet = WordNetLemmatizer()
#     # lemmatized = [wordnet.lemmatize(word) for word in important_words]


#     ## TO DO
#     # try textblob and vader
#     # add stock words
    
b = {}
with open('financial_dictionary.pickle', 'rb') as handle:
    b = pickle.load(handle)

## ADDING TERMS TO THE DICTIONARY
good_words = ['up', 'bull']
bad_words = ['down', 'short', 'negative']

for i in good_words:
    b[i] = 1
for i in bad_words:
    b[i] = -1

measure_accuracy()
