import gravatar from "gravatar";
import fs from "fs/promises";
import path from "path";
import Jimp from "jimp";
import { HttpError } from "./errorHelpers.js";

export const createRemoteAvatarUrl = (email) =>
  gravatar.url(email, { r: "g", d: "retro" }, true);

const avatarsPath = path.resolve("public", "avatars");

const resizedAvatar = async (path) => {
  try {
    const avatar = await Jimp.read(path);
    await avatar.cover(250, 250).writeAsync(path);
  } catch (err) {
    throw HttpError(500, `Error resizing avatar: ${err.message}`);
  }
};

export const createLocalAvatarUrl = async (dataFile) => {
  const { path: oldPath, filename } = dataFile;
  await resizedAvatar(oldPath);
  const newPath = path.join(avatarsPath, filename);
  await fs.rename(oldPath, newPath);
  const avatar = path.join("avatars", filename);
  return avatar;
};
