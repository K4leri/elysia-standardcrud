# Elysia with Bun runtime

## Getting Started
To install all reps use
```bash
bun i
```
To create docker network that allows containers to communicate
```bash
docker network create --driver bridge mynetwork
```

To start your server u can use:
```bash
docker-compose up 
```


use http://localhost:3000/swagger with your browser to see DOCS


I add JWT just for more practise and convinient usage of user id from them. Also its easy to add some admin (admin here is role that is contains inside JWT) operations.

To use update and delete operation i should need to get first JWT token via POST /account/login
Use the registered phone number and any code that u like. On the responce u will get two JWT tokens. 
Set header "Authorization" with your token and then u will access to update\delete operations.
