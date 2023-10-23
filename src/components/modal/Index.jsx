import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function Modal({ message, toggleClose }) {
	return (
		<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
			{/* Overlay */}
			<div className='absolute w-full h-full bg-gray-800 opacity-50'></div>

			{/* Modal */}
			<div className='bg-white rounded-2xl p-20 relative flex flex-col items-center gap-5 text-xl'>
				<div className='flex items-center'>
					<ShieldAlert size={40} color='red' />
					{message}
				</div>
				<button
					onClick={toggleClose}
					className='w-1/2 bg-green-500 p-3 rounded-2xl '>
					<h1 className='text-white font-bold'> Close</h1>
				</button>
			</div>
		</div>
	);
}
