import React, { useContext, useState, useEffect } from "react";
import { auth } from "../db";
import app from "../db";

const AuthContext = React.createContext();
const db = app.firestore();
export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);
	const [UserId, setUserId] = useState();
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
		db.collection(coll).doc(currentUser.uid).set(data);
	};

	const login = async (email, password) => {
		await auth.signInWithEmailAndPassword(email, password);
		let data = db.collection("Users").doc(currentUser.uid);
		if (data) {
			setUserId(data.UserId);
		} else {
			data = db.collection("Companies").doc(currentUser.uid);
			if (data) {
				setUserId(data.UserId);
			} else {
				data = db.collection("Government").doc(currentUser.uid);
				if (data) {
					setUserId(data.UserId);
				}
			}
		}
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
