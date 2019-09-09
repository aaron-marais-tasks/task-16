/*
  This file holds my API server
*/

// Import JSON5 and project list
require("json5/lib/register")
let projects = require("./projects.json5")

// Import file system library
const fs = require("fs")

// Immport express and create app
const express = require("express")
const app = express()

// Use express JSON for body
app.use(express.json())

// Our GET call for API returns our project list
app.get("/api", (rq, rs) => {
  rs.send(projects)
})

// Our POST call for API should add items into the JSON file
app.post("/api", (rq, rs) => {
  // Make sure that title, description, and URL is available, and nothing else
  const {title, description, url, ...rest} = rq.body
  if(Object.keys(rest).length !== 0 || !title || !description || !url) // || checks due to any not being available
    return rs.send({
      status: "fail",
      reason: "Keys title, description, url required; no more than that"
    })

  // Push new item into projects array
  const len = projects.length
  projects.push({
    id: len + 1,
    title,
    description,
    url
  })

  // Write the new array into our projects JSON file
  fs.writeFile("./projects.json5", JSON.stringify(projects), err => {
    // Error out if could noto write to file
    if(err) return rs.send({
      status: "fail",
      reason: "Could not write to database"
    })

    rs.send({status: "success"})
  }) 
})

// Our PUT call for API should update the content of IDs
app.put("/api", (rq, rs) => {
  // Make sure if valid ID
  if(rq.body.id <= projects.length && rq.body.id > 0) {
    // Make sure that title, description or URL is available, and nothing else
    const {title, description, url, ...rest} = rq.body
    if(Object.keys(rest).length !== 0 || (!title && !description && !url))
      return rs.send({
        status: "fail",
        reason: "Keys title, description, url required; no more than that"
      })

    // Update project using ID for key
    projects[req.body.id - 1] = {
      ...projects[rq.body.id - 1],
      ...rq.body
    }
    rs.send({status: "success"})
  } else
    rs.send({
      status: "fail",
      reason: "Invalid ID"
    })
})

// Our DELETE call for API should delete using ID
app.delete("/api", (rq, rs) => {
  // Make sure is valid ID
  if(rq.body.id <= projects.length && rq.body.id > 0) {
    // Overwrite the projects array, by filtering out the item, and mapping items to reduce ID by 1
    projects = projects.filter(item => item.id !== rq.body.id).map(item => {
      if(item.id > rq.body.id) item.id -= 1
      return item
    })

    // Write new array to projects JSON file
    fs.writeFile("./projects.json5", JSON.stringify(projects), err => {
      // Send error if could not write file
      if(err)
        return rs.send({
          status: "fail",
	  reason: "Could not write to database"
	})

      rs.send({status: "success"})
    })
  } else
    rs.send({
      status: "fail",
      reason: "Invalid ID"
    })
})

app.listen(8000)

