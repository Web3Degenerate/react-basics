const useState = React.useState  

const pets = [
  { name: "Meowsalot", species: "cat", age: "5", id: 123456789 },
  { name: "Barksalot", species: "dog", age: "3", id: 987654321 },
  { name: "Fluffy", species: "rabbit", age: "2", id: 123123123 },
  { name: "Purrsloud", species: "cat", age: "1", id: 456456456 },
  { name: "Paws", species: "dog", age: "6", id: 789789789 }
]
  
  
function OurApp(){  
  const [pets,setPets] = useState([
  { name: "Meowsalot", species: "cat", age: "5", id: 123456789 },
  { name: "Barksalot", species: "dog", age: "3", id: 987654321 },
  { name: "Fluffy", species: "rabbit", age: "2", id: 123123123 },
  { name: "Purrsloud", species: "cat", age: "1", id: 456456456 },
  { name: "Paws", species: "dog", age: "6", id: 789789789 }
])
  
  return (
    <>
        <OurHeader />
        <LikeArea />
      
      <AddPetForm setPets={setPets} />
        <TimeArea />
              <ul>
                    {/* Modern ES6 Arrow Function (minimalist) */}
                     {pets.map(pet => <Pet name={pet.name} species={pet.species} age={pet.age} key={pet.id} />)}    
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
        // props.setPets(prev => prev.concat({name: "Test name", species: "dog", age: 2, id: 123456 }))  
        // props.setPets(prev => prev.concat({name: name, species: species, age: age, id: 123456 }))
 // At (14:54) if name:name you can just use name, etc. 
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
  return <li>{props.name} is a {props.species} and is {props.age} years old.</li>
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
  
  // setTimeout(a, b)
  setTimeout(function(){
    setTheTime(new Date().toLocaleString())
  },1000)
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
