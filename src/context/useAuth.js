import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { setData } from '../redux/features/auth/authSlice';
export default function useAuth() {
	const dispatch = useDispatch();
	const url = import.meta.env.VITE_URL;
	const navigate = useNavigate();
	const [isUnauthorized, setIsUnauthorized] = useState(false);
	const [message, setMessage] = useState('');
	const emailRef = useRef();
	const passwordRef = useRef();

	const login = async (email, password) => {
		try {
			const res = await axios.post(`${url}login`, {
				email: email,
				password: password,
			});
			dispatch(setData(res.data.admin));
			localStorage.setItem('accessToken', res.data.accessToken);
			return { success: true };
		} catch (err) {
			console.log(err.response);
			return { success: false, message: err.response.data.error };
		}
	};
	const instance = axios.create({
		headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') },
	});

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
	return {
		login,
		instance,
		isUnauthorized,
		message,
		emailRef,
		passwordRef,
		toggleClose,
		submitForm,
	};
}
