const useState = React.useState  

const pets = [
  { name: "Meowsalot", species: "cat", age: "5", id: 123456789 },
  { name: "Barksalot", species: "dog", age: "3", id: 987654321 },
  { name: "Fluffy", species: "rabbit", age: "2", id: 123123123 },
  { name: "Purrsloud", species: "cat", age: "1", id: 456456456 },
  { name: "Paws", species: "dog", age: "6", id: 789789789 }
]
  
  
function OurApp(){  
  return (
    <>
        <OurHeader />
        <LikeArea />
        <TimeArea />
              <ul>
                    {/* Modern ES6 Arrow Function (minimalist) */}
                     {pets.map(pet => <Pet name={pet.name} species={pet.species} age={pet.age} key={pet.id} />)}    
              </ul>
        <Footer />
    </>
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
