import Contact from "../models/Contact.js";

function listContacts() {
  return Contact.find();
}

function getContactById(contactId) {}

function removeContact(contactId) {}

function addContact(data) {
  return Contact.create(data);
}

function updateContact(contactId, body) {}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
