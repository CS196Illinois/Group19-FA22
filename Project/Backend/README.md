# How To Setup Backend

- setup your python virtual environment [Instructions](https://docs.python.org/3/tutorial/venv.html)
- download these files into your project directory
- create .env file with your MongoDB atlas connection string,  example: `ATLAS_URI=mongodb://mongodb0.example.com:27017`
- run `pip install requirements.txt` in the terminal to install all required packages
- run `uvicorn main:app --reload` to run the server
- and if you install any new python packages run `pip freeze > requirements.txt` to update the requirements.txt file
- [Good article about requirements.txt file](https://learnpython.com/blog/python-requirements-file)
