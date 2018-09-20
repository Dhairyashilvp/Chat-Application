# Chat-Application

### Welcome to the web based chat application that provides you to talk to your friend’s individually.
![loginpagescreenshot](https://user-images.githubusercontent.com/16945322/45805869-4d91df80-bcdd-11e8-865d-84c5e5fff8d9.png)
 
#### <p align="center"><em> (Landing/Login Page) </em></p>

 ![signupscreenshot](https://user-images.githubusercontent.com/16945322/45806006-93e73e80-bcdd-11e8-88f8-3572e113ec6b.png)

#### <p align="center"><em> (Sign Up page) </em></p>

![homepagedesign](https://user-images.githubusercontent.com/16945322/45806233-24be1a00-bcde-11e8-9050-5cee3c3ddf1d.png)

#### <p align="center"><em> (Chat Screen page with 2 users online) </em></p>

![homescreenshot 1](https://user-images.githubusercontent.com/16945322/45806032-a497b480-bcdd-11e8-9170-9a81192533bf.png)
 
#### <p align="center"><em> (Chat Screen page on users1 screen) </em></p>

 ![homepagescreenshot 3](https://user-images.githubusercontent.com/16945322/45806272-3ef7f800-bcde-11e8-8f4a-0924bd667915.PNG)

#### <p align="center"><em> (Chat Screen page on users2 screen) </em></p>

### <p align="center"><em> *(The above Images are the design of this projects) </em></p>
## Features
#### •	Clean, intuitive design 
#### •	Everything on a single page
#### •	Automatic updating list for online users
#### •	No refresh is required for incoming messages
#### •	Secure – User authentication is required
#### •	Developed on the latest technology (Node JS, Socket.IO)
Getting started with ChatApp is super easy! Simply Pull this repository and follow the instructions below.
## Getting Started With ChatApp
It's a web based Chat application developed using Node JS, Express JS framework Architect on MVC model.
### Prerequisites
You are going to need:
•	Windows OS, Linux OS, Mac OS
•	Node, version 8.13.3 or newer
•	Any Text editor. (Recommended : vscode )
### Getting Set Up
•	Pull this repository on GitHub
•	DB Configuration for this app:-

1.	Create a MySQL database named as “chatapplication”
2.	Run the SQL Query present in "db.sql" file to configure “chatapplication “ db.
3.	Open the "constants.js" file. (Path = config/constants.js)
4.	Change the DB entries according to your requirement. 

•	Install the dependencies mentioned in a file "package.json"

1.	Command to install the dependencies: - (Type "npm install" in command prompt)

•	Host (IP) configuration

1.	Open the "constants.js" file. (Path = config/constants.js)
2.	In "constants.js" file change the IP address of a variable "IP" to your system's IP address. (Do not change it to localhost)
3.	Open the "home.js" file. (Path = app/assets/js/home.js)
4.	In "home.js" file change the IP address of a variable "IP" to your system's IP address.(IP in home.js must be same as IP in constants.js file)
5.	Open the "Login.html" file. (Path = app/assets/view/Login.html).
6.	In "Login.html" file change the form action attribute to your system’s "IP".(Remember : Only change the IP part.)
Now all set. And it’s time to run this application.
### Steps to run this app
1.	Open terminal and go to the path “where server.js” is located
2.	Run the command “nodemon Server.js”
3.	If all the things have been successfully completed you will start receiving a log 
In the terminal from the server 
Example – “ LOG: Server running at http://192.168.92.176:8081 ”
4.	Open the browser (Recommended : Google Chrome)
5.	Copy the link from the server log and paste into the URL section.
6.	You will see the Login window shown in the first design.
7.	Enjoy the Chatting experience.
### Questions? Need Help? Found a bug? 
If you've got questions about setup, deploying, special feature implementation in your fork, or just want to chat with the developer, please feel free to contact on my mail – ashutosh.litoriya1@gmail.com

Found a bug with ChatApp? Go ahead and submit an issue. And, of course, feel free to submit pull requests with bug fixes or changes to the dev branch.
### Contributors
ChatApp was built by Ashutosh Litoriya.
### Special Thanks
•	Gaurav Chauhan

•	Dhairyashil Patil
