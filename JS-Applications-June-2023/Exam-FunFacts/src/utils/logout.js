import { internalFetch } from "../api/fetch.js";
import {
  deleteUserData,
  getAccessToken,
} from "../api/sessionStorageController.js";
import { page } from "../api/loadLibs.js";

export async function logout() {
  let settings = {
    method: "GET",
    headers: { "X-Authorization": getAccessToken() },
  };
  await internalFetch("/users/logout", settings);
  deleteUserData();
  page("/");
}
