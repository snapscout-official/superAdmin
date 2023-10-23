import React from 'react';
import Notifications from './Notifications';
export default function Header() {
	return (
		<div className='flex w-full h-2/5 bg-white'>
			<div className='w-1/3 h-full'>
				<h1 className='font-bold text-xl px-5 py-2'>Welcome Back, Gio</h1>
				<h3 className='font-bold pb-2 px-5'>Here’s where you left off...</h3>
				<div className='ml-5 h-1/2 bg-[#F5F5F5]'></div>
			</div>
			<div className='w-2/3 h-full'>
				<Notifications />
			</div>
		</div>
	);
}
