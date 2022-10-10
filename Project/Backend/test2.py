#make a requirements.txt file
#Kaggle
from kaggle import KaggleApi
api = KaggleApi()
api.authenticate()
#NumPy
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os
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
#SK Learn
from sklearn import linear_model
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn import naive_bayes
from sklearn.metrics import *
from sklearn.model_selection import train_test_split



# # Lexicon-based model

# # Paragraphs to words using nltk
# paragraphs = ["i like eating pie a lot"]
# words = [word_tokenize(str(word)) for word in paragraphs]

# # Removing unwanted characters (anything that is not a word or space using RegEx)
# cleaned_words = []
# for para in words:
#     temp = []
#     for w in para:
#         res = re.sub(r'[^\w\s]', '', w)
#         if res != '':
#             temp.append(res)
#     cleaned_words.append(temp)
    
# ## TO DO: modify stopwords.words("english") so it does not include words like up, down, etc.
# # Removing stop words
# important_words = []
# for para in cleaned_words:
#     temp = []
#     for word in para:
#         if word not in stopwords.words("english"):
#             temp.append(word)
#     important_words.append(temp)

# # adding Part of Speech
# currNum = 0
# currSentence = important_words[currNum]
# after_tagging = nltk.pos_tag(currSentence)

# # calculating pos and neg sentiment scores
# p = 0
# n = 0
# for pair in after_tagging:
#     tag = pair[1]
#     word = pair[0]
#     if tag.startswith('J'):
#         synsets = swn.senti_synsets(word, wn.ADJ)
#     elif tag.startswith('V'):
#         synsets = swn.senti_synsets(word, wn.VERB)
#     elif tag.startswith('N'):
#         synsets = swn.senti_synsets(word, wn.NOUN)
#     elif tag.startswith('R'):
#         synsets = swn.senti_synsets(word, wn.ADV)
#     else:
#         synsets = swn.senti_synsets(word, '')
#     if synsets != None:
#         synsets = list(synsets)
#         if len(synsets) > 0:
#             synset = synsets[0]
#             p += synset.pos_score()
#             n += synset.neg_score()
# print(p)
# print(n)
    
#check for stock dictionary



# # Remove stems (lemmatization)
# port = PorterStemmer()
# stemmed_words = [port.stem(word) for word in important_words]
# wordnet = WordNetLemmatizer()
# lemmatized = [wordnet.lemmatize(word) for word in important_words]





# METHOD 2: Naive Bayes Machine Learning Algorithm
df = pd.read_csv("desktop/cs124h/Group19-FA22/project/backend/stock_data.csv")
stop = set(stopwords.words("english"))
vectorizer = TfidfVectorizer(use_idf=True, lowercase=True, strip_accents="ascii", stop_words=stop)

y = df.Sentiment
X = vectorizer.fit_transform(df.Text)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

classifier = naive_bayes.MultinomialNB()
classifier.fit(X_train, y_train)

print("The model is", roc_auc_score(y_test, classifier.predict_proba(X_test)[:,1]) * 100, "percent accurate.")
print(classification_report(y_test, classifier.predict(X_test)))



example = vectorizer.transform(df.Text[:8])
print(classifier.predict(example))
print(df.Sentiment[0:8].array)

example2 = vectorizer.transform(["red, not ready for break out."])
print(classifier.predict(example2))




# LSTM


