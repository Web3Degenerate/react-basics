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

6. Install Axios

   - `npm i axios`

7. Create file `webpack.config.js` and copy file in Lesson 14.

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

## User Login

Test user `eric`, email `eric@test.com`, password `qwerty123456`

1. Create user and then confirmation when logged in successfully from mongodb

2. Set up log in when logged out form (component => `HeaderLoggedOut.js` in [Lesson 33](https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18231522#overview))
   - Create HeaderLoggedOut.js component

```js
`User was successfully created in handleSubmit`

HeaderLoggedOut.js:13 {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N…A2Nn0.Ie4HmTpHgwjmXEsQkr_2NbrqqfQ7FRZI7pELQXSfvfU', username: 'eric', avatar: 'https://gravatar.com/avatar/a1e03e3cc4a528961999d7ee856481e1?s=128'}

```

3. Render layouts if logged in token in [Lesson 34](https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18241572#overview)

   - Create HeaderLoggedIn.js component

4. Pass state through Props for `setLoggedIn()` in `L33` and `L34`
   - Mostly in [(L34)](https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18241572#overview) we pass in the `useState` setLoggedIn to true/false

```js
function HeaderLoggedOut(props) {
  if (response.data) {
    console.log("HeaderLoggedOut => handleSubmit successful loggin attempt returned: ", response.data)
    // Added props.setLoggedIn(true) in L34 @7:42: https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18241572#overview
    props.setLoggedIn(true)
  }
}
```

```js
//Then in HeaderLoggedIn component:
function HeaderLoggedIn(props) {
  ;<button onClick={() => props.setLoggedIn(false)} className="btn btn-sm btn-secondary">
    Sign Out
  </button>
}
```

5. **localStorage** in Lesson 35, storing user token, username, avatar
   - [(L35)](https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18254880#overview)

```js
localStorage.setItem("complexappToken", response.data.token)
localStorage.setItem("complexappUsername", response.data.username)
localStorage.setItem("complexappAvatar", response.data.avatar)
```
