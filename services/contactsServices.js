import Contact from "../models/Contact.js";

function listContacts() {
  return Contact.find();
}

async function getContactById(_id) {
  const result = await Contact.findById({ _id });
  return result;
}

function removeContact(id) {
  return Contact.findByIdAndDelete(id);
}

function addContact(data) {
  return Contact.create(data);
}

function updateContact(id, body) {
  return Contact.findByIdAndUpdate(id, body);
}

function updateStatusContact(id, body) {
  return Contact.findByIdAndUpdate(id, body);
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
