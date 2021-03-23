import { req } from "../req";

export const bakDb = async function () {
  return req.post("/v1/tools/tiny_tool/bak_db");
};
