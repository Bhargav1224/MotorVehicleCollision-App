// eslint-disable-next-line
import { auth } from "./firebase";
import {
	getAuth,
	RecaptchaVerifier,
	signInWithPhoneNumber,
} from "firebase/auth";
function configureCaptcha() {
	const auth = getAuth();
	window.recaptchaVerifier = new RecaptchaVerifier(
		"sign-in-button",
		{
			size: "invisible",
			callback: (response) => {
				// reCAPTCHA solved, allow signInWithPhoneNumber.
				onSignInSubmit();
			},
		},
		auth
	);
}
function onSignInSubmit(e, phonenumber) {
	e.preventDefault();
	configureCaptcha();
	const phoneNumber = "+91" + phonenumber;
	// console.log(phoneNumber);
	const appVerifier = window.recaptchaVerifier;

	const auth = getAuth();
	signInWithPhoneNumber(auth, phoneNumber, appVerifier)
		.then((confirmationResult) => {
			// SMS sent. Prompt user to type the code from the message, then sign the
			// user in with confirmationResult.confirm(code).
			window.confirmationResult = confirmationResult;
			// ...
			alert("OTP has been sent");
		})
		.catch((error) => {
			// Error; SMS not sent
			// ...
			alert("OTP has not sent");
		});
}

function onSubmitOTP(e, otp) {
	e.preventDefault();

	const code = otp;
	window.confirmationResult
		.confirm(code)
		.then((result) => {
			// User signed in successfully.
			// eslint-disable-next-line
			const user = result.user;
			alert("User is verified");
			// ...
		})
		.catch((error) => {
			// User couldn't sign in (bad verification code?)
			// ...
			alert("User couldn't sign in (bad verification code..?)");
		});
}

export { onSignInSubmit, onSubmitOTP };
