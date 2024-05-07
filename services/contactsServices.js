import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
const updateContacts = (contacts) => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  return allContacts.find((item) => item.id === contactId) || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removedContact] = allContacts.splice(index, 1);
  await updateContacts(allContacts);
  return removedContact;
}

async function addContact({ name, email, phone }) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const allContacts = await listContacts();
  allContacts.push(newContact);
  await updateContacts(allContacts);
  return newContact;
}

async function updateContact(contactId, body) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  allContacts[index] = { ...allContacts[index], ...body };
  await updateContacts(allContacts);
  return allContacts[index];
}

export default { listContacts, getContactById, removeContact, addContact, updateContact };
