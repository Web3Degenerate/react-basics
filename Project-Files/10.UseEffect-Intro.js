//To delete an item in our pets array, get the id (pet.id) and use our setPets={setPets} useState() to delete

const useState = React.useState  
const useEffect = React.useEffect

  
function OurApp(){ 
  
    const [pets,setPets] = useState([])
    // const [pets,setPets] = useState([
    //     { name: "Meowsalot", species: "cat", age: "5", id: 123456789 },
    //     { name: "Barksalot", species: "dog", age: "3", id: 987654321 },
    //     { name: "Fluffy", species: "rabbit", age: "2", id: 123123123 },
    //     { name: "Purrsloud", species: "cat", age: "1", id: 456456456 },
    //     { name: "Paws", species: "dog", age: "6", id: 789789789 }
    // ])
    
// Only run once, the first time this component is rendered:
    // useEffect(a, b)
    // a - function you want to run
    // b - dependencies or the things you want to watch for changes. Only when react detects change will it call your function.
    // useEffect(() => {}, [])
    useEffect(() => {
      // (12:20) - load any data from the browser's localStorage if it exists.
      // https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/17905002#overview
        if (localStorage.getItem("examplePetData")) {
          // (12:55) - Before we pull in the data from the browser's local storage, 
          // we first want to parse it from a string of text into actual JS data (our array of objects format) with JSON.parse
          setPets(JSON.parse(localStorage.getItem("examplePetData")))
        }
    }, [])
    
    
// Run every time our pet state changes:
    // useEffect(a, b)
    // useEffect(a, [pets])
    // useEffect(() => {}, [pets])
    useEffect(() => {
      // localStorage.setItem(variable name, store data in a simple string of text)
      // (at 12:00) - use JSON.stringify to turn our pets array data into a string of text. 
      // (https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/17905002#overview)
      localStorage.setItem("examplePetData", JSON.stringify(pets))
    }, [pets])
  
  return (
    <>
        <OurHeader />
        <LikeArea />
      
        <TimeArea />
      <AddPetForm setPets={setPets} />
              <ul>
                    {/* Modern ES6 Arrow Function (minimalist) */}
                    {/* To delete, add pet.id and tap into our setPets={setPets} useState */}
                     {pets.map(pet => <Pet id={pet.id} setPets={setPets} name={pet.name} species={pet.species} age={pet.age} key={pet.id} />)}    
              </ul>
        <Footer />
    </>
  )
}


//Form for user to add a new pet: 
function AddPetForm(props) {
  
 //create a state for each input (12th min)
  const [name,setName] = useState()
  const [species, setSpecies] = useState()
  const [age, setAge] = useState()
  
      function handleSubmit(e) { // const handleSubmit = () => {}
        e.preventDefault();
        // alert('Form submitted')
        //Add to pet state
        
 //Add inputs to our setPets state:    
        // props.setPets(prev => prev.concat({name: name, species: species, age: age, id: 123456 }))
 // if name:name you can just use name, etc. 
         props.setPets(prev => prev.concat({name, species, age, id: Date.now() }))
        
 // Clear values on submit
        setName('')
        setSpecies('')
        setAge('')
      }  
  
  
  return (
  //respond to form event being submitted
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Add New Pet</legend>
        <input onChange={e => setName(e.target.value)} placeholder="Name" value={name} />
        <input onChange={e => setSpecies(e.target.value)} placeholder="species" value={species} />
        <input onChange={e => setAge(e.target.value)} placeholder="age in years" value={age} />
        <button>Add Pet</button>
      </fieldset>
    </form>
  )
}



function LikeArea(){
  const [likeCount,setLikeCount] = useState(0);
  
  function increaseLikeHandler(){
    // alert('hi homie')
    // setLikeCount(likeCount+1)  
    setLikeCount(function(prev){
      return prev + 1;
    })  
  }
  
  function decreaseLikeHandler(){
    // setLikeCount(likeCount-1)  
    // setLikeCount((prev) => {
      setLikeCount(prev => {
        if(prev>0){
          return prev-1;
        }else{
          return 0;
        }
      })  
    
  }
  
  return (
    <>
      <button onClick={increaseLikeHandler}>Increase likes</button>
      <button onClick={decreaseLikeHandler}>Decrease likes</button>
      <h2>This page has been liked {likeCount} times.</h2>  
    </>
  )
}

function Pet(props){
  
      function handleDelete(){
        //Give the setPets state all the pet items we want to keep except the one we want to delete
        // Every array in JS has access to functions like filter() and map()
        // filter() takes a function and runs that function once for each item in the array, and returns a new array
        props.setPets(prev => prev.filter(pet => pet.id != props.id ))
      }
  
  return (
    <li>{props.name} is a {props.species} and is {props.age} years old.
      <button onClick={handleDelete}>Delete</button>
    </li>
    )
}

function OurHeader() {
  return <h1 className="special">Our Amazing App Header</h1>
}


function TimeArea(){
  const [theTime,setTheTime] = useState(new Date().toLocaleString())
  // const time = useState(new Date().toLocaleString())
          // Returns array with two items in it
              // 1. item allows us to reference the current state 'variable'
              // 2. ability to update state 'setVariable'
          // return <p>The current time is {new Date().toLocaleString()}.</p>
  
  // Replace with useEffect() at (16:00): https://www.udemy.com/course/react-for-the-rest-of-us/learn/lecture/17905002#overview
        // setTimeout(a, b)
        // setTimeout(function(){
        //   setTheTime(new Date().toLocaleString())
        // },1000)
  
      // useEffect(() => {}, [])
      // useEffect(() => {
      //   setInterval(() => setTheTime(new Date().toLocaleString()), 1000)        
      // }, [])
  
  //When TimeArea component is no longer needed on the screen, add cleanup function so browser can clean up your side effects.
      useEffect(() => {
       const interval = setInterval(() => setTheTime(new Date().toLocaleString()), 1000)  
        
       return () => clearInterval(interval)
      }, [])
  
         return <p>The current time is {theTime}.</p>
}


function Footer(){
  return <small>Copyright Footer Text</small>
}

const root = ReactDOM.createRoot(document.querySelector('#app'))
root.render(<OurApp />)
// // root.render(React.createElement(OurApp))
// setInterval(function() {
//   root.render(<OurApp />)
// }, 1000)
