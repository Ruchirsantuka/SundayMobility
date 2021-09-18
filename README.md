Pre-requisites: 
1. MongoDB running in local
2. Update secret token in config.json

Endpoints:
1. POST API for creating a new user (only for ADMIN) - /createuser
2. GET API for listing all users (only for ADMIN) - /getusers
3. DELETE API for deleting an existing user (only for ADMIN) - /:username
4. PUT API to update user - /:username
5. LOGIN API check username and password given by user - /login
6. Create an admin user for the first time without JWT authentication - /firsttimecreateuser
