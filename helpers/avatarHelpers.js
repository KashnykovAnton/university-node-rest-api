import gravatar from "gravatar";
import fs from "fs/promises";
import path from "path";
import Jimp from "jimp";

export const createRemoteAvatarUrl = (email) =>
  gravatar.url(email, { r: "g", d: "retro" }, true);

const avatarsPath = path.resolve("public", "avatars");

const resizedAvatar = async (path) =>
  Jimp.read(path)
    .then((avatar) => {
      return avatar.cover(250, 250).writeAsync(path);
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });

export const createLocalAvatarUrl = async (dataFile) => {
  const { path: oldPath, filename } = dataFile;
  await resizedAvatar(oldPath);
  const newPath = path.join(avatarsPath, filename);
  await fs.rename(oldPath, newPath);
  const avatar = path.join("avatars", filename);
  return avatar;
};
