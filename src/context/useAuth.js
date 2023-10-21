import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setData } from '../redux/features/auth/authSlice';
export default function useAuth() {
	const dispatch = useDispatch();
	const url = import.meta.env.VITE_URL;

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
	// console.log("Hello world");

	return {
		login,
		instance,
	};
}
