# Tricle Social Network

## Introduction

The web application is a social network that allows the user to upload posts and view them.

The app has registration/authorization through JWT, an unauthorized user can only view the posts and their comments. An authorized user can leave comments under any post, create new posts that include an image and title.

All posts are sorted by publication date. Only the user who created the post can delete posts.

## Build code

1) Download and install python from the official website: https://www.python.org/downloads/

2) Download and install node.js from the offical website: https://nodejs.org/en/download/

3) Enter at the command prompt ``git clone`` and go to this folder:

    > git clone https://github.com/jenkass/Tricle.git

    > cd Tricle

## Build FastAPI

1) Create a new virtual environment inside the directory:

    > python -m venv 'name a virtual environment'

2) You must activate the virtual environment by typing at the command prompt:

    > 'name a virtual environment'\Scripts\activate.bat

3) Install third-party libraries in the virtual environment, using a ``requirements.txt``:
    
    > python -m pip install -r requirements.txt

4) Run the server on command line.

    > uvicorn main:app --reload

    After that the backend server will be started on the domain http://localhost:8000

## Build ReactJS

1) Go to the folder named `app` using the command:

    > cd app

2) Start the frontend server with the command:

    > npm start
   
    This will start the frontend server on the domain http://localhost:3000

## FastAPI

## React
