import { getAuth } from "firebase/auth";
import firebaseApp from "./firebase";

const auth = getAuth(firebaseApp);

export { auth };
