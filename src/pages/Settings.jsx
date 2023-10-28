import React from 'react';
import Container from '../layouts/Index';
import useAuth from '../context/useAuth';

export default function Settings() {
	const { logout } = useAuth();
	return (
		<Container>
			<button onClick={logout}>Logout</button>
		</Container>
	);
}
