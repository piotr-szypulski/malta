// import * as firebaseApp from "firebase/app";
import * as admin from "firebase-admin";
import "firebase/auth";
import "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { log } from "./utils";
import { firebase, databaseUrl as databaseURL } from "../config.json";

try {
  admin.initializeApp({
    credential: admin.credential.cert(firebase),
    databaseURL
  });

  log.success("Loaded firebase app.");
} catch (e) {
  log.error(`Loading firebase app failed. ${e}`);
}

const database = admin.database();
const users = database.ref("/users");

export const getUsers = async () => {
  try {
    const snapshot = await users.once("value");

    return snapshot.val();
  } catch (e) {
    throw new Error(`Getting users failed. ${e.message}`);
  }
};

export const addUser = async user => {
  try {
    await users.update({
      [uuidv4()]: user
    });
  } catch (e) {
    throw new Error(`Adding user failed. ${e.message}`);
  }
};

export const updateUser = async ({ id, data }) => {
  try {
    await users.update({
      [id]: data
    });
  } catch (e) {
    throw new Error(`Updating user failed. ${e.message}`);
  }
};

export const deleteUser = async id => {
  try {
    await database.ref(`users/${id}`).remove();
  } catch (e) {
    throw new Error(`Removing user failed. ${e.message}`);
  }
};
