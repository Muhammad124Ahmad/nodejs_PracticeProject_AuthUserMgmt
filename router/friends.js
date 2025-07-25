const express = require("express");

const router = express.Router();

let friends = {
  "johnsmith@gamil.com": {
    firstName: "John",
    lastName: "Doe",
    DOB: "22-12-1990",
  },
  "annasmith@gamil.com": {
    firstName: "Anna",
    lastName: "smith",
    DOB: "02-07-1983",
  },
  "peterjones@gamil.com": {
    firstName: "Peter",
    lastName: "Jones",
    DOB: "21-03-1989",
  },
};

// GET request: Retrieve all friends
router.get("/", (req, res) => {
  res.send(JSON.stringify(friends, null, 4));
});



// POST request: Add a new friend
router.post("/", (req, res) => {
  if (req.body.email) {
    // Create or update friend's details based on provided email
    friends[req.body.email] = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      DOB: req.body.DOB,
    };
  }
  // Send response indicating user addition
  res.send("The user" + " " + req.body.firstName + " Has been added!");
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email", (req, res) => {
  const email = req.params.email;
  res.send(friends[email]);
});
// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
  const email = req.params.email;
  if (friends[email]) {
    const { firstName, lastName, DOB } = req.body;
    if (firstName) {
      friends[email].firstName = firstName;
    }
    if (lastName) {
      friends[email].lastName = lastName;
    }
    if (DOB) {
      friends[email].DOB = DOB;
    }
    res.status(200).send("Updated Succesfully");
  } else {
    return res.status(404).send(`User with ${email} not found.`);
  }
});

// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  const email = req.params;
  if (friends[email]) {
    delete friends[email];
    res.status(200).send("Deleted Succesfully");
  } else {
    return res.status(404).send(`User with ${email} not found.`);
  }
});

module.exports = router;
