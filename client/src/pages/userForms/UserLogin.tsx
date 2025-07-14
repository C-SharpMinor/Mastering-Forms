import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";

import { Create } from "@refinedev/mui";
import { Box, TextField, MenuItem } from "@mui/material";

import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

const UserLogin = () => {
	const {
		register,
		saveButtonProps,
		handleSubmit,
		refineCore: { formLoading },
		formState: { errors },
	} = useForm();

	const onFinishHandler = async (data: FieldValues) => {};

	return (
		<Create
			isLoading={formLoading}
			saveButtonProps={{
				...saveButtonProps,
				onClick: handleSubmit(onFinishHandler),
			}}
		>
			<TextField
				label="Username"
				{...register("username", { required: "The username is required" })}
				margin="normal"
			/>
			<TextField
				label="Email"
				{...register("email", { required: "The email is required" })}
				margin="normal"
			/>
			<TextField
				label="Password"
				{...register("password", { required: "The email is required" })}
				margin="normal"
			/>
		</Create>
	);
};

export default UserLogin;
