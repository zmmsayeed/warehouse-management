## Warehouse Management Application
#### A file structure project using CSV files, NodeJs, and ReactJs

This application is built to demonstrate the working of files and file structure in the nodeJs environment. The project demonstrates the methods to read, write, and update from the file in a nodeJs application.

***Note:*** You have to have NodeJs installed in your system to run this application!

### Folder Structure:
- All the files stored in the `public/client` folder consists of the files for the front end. It is a `create-react-app` application built to use the React library for the front end.
- `index.js` in the root folder consists of a basic express application which demonstrates how APIs can be build using `express` library in NodeJs.
- It is in this file that most of the backend code is written.

We have made this application render completely on the server-side so there is no issue of hosting the front-end and back-end on different platforms. 

### How to run the application?
Follow the following steps to run the application.

To run the already built application: 

- Install the dependencies in the root folder by navigating inside the folder using the following commands:
```shell
cd ./warehouse_management
npm install
```
- Navigate to the front end folder and create a build:
```shell
cd ./public/client
npm run build
```
- Start the application by going back to the root folder:
```shell
cd ..
cd ..
npm start
```

### To make changes in the front end:
If you want to make any changes in the front end of the application you can follow these steps:
- Navigate to the front-end directory:
```shell
cd ./public/client
```
- Install the dependencies:
```shell
npm install
```
- Run the application (front-end) to see the changes locally using:
```shell
npm start
```

You can make changes in the design in the `client` folder and can see the changes in the browser with the above steps. But for the application to run how it designed to run on the server side you have to ruin the following commands in the terminal.
Considering you are already in the `./public/client` folder:
```shell
npm run build
```

This command will create a `build` folder inside the client folder. This is the folder that is responsible for displaying the front end on the server side. 


























