import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';
import Unauthorized from '../components/modal/Index';
import Layout from '../layouts/Login';
import Input from '../components/Fields/Input';
import Button from '../components/Fields/Button';
import PasswordInput from '../components/Fields/Password';

export default function Login() {
	const navigate = useNavigate();
	const [isUnauthorized, setIsUnauthorized] = useState(false);
	const [message, setMessage] = useState('');
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
	const toggleClose = () => {
		setIsUnauthorized(false);
	};

	const submitForm = async (e) => {
		e.preventDefault();
		try {
			const authStatus = await login(
				emailRef.current.value,
				passwordRef.current.value
			);
			console.log();
			if (authStatus.success) {
				// Check if authStatus is true before navigating
				navigate('/dashboard');
			} else {
				setMessage(authStatus.message);
				emailRef.current.value = '';
				passwordRef.current.value = '';
				setIsUnauthorized(true);
			}
		} catch (error) {
			console.log(error); // Handle error
		}
	};
	return (
		<Layout>
			{isUnauthorized && (
				<Unauthorized message={message} toggleClose={toggleClose} />
			)}
			<form onSubmit={submitForm}>
				<Input
					type={'text'}
					label={'Email'}
					style={
						'w-full h-4 text-[black] bg-[rgba(217,217,217,0.15)] mt-2 p-6 rounded-lg border-2 border-solid border-[#E6E6E6]'
					}
					inputRef={emailRef}
				/>
				<PasswordInput
					style='flex text-black bg-rgba(217,217,217,0.15) mt-2 rounded-lg border-2 border-solid border-gray-300'
					label={'Password'}
					inputRef={passwordRef}
				/>
				<div className='flex justify-end pr-5'>
					<button className='text-sm'>Forgot Password</button>
				</div>

				<Button
					type={'submit'}
					style={'px-6 py-3 border-[.1rem] bg-[#61CB85] rounded-lg '}
					textStyle={
						'font-raleway tracking-[.1rem] text-white text-lg uppercase font-extrabold'
					}
					message={'Submit'}
				/>
			</form>
		</Layout>
	);
}
