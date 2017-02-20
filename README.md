# web-app-service
This is a node.js project that can support being a micro service, a static web server; whatever you need that involves supporting a web or mobile application.

## Whatcha got?
- Uses Express.js to handling basic http serving
- The `./public/` folder is automatically statically served to the site's root
- Uses the node.js cluster API to handling multiple instances
- Automatic reload based on code changes in the `./src/` folder
- Testing is setup; simply name a test file with the `.spec.js` ending and it'll automatically get picked up and run when you run `npm test`
- Running `npm start` will execute the server with the default environment which is either specified in environment variables as `environment` or it defaults to `development`
- Running `npm start <environment>` will start with the specified environment
- Configuration similar to rails where `./configuration/default.js` contains the default and is mixed in with whatever environmental file that is specified. So `npm start development` will mix `./configuration/default.js` with `./configuration/environments/development.js`. The environment file *always* wins.
- Uses Msngr.js for messaging between components; setup by default for color coded logging. `msngr("log", "alert").emit("Oh joy!");`
- The `./common/security.js` library contains industry standard hashing, hash comparison and randomized token generation
- Bower is setup and installs into the `./public/ext/` folder but includes no dependencies (add as you wish!)
- *Minimal* dependencies. All of this only requires 3 runtime dependencies!

## Okay, what do I do?
- Fork, git pull or simply download the zip of this repositry
- Rename the project's name in the `package.json`. Might as well update description and all info while you're at it
- Run `npm install`
- Optionally run `bower install` (bower is setup, by default, to install into `./public/ext/` but there are no bower dependencies until you add them)
- Run `npm start` or `npm start <environment>` for a more specific configuration
- Enjoy!

## Ideas? Thoughts?
I'm still adding stuff to this that I commonly use in many side projects. Some upcoming additions will include:
- Dockerizing
- Route filtering based on various criteria including authorization, content type, fields, etc