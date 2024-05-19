import contactsService from "../services/contactsServices.js";
import { checkResult } from "../helpers/helpers.js";
import controllerWrapper from "../decorators/controllerWrapper.js";

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const filter = { owner };
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await contactsService.listContacts({
    filter,
    skip,
    limit,
  });
  const total = await contactsService.countContacts(filter);
  res.json({
    total,
    result,
  });
};

const getOneContact = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await contactsService.getContact({ _id, owner });
  checkResult(result);
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await contactsService.removeContact({ _id, owner });
  checkResult(result);
  res.json(result);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await contactsService.addContact({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await contactsService.updateContact({ _id, owner }, req.body);
  checkResult(result);
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await contactsService.updateStatusContact(
    { _id, owner },
    req.body
  );
  checkResult(result);
  res.json(result);
};

export default {
  getAllContacts: controllerWrapper(getAllContacts),
  getOneContact: controllerWrapper(getOneContact),
  deleteContact: controllerWrapper(deleteContact),
  createContact: controllerWrapper(createContact),
  updateContact: controllerWrapper(updateContact),
  updateStatusContact: controllerWrapper(updateStatusContact),
};
