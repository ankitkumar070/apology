import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

function getSessionId() {
  let sessionId = sessionStorage.getItem("apology_session_id");

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem("apology_session_id", sessionId);
  }

  return sessionId;
}

export async function logAction(action, metadata = {}) {
  try {
    await addDoc(collection(db, "action_logs"), {
      sessionId: getSessionId(),
      action,
      metadata,
      timestamp: serverTimestamp(),
    });

    console.log("Firebase event logged:", action);
  } catch (error) {
    console.error("Firebase logging failed:", error);
  }
}