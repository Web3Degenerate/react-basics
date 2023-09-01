## Commands

1. Set up package.json

   - `npm init -y`

2. Install React and react-dom (_since we are developing web browser environment_)

   - `npm i react react-dom`

     - _installs_ **node_modules** _package_

     - (2a) - _set up html template with shortcut_ `doc` + tab.

3. Install **webpack**

   - At [(9:57) of L14](https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18034817#overview)
   - `npm i webpack webpack-cli webpack-dev-server`
   -

4. Install **babel**

   - `npm i @babel/core @babel/preset-env @babel/present-react babel-loader`

5. Set up the `npm run dev` command manually in our `package.json` scripts by adding this line:

   - `"dev": "webpack serve",`

```js
  "scripts": {
    "dev": "webpack serve",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

```

6. Create file `webpack.config.js` and copy file in Lesson 14.

## VS Code Snippet

1. Open the **command palette** with `CTRL + SHIFT + P`

   - (_or menu -> view -> command palette_)

2. Type **snippet**

   - Select **Configure User Snippets**
   - Select scope/langauge
     - For **React** we selected **javascriptreact.json**

3. **GREAT RESOURCE TO CREATE YOUR OWN VS SNIPPETS: [snippet-generator.app](https://snippet-generator.app/)**
   - Use [snippet-generator.app](https://snippet-generator.app/)

## MongoDB Connection

1. Set up your MongoDB.com connection.

2. When using `JWTSECRET`.

## Third Party Tools

1. Use [snippet-generator.app](https://snippet-generator.app/) for VS Code Snippets

2. Use [this URL Decoder/Encoder](https://meyerweb.com/eric/tools/dencoder/) to encode special characters in your MongoDB password for the DB connection.
