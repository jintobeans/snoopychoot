
# snoopychoot - a browser-based parody of Snapchat

This was an attempt over a couple days to make a browser-based app similar to Snapchat, mainly for learning new web technologies and practicing React.

It is not fully functional.

You can take pictures, upload pictures to your account, delete them, or edit them by drawing over them using the pen tools and saving the new version to your account.

## Objectives of the project:

* Build a simple React App that can upload and take pictures as well as edit drawings over photos

* Learn new technologies

## Technologies Used:

* React

* React-Redux

* React Router DOM

* Express / Node.js

* Postgres

* React Webcam

* HTML Canvas

* Played with Google vision API to analyze images and detect things (does not work now)

* SketchPad library

## Installation:

Install dependencies:
```
npm install
```
Create a *secrets.js* file in the project repository and save API key there:
```
PROCESS.ENV.API_KEY = 'enter api key here'
```
Run on local server:
```
npm run start-dev
```

## Bugs:

* User photos page does not update when photo is deleted

* Buttons for filter and Google do not work on Edit Photo page



