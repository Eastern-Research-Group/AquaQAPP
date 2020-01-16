## Code Organization

The [AquaQAPP GitHub repository](https://github.com/Eastern-Research-Group/AquaQAPP) contains both server-side (Node.js Express) and client-side (Vue.js) code, in server and client sub-directories. 
The base directory mostly contains configuration files. `package.json` defines npm dependencies and scripts. The scripts defined here are used to start development servers, generate a production build, and run tests or linters.

### Server Code

The Node.js Express server uses [Sequelize ORM](https://sequelize.readthedocs.io/en/v3/) to model database tables to JavaScript objects, automatically build the database schema, and seed the database with default data.
- `src/migrations` - Migration files define the database schema.
- `src/seeders` - Seeder files add test data to tables for development, and default lookup data for all environments.
- `src/models` - Model files map the database tables to JavaScript objects to simplify querying data and building relationships.
- `src/controllers` - Controllers accept requests from the client, perform data operations, and send a response to the client.
- `src/build.js` - Script run for production builds to only run a specific set of migrations and seeders, so that existing data is not overwritten.
- `src/routes.js` - Defines URL endpoints for API calls, directing to the corresponding controller method.
- `src/server.js` - Adds necessary Express plugins and starts Express server.

### Client Code

Client-side code uses [Vue.js](https://vuejs.org/) along with [Vue Router](https://router.vuejs.org/) for page routing and [Vuex](https://vuex.vuejs.org/) for state management between components.
- `src/main.js` - Adds necessary Vue plugins and instantiates the Vue instance.
- `src/App.js` - Base Vue component container for all sub-components (including view files).
- `src/router` - Defines front-end page URLs which point to different view files.
- `src/views` - Base files for each page within the app. The router points to these files depending on the URL, and these files usually contain several child components to build the UI.
- `src/components` - Vue component files which make up the UI. Components that are only used once are located in the `app` sub-directory. Shared and re-usable components are in the `shared` directory.
- `src/store` - Contains Vuex files for state management. Vuex is used to handle the sharing of data between re-usable components. Vuex actions handle communications between the front-end and Express API.
- `src/mixins` - Vue mixins are used to share component logic between separate components that each contains pieces of the same functionality. They help to further reduce code duplication.
- `static` - Contains SCSS stylesheet files
- `public` - Contains the base HTML file along with any static files that need to be served (e.g. favicon, PDF help document)
- `dist` - Vue build files are stored here. This folder is not committed to version control - it is automatically created via the Vue build scripts defined in `package.json`. The Express server is set to serve this folder in production so that all application code runs under a single server instance.
