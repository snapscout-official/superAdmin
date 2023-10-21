import React from 'react';

export default function Container({ children }) {
	return (
		<div className='flex items-center justify-center h-screen w-screen'>
			{children}
		</div>
	);
}
