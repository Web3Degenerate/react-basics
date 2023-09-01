function OurApp(){
  // return React.createElement("div", null, [
  //   React.createElement("h1", null, "Our App Header"),
  //   React.createElement("p", null, `The current time is ${new Date().toLocaleString()}.`),
  //   React.createElement("small", null, "Copyright footer text."),
  // ])
  //Activate Babel in JS Codepen settings:
  //React fragment just <></>
  return (
    <>
        <h1 className="special">Our App Header</h1>
        <p>The current time is {new Date().toLocaleString()}.</p>
        <small>Copyright Footer Text</small>
    </>
  )
 
}


const root = ReactDOM.createRoot(document.querySelector('#app'));
// root.render(React.createElement(OurApp))
// setInterval(a, b)
setInterval(function() {
  // root.render(React.createElement(OurApp))
  root.render(<OurApp />)
}, 1000)