const db = require("../models");
const Restuarant = db.resturants;


exports.create = (req, res) => {
      // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a restuarant
  const restuarant = new Restuarant({
    name: req.body.name,
    cuisine_type: req.body.cuisine_type,
    location: req.body.location,
    image: req.body.image,
  });

  // Save restuarant in the database
  restuarant
    .save(restuarant)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the restuarant."
      });
    });

  
};

exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Restuarant.find(condition)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving restuarants."
        });
        });
        
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Restuarant.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found restuarant with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving restuarant with id=" + id });
      });
  
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Restuarant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update restuarant with id=${id}. Maybe restuarant was not found!`
            });
          } else res.send({ message: "restuarant was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating restuarant with id=" + id
          });
        });
  
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Restuarant.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete restuarant with id=${id}. Maybe restuarant was not found!`
        });
      } else {
        res.send({
          message: "restuarant was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete restuarant with id=" + id
      });
    });
  
};

exports.deleteAll = (req, res) => {
    Restuarant.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} restuarants were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all restuarants."
      });
    });
};

exports.findAllPublished = (req, res) => {
    Restuarant.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving restuarants."
      });
    });

};