import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function Modal({ message, toggleDelete, toggleClose }) {
	const handleDelete = () => {
		toggleDelete();
		toggleClose();
	};
	return (
		<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
			{/* Overlay */}
			<div className='absolute w-full h-full bg-gray-800 opacity-50'></div>

			{/* Modal */}
			<div className='bg-white rounded-2xl p-20 relative flex flex-col items-center gap-5 text-xl'>
				<div className='flex items-center'>
					<ShieldAlert size={40} color='red' />
					<h1>Are you sure to delete this {message}</h1>
				</div>
				<div className='flex gap-3'>
					<button
						onClick={handleDelete}
						className='w-1/2 bg-red-500 px-5 py-3 rounded-2xl '>
						<h1 className='text-white font-bold'>Yes</h1>
					</button>
					<button
						onClick={toggleClose}
						className='w-1/2 bg-gray-200 px-5 py-3 rounded-2xl '>
						<h1 className='text-black font-bold'>No</h1>
					</button>
				</div>
			</div>
		</div>
	);
}
