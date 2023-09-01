function OurApp(){
  return React.createElement("div", null, [
    React.createElement("h1", null, "Our App Header"),
    React.createElement("p", null, `The current time is ${new Date().toLocaleString()}.`),
    React.createElement("small", null, "Copyright footer text."),
  ])
 
}


const root = ReactDOM.createRoot(document.querySelector('#app'));
// root.render(React.createElement(OurApp))
// setInterval(a, b)
setInterval(function() {
  root.render(React.createElement(OurApp))
}, 1000)
