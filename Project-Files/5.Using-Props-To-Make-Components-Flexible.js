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
            <Pet name="Meowsalot" species="cat" age="5"/>
            <Pet name="Barksalot" species="dog" age="2"/>
            <Pet name="Fluffy" species="rabbit" age="3"/>
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
