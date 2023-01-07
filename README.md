# Rise11Server
Nodejs server with user authentication
Created a nodejs server implementing user authentication. Used Mongodb for databases.
Routes-
1. /signup- registers users by saving user data on the database and encrypt passwords (you can store any type of data but email and password are necessary).
2. /login- It receives email and password by post request and authenticate user.
