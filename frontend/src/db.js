import firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
	apiKey: "AIzaSyDVFyKTriVgV_G1xrgQz8UYdOUqg840oKY",
	authDomain: "blockchain-banking-system.firebaseapp.com",
	projectId: "blockchain-banking-system",
	storageBucket: "blockchain-banking-system.appspot.com",
	messagingSenderId: "880078256219",
	appId: "1:880078256219:web:e30d2b284c48e49ea7677e",
	measurementId: "G-SV0V507180",
};

const app = firebase.initializeApp(firebaseConfig);

console.log(app);
export const auth = app.auth();
//console.log(db);
export default app;
