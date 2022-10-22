#NumPy
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os

#SK Learn
from sklearn import linear_model
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn import naive_bayes
from sklearn.metrics import *
from sklearn.model_selection import train_test_split

#NLTK
import nltk
from nltk.corpus import stopwords

# METHOD 2: Naive Bayes Machine Learning Algorithm
df = pd.read_csv("stock_data.csv")
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


import pickle
f = open('my_classifier.pickle', 'wb')
pickle.dump(classifier, f)
f.close()

g = open('my_vectorizer.pickle', 'wb')
pickle.dump(vectorizer, g)
g.close()

# LSTM
