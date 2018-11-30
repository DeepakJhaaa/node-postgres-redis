const express = require("express");
const router = express.Router();
const { knex } = require("../config.js");
const redis = require("redis");
const client = redis.createClient(6379, process.env.REDIS_HOST);

router.get("/", function(req, res) {
  const values = [];

  client.hgetall("values", function(err, obj) {
    if (err) {
      console.log("Error " + err);
      res.send(err);
    } else {
      console.dir(obj);
      if (obj) {
        values.push(obj.test);
      }
      res.send(values);
    }
  });
});

router.get("/patient", (req, res) => {
  knex
    .select()
    .table("patient")
    .then(rows => {
      res.send(rows[0]);
    })
    .catch(err => {
      throw err;
    });
});

router.post("/todos", (req, res) => {
  if (req.body && req.body.task) {
    newTask = req.body;
  } else {
    return;
  }

  knex
    .insert(newTask)
    .into("ta_todo")
    .then(function(result) {
      console.log("success", result);
      res.send({
        status: "success",
        message: "Task created successfully."
      });
    })
    .catch(err => {
      throw err;
    });
});

router.get("/todos", (req, res) => {
  knex
    .select()
    .table("ta_todo")
    .then(rows => {
      res.send(rows);
    })
    .catch(err => {
      throw err;
    });
});

router.post("/redis", function(req, res) {
  client.hmset("values", { test: "test_value" });

  // redis integration
  res.redirect("/");
});

module.exports = router;
