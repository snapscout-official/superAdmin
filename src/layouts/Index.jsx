import React from 'react';
import Navbar from './Navbar';

export default function Container({ children }) {
	return (
		<div className='flex flex-row h-screen w-screen'>
			<div className='w-1/12'>
				<Navbar />
			</div>
			{children}
		</div>
	);
}
