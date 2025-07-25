import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { IUser } from "../../interfaces/common";
import { Box, Typography, TextField, MenuItem } from "@mui/material";
import { FieldValues, FieldError } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { error } from "console";
import {Button} from '@mui/material'
import {jwtDecode} from 'jwt-decode'

const UpdateUser = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const onFinishHandler = async (data: FieldValues) => {
		try {
			//before passing the data object (gathered through register method) to the backend, we first modify it for the request body to be in the right
			// format. If we send the data like that, the data has the 'name', 'email' and 'role' values. If we sent it like that to the db, it would look
			// like {"name": "", "email":"", "role":""} the database would only recognize name and email and put that in the db (It does not throw an error
			// for the unrecognized key tho since we gave a default value of User in the schema). So the solution to this is to take the data submitted and put in a new object-
			// 'backendData' so you can assign the key- 'isAdmin' to a converted boolean value of the field (isAdmin accepts only boolean).
			//In summary we did 2 things:
			// 1. convert key from 'role' to 'isAdmin' {though this could be done by making register name to be 'isAdmin'
			// from ...register("role") in the first place}
			// 2. converted the isAdmin value to Boolean

			const backendData = {
				...data,
				isAdmin: data.role === "admin",
			};
			const token= localStorage.getItem('token')
			console.log(token)
			const userID= jwtDecode(token).id
			console.log(userID)
			const res = await fetch(`http://localhost:5001/api/v1/users/update/${userID}`, {
				method: "PATCH",
				headers: { Authorization: `Bearer ${token}`,
					"Content-Type": "application/json" },
				body: JSON.stringify(backendData),
			});
			if (!res.ok) {
				const error = await res.json();
				toast.error(error.message);
				throw new Error(error.message);
			}
			toast.success("User successfully updated!"); 
		} catch (error) {
			console.log(error);
			toast.error("Failed to update user");
		}
	};

	return (
		<>
			<Toaster position="top-center" reverseOrder={false} />
			<form onSubmit={handleSubmit(onFinishHandler)}>
				<Box sx={{ display: "flex", flexDirection: "column" }}>
				<TextField
					{...register("username", { required: "Name is required" })}
					error={!!errors?.name} //checks if there is an error or not (in boolean)
					helperText={errors.name?.message?.toString()}
					//helperText={getErrorMessage(errors.name)} //gets the error msg
					margin="normal"
					label="Username"
				/>
				<TextField
					{...register("email", {
						required: "Email is required",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "Invalid email address",
						},
					})}
					error={!!errors?.email}
					helperText={errors.name?.message?.toString()}
					//helperText={getErrorMessage(errors.email)}
					margin="normal"
					label="Email"
				/>
				<TextField
					{...register("role", { required: "The role is required" })}
					error={!!errors?.role}
					helperText={errors.name?.message?.toString()}
					//helperText={getErrorMessage(errors.role)}
					margin="normal"
					label="role"
					select
					defaultValue=""
				>
					<MenuItem value=""> Select a role</MenuItem>
					<MenuItem value="user"> User</MenuItem>
					<MenuItem value="admin">Admin</MenuItem>
				</TextField>
			</Box>
			<Button type="submit" color="primary">Update </Button>
			</form>
			</>
	);
};

export default UpdateUser;
