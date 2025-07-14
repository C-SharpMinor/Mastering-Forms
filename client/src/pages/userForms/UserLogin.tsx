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
		<Create>
			<TextField label="Username" />
		</Create>
	);
};

export default UserLogin;
