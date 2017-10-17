# generator-webpack-regular-nekui

> generator for RegularJS- lets you quickly set up a project including nek-ui and [Webpack](http://webpack.github.io/) module system.

# About
Generator-Webpack-Regular-Nekui will help you build new Regular projects using modern technologies.

Out of the box it comes with support for:
- Webpack
- ES2015 via Babel-Loader
- Style languages (less)
- Automatic code linting via esLint
- NEKUI - UI Component
- Mock and proxy server via nek

---

## Installation
```bash
# Make sure nek is installed globally
npm install -g nek
```

## Setting up projects
```bash
# Create a new directory, and `cd` into it:
mkdir project && cd project

# Run the generator
nek scaffold -i generator-webpack-regular-nekui
```

## Generating new page
```bash
# After setup of course :)
# cd project
nek build -u /pageUrl
```

## Starting the server
```bash
# mock data
nek moky
# proxy service
nek moky -e env_name
```

## Usage
The following commands are available in your project:
```bash
# Start for development
nek moky

# Just build the dist version and copy static files
npm run build

# Lint all files in src (also automatically done AFTER tests are run)
npm run lint
```

### Page Structure Standard
[page structure stardard](https://note.youdao.com/share/?token=F744ACDC19CA45B2949DBBD4696C19C2&gid=31842585)