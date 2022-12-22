const express = require("express");

const {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
} = require("./models/contacts.js");

const router = express.Router();

router.get("/contacts", async (req, res, next) => {
  const contacts = listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
});

router.get("/contacts/:id", async (req, res, next) => {
  const { id } = req.params;
  const searchedContact = getById(id);
  res.json({
    status: "success",
    code: 200,
    data: searchedContact,
  });
});

router.post("/contacts", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const updateContacts = addContact(name, email, phone);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { updateContacts },
  });
});

router.delete("/contacts/:id", async (req, res, next) => {
  const { id } = req.params;
  removeContact(id);
  res.status(204).json();
});

router.put("/contacts/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const upContact = updateContact(id, name, email, phone);
  res.json({
    status: "success",
    code: 200,
    data: { upContact },
  });
});

module.exports = router;
