

ABOUT : a simple library management task done using express js and mongodb , firebase for image storage

future updates : more common helper functions might be added , changes might be made in the project whilst deploying in free hosting platforms like render


create and add these environment variables inside env folder -- env/.env.dev



PORT = "port number"

DB_USER = ""
DB_PASSWORD = ""         ---- atlas credentials
DB_APPNAME = ""
DB_NAME = ""

USER_SECRET = ""
ADMIN_SECRET = ""        ---- jwt token secret


APIKEY =  ""
AUTHDOMAIN =  ""
PROJECTID =  ""
STORAGEBUCKET =  ""
MESSAGINGSENDERID = ""   ---- firebase secret credentials
APPID = ""



start -- npm start 

after creating a book or user or library the object is returned use the object id where id has to be sent via params example library/:id

refer router.js file for routes

