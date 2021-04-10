import firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
	apiKey: "AIzaSyDNv-liOygrY17bqUNObJ9HjH7RKCuHkJA",
	authDomain: "decentralized-banking-system.firebaseapp.com",
	projectId: "decentralized-banking-system",
	storageBucket: "decentralized-banking-system.appspot.com",
	messagingSenderId: "258229683916",
	appId: "1:258229683916:web:f85a407db0d82c2839e469",
	measurementId: "G-G4N400HRYC",
};

const app = firebase.initializeApp(firebaseConfig);

console.log(app);
export const auth = app.auth();
//console.log(db);
export default app;
