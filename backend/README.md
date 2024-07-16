## HOW TO RUN

1. ### install dependencies

    ```
    npm i
    ```

2. ### setup environment variables in `.env`
    ```
        NODE_ENV = development
        PORT = 3000
        DBPASSWORD = <password>
        DBURI = <connection string>
        ACCESS_TOKEN_SECRET = <access token secret>
        ACCESS_TOKEN_EXPIRY = <access token expiry>
        REFRESH_TOKEN_SECRET = <refresh token secret>
        REFRESH_TOKEN_EXPIRY = <refresh token expiry>
    ```
3. ### run server
    ```
    npm start
    ```

## FOLDER STRUCTURE

### /backend/src/

```
|____models           ------------- schema models for room, user, table, subjecttable, faculty
|____db                ------------- database connection functions
|____routes            ------------- api end points
| |____......
| |____index.js         ------------- base routes for all other respective routes
|____controllers        ------------- functions that perform actual tasks
|____utils
| |____ApiError.js          ----------- standard error response
| |____ApiResponse.js       ----------- standard success response
| |____asyncHandler.js      ----------- error handling wrapper for async functions
|____middleware
| |____auth.middleware.js
|____app.js                  ---------- express server configs
```
