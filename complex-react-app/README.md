## Commands

Spin up local environment with **npm run dev** in `/complex-react-app` and **npm run start** in `/backend-api`

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

7. 6A Install React Markdown [(L50 3:30)](https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18581954#overview) and apply it to **ViewSinglePost.js**

   - Install [React markdown](https://www.npmjs.com/package/react-markdown) with:

     - `npm i react-markdown`
     - import with `import ReactMarkdown from 'react-markdown'`

8. Install React Tooltip in [L51 (1:15)](https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18591542#overview) and apply to **ViewSinglePost.js**

   - Install [React Tooltip](https://www.npmjs.com/package/react-tooltip) with:

     - `npm i react-tooltip`
     - import with `import {Tooltip} from 'react-tooltip'`
     - _There's an object inside this package called `Tooltip`_
     - We renamed it to `ReactTooltip` which was a popular name for it in the past:
     - `import {Tooltip as ReactTooltip} from 'react-tooltip'` //import {Tooltip as ReactTooltip} from 'react-tooltip' if you want to use a different name for it.`

   - In **ViewSinglePost.js** add: `data-tooltip-content="Edit Post" data-tooltip-id="edit"`

   ```js
   <a href="#" data-tooltip-content="Edit Post" data-tooltip-id="edit" className="text-primary mr-2" title="Edit">
     <i className="fas fa-edit"></i>
   </a>
   <ReactTooltip id="edit" className="custom-tooltip" />
   ```

9. Create file `webpack.config.js` and copy file in Lesson 14.

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

## Pass State from one Component to Another

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

- Then check browser console => `Applciation` => `Local Storage`

## Lifting the State Up

6. In [(L36)](https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18264826#overview) around `4:45` we lift the state up.
   - The loggedIn state lives in our `Header.js` component.
   - Our `Main.js` (_like App.js_) has no way of accessing the (_child?_) loggedIn state created in our `Header.js` component.
   - **Lifting the state up** - requires us to move the state (_loggedIn_) up to the **parent** component, _here_ the `Main.js` component.
     - Then we can pass the state down from the parent to the child component.
   - Just move the state `const [loggedIn, setLoggedIn] = useState(false)`
   - Pass down to the `Header` component with props:

```js
// Main.js
;<Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

//Then in Header.js
function Header(props) {
  {
    props.loggedIn ? <HeaderLoggedIn setLoggedIn={props.setLoggedIn} /> : <HeaderLoggedOut setLoggedIn={props.setLoggedIn} />
  }
}
```

7. In Main.js (which holds loggedIn state now) dynamically set which component loads

```js
<Route path="/" element={loggedIn ? <Home /> : <HomeGuest />} />
```

- 7B - In the past, devs would use a third party state management library like **Redux**
  - In the latest versions we now have tools like **Context** and **useReducer** which will solve the state problems in most cases.

## Create Post

8. Start [L37](https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18268562#overview)
   - x

### Create Unique Base URL

9. In [L37 at (9:35)](https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18268562#overview)
   - In `Main.js` import axios and use `Axios.defaults.baseURL` to set the app's base URL

```js
import Axios from "axios"
Axios.defaults.baseURL = "http://localhost:8080"
```

## Flash Messages L39

10. Create `FlashMessages.js` component and pull it into the `Main.js`

-

## Context

11. L40

## useReducer

12. [L41](https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18391870#overview)

- complex state logic that requires multiple values

## Immer Package (L43)

14. [NPM Immer package here](https://npmjs.com/package/immer)

- - Install with package for react `npm i immer use-immer`

  - Not part of official core of react. But perfect fit into React.
  - Problem solves: _In react, you need to return a new object. You can't directly modify or mutate the existing state object_
  - **Immer** gives us a draft, essentially a carbon copy of state and then we are free to directly modify and mutate that draft.
  -

## Tabbed Navigation

15. Starts around [L46](https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18505684#overview)

## Format Date in JS

16. Format dateTime to date in [L47 at (6:37)](https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18505708#overview)

```js
const date = new Date(post.createdDate)
const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
```

### Google Chrome Slow Connection in `Network` tab

- See [L48 (5:10)](https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18528068#overview) select Network => _change_ **No Throttling** to **Slow 3G**

## Cleanup Function when Component is finished running (aka **Unmounted**)

- See [L49 (2:15)](https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18528070#overview)
  - Typically used in cleaning up asyncronous network requests, keybindings, full screen search overlay, etc.
  - In ViewSinglePost.js component set up the cleanup function at the end of our **useEffect()** function:

```js
//L48 (3:50) - set up cancel
const ourRequest = Axios.CancelToken.source() //generates token that can be used
useEffect(() => {
  async function fetchPost() {
    try {
      // const response = await Axios.get(`/post/${id}`)
      //in Axios POST request, the 2nd argument is what you want to send to the server
      // in GET request our cancelToken is the 2nd arguemnt. In POST request, it'd be the third.
      const response = await Axios.get(`/post/${id}`, { cancelToken: ourRequest.token }) //L48 (4:30)

      console.log("ViewSinglePost.js useEffect/fetchPost Axios get request for ${username}/posts returned: ", response)
      setPost(response.data)
      setIsLoading(false)
    } catch (e) {
      console.log("Error in ProfilePosts useEffect catch block was: ", e)
    }
  }
  fetchPost() //you can't pass useEffect an async function directly
  return () => {
    ourRequest.cancel()
  }
}, [])
```

### Hover label in L51

- [L51](https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18591542#overview) covers hover labels.

## Edit Post

- Covered in Lessons 52 and 53.
  - In [L52](https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/18594986#overview)
