/*
Created L79 (11:40): 
source: https://github.com/LearnWebCode/react-course/blob/master/previewDist.js
*/

const express = require("express")
const path = require("path")
const app = new express()
app.use(express.static(path.join(__dirname, "dist")))
app.get("*", (req, res) => res.sendFile(__dirname + "/dist/index.html"))
app.listen("4000")