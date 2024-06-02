import sgMail from "@sendgrid/mail";
import { HttpError } from "./errorHelpers.js";

const { SENDGRID_API_KEY, SENDGRID_EMAIL_FROM } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const emailMsg = { ...data, from: SENDGRID_EMAIL_FROM };
  try {
    await sgMail.send(emailMsg);
    console.log("Email was sent successfully");
  } catch (error) {
    throw HttpError(500, `Send email error: ${error.message}`);
  }
};

export default sendEmail;
