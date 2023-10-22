import React from 'react';
import NotifIcon from '../assets/images/NotifIcon.png';

export default function Card({ title, description, date, day }) {
	return (
		<div className='bg-[#F8F8F8] pl-8 p-2 flex items-center'>
			<img className='h-8 w-8' src={NotifIcon} alt='Notifications Icon' />
			<div className='flex flex-col pl-5'>
				<h3 className='text-[0.7rem] font-bold'>{title}</h3>
				<h3 className='text-[0.5rem] font-bold'>{description}</h3>
			</div>
		</div>
	);
}
