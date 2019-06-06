# STARTER FILE README.md

This starter project will compile Sass to CSS and uses Babel to compile modern JS into browser friendly JS. This project is intentionally simple for the purposes of quickly prototyping projects that don't require a framework.

When you use this starter project, you should do the following three things because this starter has some generic information that should be updated.

1. Update this file with real project info
2. Update the basic project info in `package.json`
3. Run `npm init` to download all dependencies


## npm Commands

```
    ...
    "scripts": {
        // will watch for changes in the files and write them to disk
        "watch": "webpack -w",

        // hot reloads file changes and serves the files to http://localhost:8080/
        // doesn't write to disk, good for dev
        "dev": "webpack-dev-server --progress --colors",

        // runs both processes, if you are into that sort of thing
        "serve": "npm run watch & npm run dev"
    },
    ...
```

## Entry point is `main.js`

This will output to a bundled file `index.js` in the root of the project.


## Entry for Sass is `main.scss`

This will output to a bundled file `style.css` in the root of the project.