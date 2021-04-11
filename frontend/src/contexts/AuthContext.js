import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../db";

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [UserId, setUserId] = useState(null);
	const signup = async (email, password, type, UserId) => {
		await auth.createUserWithEmailAndPassword(email, password);
		let coll = "Users";
		if (type == 1) {
			coll = "Companies";
		} else if (type == 2) {
			coll = "Government";
		}
		const data = {
			UserId: UserId,
			email: email,
		};
		setUserId(UserId);
		await auth.currentUser.updateProfile({
			displayName: UserId,
		});

		db.collection(coll).doc(currentUser.uid).set(data);
	};

	const login = async (email, password) => {
		await auth.signInWithEmailAndPassword(email, password);

		setUserId(auth.currentUser.displayName);
		// console.log(currentUser);
		// let data1 = await db.collection("Users").doc(currentUser.uid);
		// let data = data1.get();
		// if (data) {
		// 	setUserId(data.UserId);
		// 	console.log(data.data());
		// } else {
		// 	data = await db.collection("Companies").doc(currentUser.uid).get();
		// 	if (data) {
		// 		setUserId(data.UserId);
		// 	} else {
		// 		data = await db.collection("Government").doc(currentUser.uid).get();
		// 		if (data) {
		// 			setUserId(data.UserId);
		// 		}
		// 	}
		// }
	};

	function logout() {
		return auth.signOut();
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email);
	}

	function updateEmail(email) {
		return currentUser.updateEmail(email);
	}

	function updatePassword(password) {
		return currentUser.updatePassword(password);
	}
	function updateName(name) {
		return currentUser.updateProfile({
			displayName: name,
		});
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		UserId,
		login,
		signup,
		logout,
		resetPassword,
		updateEmail,
		updatePassword,
		updateName,
		setUserId,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}
