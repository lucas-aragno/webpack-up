# Webpack Up

CLI tool to jumpstart projects using webpack + babel + react/preact

## Install

```bash
  npm install -g webpack-up
```

## How to use it

I made this tool with the idea of adding webpack + babel + react to existing projects ( e.g adding a demo app to a library ) but you can use it to start a project from scratch you only need a directory with a `package.json` and run:

```bash
webpack-up <your-package.json-directory> --manager yarn --framework react --entrypoint 'my-app/index.js'
```

This command will set up webpack babel and react on `<your-package.json-directory>` path and use `'my-app/index.js` as the entrypoint to create the bundle with webpack ( that should be your base file that imports everything ).

You can set `--manager` to use `npm` or `yarn` ( it will use `npm` by default ) and you can set `--framework` to use `react` or `preact` ( it will use `react` by default )

## Example

let's say I have a folder called `my-app` with the following content:

```
.
├── index.html
├── package.json
├── src
│   ├── App.js
│   └── index.js
```

Where `App.js` contain the main React/Preact component (e.g react):

```javascript
import React, { Component } from 'react'

class App extends Component {
  render () {
    return (
      <div>
        hi
      </div>
    )
  }
}

export default App
```

and `index.js` just contain the logic for the render and re imports (again e.g for react)

```javascript
import React from 'react'
import { render } from 'react-dom'

import App from './App'

document.addEventListener('DOMContentLoaded', event => (
  render(
    <App />,
    document.getElementById('root')
  )
))
```

I can run `webpack-up` on this directory like:

```bash
  webpack-up . --manager yarn --framework react --entrypoint "./src/index.js"
```

(Please notice the `"` on the entrypoint option)

I'll get a source tree like:

```
.
├── index.html
├── node_modules
├── package.json
├── public
├── src
├── webpack.config.js
└── yarn.lock
```

And I'm ready to roll. I can change my `index.html` to be something like:

```html
<html>
  <head>
    <title>
      My Kick ass app
    </title>
    <body>
      <div id="root"></div>
      <script src="./static/bundle.js"></script>
    </body>
</html>

```

and then run `./node_modules/.bin/webpack-dev-server` and you got yourself a webpack-dev server with your react app!

You could also tweak that same `index.html` to use `./public/bundle.js` instead and run `webpack -p` to get your production build.

## Why?

Why to use this instead of [CRA](https://github.com/facebookincubator/create-react-app)? Well I like to have my configs so I can keep on working on them instead of having all those things under the hood (and even if you eject the app you might not need **all** the things that they use) so this approach will give you a basic setup that you can actually change without much effort
