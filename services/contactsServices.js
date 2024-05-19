import Contact from "../models/Contact.js";

function listContacts(search = {}) {
  const { filter = {}, skip, limit } = search;
  return Contact.find(filter).skip(skip).limit(limit);
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
  getContact,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
