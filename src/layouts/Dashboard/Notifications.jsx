import React from 'react';
import notifData from '../../data/Notification';
import Card from '../../components/Card';

export default function Notifications() {
	return (
		<div className='w-full h-full px-5 pt-2 flex flex-col gap-2'>
			<h1 className='font-bold text-sm'>Notifications</h1>
			<div className='overflow-y-auto h-4/5'>
				{notifData.map((notification, index) => (
					<Card
						key={index}
						title={notification.title}
						description={notification.description}
						date={notification.date}
						day={notification.day}
					/>
				))}
			</div>
		</div>
	);
}
