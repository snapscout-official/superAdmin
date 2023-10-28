import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function Container({ children }) {
	const accessToken = localStorage.getItem('accessToken');

	if (!accessToken) {
		return <Navigate to='/' replace />;
	}
	return (
		<div className='flex flex-row h-screen w-screen'>
			<div className='w-1/12'>
				<Navbar />
			</div>
			<div className='flex flex-col w-full h-full bg-[#F5F5F5] p-5 pt-10'>
				{children}
			</div>
		</div>
	);
}
