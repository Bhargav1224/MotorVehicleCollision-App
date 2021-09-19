// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
// import { API_KEY,AUTO_DOMAIN,APP_ID,PROJECT_ID,STORAGE_BUCKET,MESSAGE_ID } from "./secrete";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//Our web app's Firebase configuration

const firebaseConfig = {
	apiKey: "AIzaSyB8DbyTKolYSuvznNh1ESlmrcGqUfc2HWQ",
	authDomain: "otp-app-9611a.firebaseapp.com",
	projectId: "otp-app-9611a",
	storageBucket: "otp-app-9611a.appspot.com",
	messagingSenderId: "737955240175",
	appId:
		"1:737955240175:web:3f126c6e9179630e29a31a1:737955240175:web:3f126c6e9179630e29a31a",
};

// Initialize Firebase
export const auth = initializeApp(firebaseConfig);
