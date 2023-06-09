module.exports = app => {
    const restuarants = require("../controllers/restuarant.controller.js");
  
    var router = require("express").Router();
  
    // Create a new restuarant
    router.post("/", restuarants.create);
  
    // Retrieve all restuarants
    router.get("/", restuarants.findAll);
  
    // Retrieve all published restuarants
    router.get("/published", restuarants.findAllPublished);
  
    // Retrieve a single restuarant with id
    router.get("/:id", restuarants.findOne);
  
    // Update a restuarant with id
    router.put("/:id", restuarants.update);
  
    // Delete a restuarant with id
    router.delete("/:id", restuarants.delete);
  
    // Delete all restuarants
    router.delete("/", restuarants.deleteAll);
  
    app.use('/api/restuarants', router);
  }