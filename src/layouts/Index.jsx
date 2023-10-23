import React from 'react';
import Navbar from './Navbar';

export default function Container({ children }) {
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
