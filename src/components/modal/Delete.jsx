import React from 'react';

export default function DeleteModal({ message, toggleDelete, toggleClose }) {
	const handleDelete = () => {
		toggleDelete();
		toggleClose();
	};

	return (
		<Modal
			message={`Are you sure to delete this ${message}`}
			toggleClose={toggleClose}>
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
		</Modal>
	);
}
