import React from "react";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";

import { Create } from "@refinedev/mui";
import { Box, TextField, MenuItem } from "@mui/material";

import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom'
import {Button} from "@mui/material"

const UserSignIn = () => {
	const {
		register,
		saveButtonProps,
		handleSubmit,
		refineCore: { formLoading },
		formState: { errors },
	} = useForm();

	const navigate= useNavigate()
	const onFinishHandler = async (data: FieldValues) => {
		try{
			const res= await fetch("http://localhost:5001/api/v1/auth/sign-in", {
				method: 'POST',
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(data)
			})
			if(!res.ok){
				const error= await res.json()
				toast.error(error.message)	
			}
			const result= await res.json()
			localStorage.setItem('token', result.token)
			toast.success('Login Successful')
			setTimeout(()=>{
				navigate('/user-forms')
			}, 2000)


		}catch(error){
			toast.error('Something went wrong')	
			console.log(error)
		}
	};

	return (
		<>
		<Toaster position="top-center" reverseOrder={false}/>
		<Create
			isLoading={formLoading}
			>
			<form onSubmit={handleSubmit(onFinishHandler)}>
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
			<Button type="submit" color="primary"> Login </Button>
			</form>
		</Create>
		</>
	);
};

export default UserSignIn;
