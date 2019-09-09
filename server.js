require("json5/lib/register")
let projects = require("./projects.json5")
const fs = require("fs")

const express = require("express")
const app = express()

app.use(express.json())

app.get("/api", (rq, rs) => {
  rs.send(projects)
})

app.post("/api", (rq, rs) => {
  const {title, description, url, ...rest} = rq.body
  if(Object.keys(rest).length !== 0 || !title || !description || !url) return rs.send({status: "fail"})

  const len = projects.length
  projects.push({
    ...rq.body,
    id: len + 1
  })

  fs.writeFile("./projects.json5", JSON.stringify(projects), err => {
    if(err) return rs.send(err)

    rs.send({status: "success"})
  }) 
})

app.put("/api", (rq, rs) => {
  if(rq.body.id <= projects.length && rq.body.id > 0) {
    projects[req.body.id - 1] = {
      ...projects[rq.body.id - 1],
      ...rq.body
    }
    rs.send({status: "success"})
  } else rs.send({status: "fail"})
})

app.delete("/api", (rq, rs) => {
  if(rq.body.id <= projects.length && rq.body.id > 0) {
    projects = projects.filter(item => item.id !== rq.body.id).map(item => {
      if(item.id > rq.body.id) item.id -= 1
      return item
    })

    fs.writeFile("./projects.json5", JSON.stringify(projects), err => {
      if(err) return rs.send({status: "fail"})

      rs.send({status: "success"})
    })
  } else {
    rs.send({status: "fail"})
  }
})

app.listen(8000)

