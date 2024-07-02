// @/utils/databaseActions.js
import {
  ref,
  set,
  get,
  child,
  update,
  remove,
  getDatabase,
} from "firebase/database";
import { db } from "@/firebase";
import { getAuth } from "firebase/auth";

function getUserUid() {
  return getAuth().currentUser.uid;
}

export function writeData(to = "", payload) {
  const userUid = getUserUid();
  if (!userUid) {
    return { valid: false, message: "User is not authenticated" };
  }

  const path = `/users/${userUid}/info/${to}`;
  const databaseRef = ref(db, path);

  return set(databaseRef, payload)
    .then(() => {
      return { valid: true, message: "Data has been written" };
    })
    .catch((error) => {
      return { valid: false, message: `An error occurred: ${error}` };
    });
}

export async function readData(to) {
  const userUid = getUserUid();
  if (!userUid) {
    return { valid: false, message: "User is not authenticated" };
  }

  try {
    const snapshot = await get(child(ref(db), `/users/${userUid}/info/${to}`));
    if (snapshot.exists()) {
      return { valid: true, data: snapshot.val() };
    } else {
      return { valid: false, message: "No data available" };
    }
  } catch (error) {
    return { valid: false, message: `An error occurred: ${error}` };
  }
}

export function deleteData(to) {
  const userUid = getUserUid();
  if (!userUid) {
    return { valid: false, message: "User is not authenticated" };
  }

  const path = `/users/${userUid}/info/${to}`;
  const databaseRef = ref(db, path);

  return remove(databaseRef)
    .then(() => {
      return { valid: true, message: "Data has been deleted" };
    })
    .catch((error) => {
      return { valid: false, message: `An error occurred: ${error}` };
    });
}

export function updateData(to, payload) {
  const userUid = getUserUid();
  if (!userUid) {
    return { valid: false, message: "User is not authenticated" };
  }

  const path = `/users/${userUid}/info/${to}`;
  const databaseRef = ref(db, path);

  return update(databaseRef, payload)
    .then(() => {
      return { valid: true, message: "Data has been updated" };
    })
    .catch((error) => {
      return { valid: false, message: `An error occurred: ${error}` };
    });
}

export async function getUserRole(user) {
  const db = getDatabase();
  const userRef = ref(db, "users/" + user.uid);
  const userSnapshot = await get(userRef);
  return userSnapshot.exists() ? userSnapshot.val().role : null;
}
