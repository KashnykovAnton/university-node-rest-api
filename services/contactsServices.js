import Contact from "../models/Contact.js";

function listContacts() {
  return Contact.find();
}

async function getContactById(_id) {
  const result = await Contact.findById({ _id });
  return result;
}

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
