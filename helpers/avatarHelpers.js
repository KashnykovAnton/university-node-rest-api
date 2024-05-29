import gravatar from "gravatar";

export const createAvatarUrl = (email) =>
  gravatar.url(email, { r: "g", d: "retro" }, true);
