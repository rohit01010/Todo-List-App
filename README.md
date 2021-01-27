![Todo List Website](https://github.com/rohit01010/Todo-List-App/blob/main/WebsiteImage.png)

## <a href="https://todo-5f8b0.web.app/">LIVE DEMO</a>

## Description

This is a React js and firebase based Todo list web-app.

## Contributors

## <a href="https://github.com/rohit01010">Rohit Bhagat</a>

## How to run it on your PC

### Fork and clone it on your desktop.

### run command: npm install

Before running this command make sure you have node installed in your PC.
This will download all the node modules required

### firebase setup

- Log in to <a href="https://console.firebase.google.com">https://console.firebase.google.com</a> and create new project.
- Create a web app by clicking on icon labeled: </> , make sure you checked on the hosting while creating web app.
- Click on Cloud firestore and create data base in test mode and location on your choice(keep it as it is if not necessary)
- Create a collection name _users_ and add a new document with _todo(type: String)_, _timestamp(type: timestamp)_ fields { this step is optional }
- Click on setting icon present on right-side of Project Overview, then click on project setting and copy data present in general->Your apps->Firebase SDK snippet->Config->const firebaseConfig = {
- Now go to project on your pc and go to the file src->firebase.js and paste the data copied in last step inside: const firebaseApp = firebase.initializeApp({

### run command: npm start

- This will start your app at http://localhost:3000/

### Now you are ready to use and modify it

### Star this repository if you like this project

### If you have any doubts and suggesstion regarding this project feel free to contact me at <a href="https://www.linkedin.com/in/rohit-bhagat-2833801b1/">https://www.linkedin.com/in/rohit-bhagat-2833801b1/</a>
