const pets = [
  { name: "Meowsalot", species: "cat", age: "5", id: 123456789 },
  { name: "Barksalot", species: "dog", age: "3", id: 987654321 },
  { name: "Fluffy", species: "rabbit", age: "2", id: 123123123 },
  { name: "Purrsloud", species: "cat", age: "1", id: 456456456 },
  { name: "Paws", species: "dog", age: "6", id: 789789789 }
]
  
  
function OurApp(){
  // return React.createElement("div", null, [
  //   React.createElement("h1", null, "Our App Header"),
  //   React.createElement("p", null, `The current time is ${new Date().toLocaleString()}.`),
  //   React.createElement("small", null, "Copyright footer text."),
  // ])
         
  return (
    <>
        <OurHeader />
        <TimeArea />
        <ul>

    {/* Traditional Anonymous Function */}
      {/*
          {pets.map(function(pet){  
            return <Pet name={pet.name} species={pet.species} age={pet.age} key={pet.id} />      
          })}
      */}
          
     {/* Modern ES6 Arrow Function (minimalist) */}
               {pets.map(pet => <Pet name={pet.name} species={pet.species} age={pet.age} key={pet.id} />)}
      {/* ES6 Arrow Function we've been using:
          {pets.map((pet) => (
            <Pet name={pet.name} species={pet.species} age={pet.age} key={pet.id} />
           ))}
      */}
            
     {/* Manually Using Props */}
         {/* <Pet name="Meowsalot" species="cat" age="5"/> */}
          
        </ul>
        <Footer />
    </>
  )
}

// function Pet({name, species, age}){
//   return <li>{name} is a {species} and is {age} years old.</li>
// }

function Pet(props){
  return <li>{props.name} is a {props.species} and is {props.age} years old.</li>
}

function OurHeader() {
  return <h1 className="special">Our Amazing App Header</h1>
}

function TimeArea(){
  return <p>The current time is {new Date().toLocaleString()}.</p>
}

function Footer(){
  return <small>Copyright Footer Text</small>
}

const root = ReactDOM.createRoot(document.querySelector('#app'));
// root.render(React.createElement(OurApp))
// setInterval(a, b)
setInterval(function() {
  // root.render(React.createElement(OurApp))
  root.render(<OurApp />)
}, 1000)
