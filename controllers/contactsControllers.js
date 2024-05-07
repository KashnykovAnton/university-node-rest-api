import contactsService from "../services/contactsServices.js";
import {checkResult} from "../helpers/helpers.js";
import controllerWrapper from "../decorators/controllerWrapper.js";

const getAllContacts = async (req, res, next) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  checkResult(result);
  res.json(result);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  checkResult(result);
  res.json(result);
};

const createContact = async (req, res, next) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsService.updateContact(id, req.body);
  checkResult(result);
  res.json(result);
};

export default {
  getAllContacts: controllerWrapper(getAllContacts),
  getOneContact: controllerWrapper(getOneContact),
  deleteContact: controllerWrapper(deleteContact),
  createContact: controllerWrapper(createContact),
  updateContact: controllerWrapper(updateContact),
};
