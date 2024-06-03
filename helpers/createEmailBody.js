import sendEmail from "./sendEmail.js";

const createEmailBody = async (email, verificationToken) => {
  const verificationUrl = `http://localhost:3000/api/users/verify/${verificationToken}`;
  const emailMsg = {
    to: email,
    subject: "Please verify your email",
    text: `Click here to verify your email: ${verificationUrl}`,
    html: `<p>Please <a href="${verificationUrl}">click here</a> to verify your email.</p>`,
  };
  await sendEmail(emailMsg);
};
export default createEmailBody;
