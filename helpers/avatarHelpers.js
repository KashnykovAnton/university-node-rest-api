import gravatar from "gravatar";
import fs from "fs/promises";
import Jimp from "jimp";
import { HttpError } from "./errorHelpers.js";
import cloudinary from "./cloudinary.js";

// Comments for upload from hw05-avatars branch
// upload.array("avatar", 8), // if in one field can be several files, 8 - maxCount of files
// upload.fields([{name: "avatar", maxCount: 1}, {name: 'photo', maxCount: 3}]), // if can be several fields with several files

export const createRemoteAvatarUrl = (email) =>
  gravatar.url(email, { r: "g", d: "retro" }, true);

const resizedAvatar = async (path) => {
  try {
    const avatar = await Jimp.read(path);
    await avatar.cover(250, 250).writeAsync(path);
  } catch (err) {
    throw HttpError(500, `Error resizing avatar: ${err.message}`);
  }
};

export const createLocalAvatarUrl = async (dataFile) => {
  try {
    const { path } = dataFile;
    await resizedAvatar(path);
    const { url: avatarURL } = await cloudinary.uploader.upload(path, {
      folder: "avatars",
      use_filename: true,
      unique_filename: false,
    });
    return avatarURL;
  } catch (error) {
    throw HttpError(400, error.message);
  } finally {
    await fs.unlink(path);
  }
};
