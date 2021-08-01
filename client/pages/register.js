import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { registerUserMutation } from "../graphql/mutations/user";
import Link from "next/link";
import Head from "next/head";

function Register() {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [fullName, setFullName] = useState("");
	const [registerUser] = useMutation(registerUserMutation, {
		variables: {
			registerUser: {
				username,
				fullName,
				password,
			},
		},
		onCompleted: () => {
			router.push("/home");
		},
		onError: (err) => {
			window.alert(err.message);
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		registerUser();
	};

	return (
		<div className="flex flex-col items-center mt-32 h-screen ">
			<Head>
				<title>Sign Up</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="p-6 border rounded w-1/4">
				<h1 className="text-2xl mb-7 text-center">Sign Up</h1>
				<form onSubmit={handleSubmit} className="flex flex-col ">
					<input
						type="text"
						className="py-3 px-4 border rounded outline-none focus:border-pink-200"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Username"
					></input>
					<input
						type="text"
						className="py-3 px-4 mt-3 border rounded outline-none focus:border-pink-200"
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
						placeholder="Full Name"
					></input>
					<input
						type="password"
						className="py-3 px-4 mt-3 border rounded outline-none focus:border-pink-200"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Password"
					></input>
					<p className="text-center text-sm mt-5">
						Have an account?{" "}
						<Link href="/login">
							<span className="font-medium cursor-pointer hover:text-gray-700">
								Login
							</span>
						</Link>
					</p>
					<button
						type="submit"
						className="bg-black text-white p-3 mt-3 rounded hover:bg-gray-900"
					>
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
}

export default Register;
