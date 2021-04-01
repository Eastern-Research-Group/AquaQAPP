## Setting Up Local Development Environment

### Prerequisites
 - Node.js with npm
 - PostgreSQL

### Instructions for Starting Local Environment

- Clone the [AquaQAPP GitHub repository](https://github.com/Eastern-Research-Group/AquaQAPP) and checkout the develop branch
	```
	git clone https://github.com/Eastern-Research-Group/AquaQAPP.git`
	git checkout develop
	```
- Install Node.js project dependencies
`npm install`
- Start Node.js Express server and Vue-CLI server concurrently
`npm start`
- For future dependency updates, run `npm ci` from the base directory to ensure dependencies are up to date
- See the next section for instructions on making code updates

### Fixing Code Format/Quality Warnings
Prettier and eslint are used to ensure code follows a consistent format and quality standard. Before committing code updates, ensure that code passes these checks by running `npm lint`. Any warnings or errors will be output in the console. You can auto-fix some warnings with `npm lint:fix`.
