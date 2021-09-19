import React from "react";
//Material UI imports
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
//local components
import { onSignInSubmit, onSubmitOTP } from "../../Firebase/verification";
import { useMergeState } from "../Login/useMergeState";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const initialData = {
	phoneNumber: "",
	otp: "",
	username: "",
};

export const Register = () => {
	//custom hook -------useMergeState
	const { data, handleChange, handleRegister } = useMergeState(initialData);
	//destructing the values from data
	const { phoneNumber, otp, username } = data;
	const classes = useStyles();

	return (
		<div>
			<div id="sign-in-button"></div>

			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Register
					</Typography>

					<form
						className={classes.form}
						noValidate
						onSubmit={(e) => onSignInSubmit(e, phoneNumber)}
					>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="phoneNumber"
							label="Enter PhoneNumber"
							name="phoneNumber"
							autoComplete="PhoneNumber"
							autoFocus
							value={phoneNumber}
							onChange={handleChange}
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="secondary"
							className={classes.submit}
						>
							Send OTP
						</Button>
					</form>
					<form
						className={classes.form}
						noValidate
						onSubmit={(e) => onSubmitOTP(e, otp)}
					>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="otp"
							label="Enter OTP"
							name="otp"
							autoComplete="otp"
							autoFocus
							value={otp}
							onChange={handleChange}
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="secondary"
							className={classes.submit}
						>
							Verify OTP
						</Button>
					</form>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="username"
						label="Enter Username"
						name="username"
						autoComplete="Username"
						autoFocus
						value={username}
						onChange={handleChange}
					/>
					<Button
						fullWidth
						variant="contained"
						color="secondary"
						className={classes.submit}
						onClick={handleRegister}
					>
						Register
					</Button>
				</div>
			</Container>
		</div>
	);
};
