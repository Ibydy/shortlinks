# shortlinks
Service that create shortLinks
You need mongoDb for work. 
To start project you need to :
1)Install npm dependencies: Just use command "npm install" in your root directory
2)StartDB by command sudo service mongod start sudo mongod --dbpath=/home/${your db pass} 
(if you will need stop it just use "sudo service mongod stop")
3)Start Express server: use command "node app.js" in src/node directory
4)Make bundle: just use npm script "bundle" and open public.index.html
5)For development use npm script "start" and go to http://localhost:3000
6)Enjoy it
