import Contact from "../models/Contact.js";

function listContacts(search = {}) {
  const { filter = {} } = search;
  return Contact.find(filter);
}

function getContact(filter) {
  return Contact.findOne(filter);
}

function removeContact(filter) {
  return Contact.findOneAndDelete(filter);
}

function addContact(data) {
  return Contact.create(data);
}

function updateContact(filter, body) {
  return Contact.findOneAndUpdate(filter, body);
}

function updateStatusContact(filter, body) {
  return Contact.findOneAndUpdate(filter, body);
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
