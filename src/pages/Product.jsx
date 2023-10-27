import React from 'react';
import { useProdSpecs } from '../context/ProdHooks';
import { Trash2, Pencil, Plus, X } from 'lucide-react';
import DeleteModal from '../components/modal/Delete';

export default function Product({ product, toggleView }) {
	const {
		data,
		addSpecs,
		propertyValues,
		editProduct,
		specNameRef,
		handleAddSpecs,
		handleUndo,
		handleProductEdit,
		toggleButton,
		handleInputChange,
		handleSubmit,
		isDeleteItem,
		handleDelete,
		handleClose,
		toggleDelete,
	} = useProdSpecs({ product });
	return (
		<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center z-50'>
			{/* Overlay */}
			<div className='absolute w-full h-full bg-gray-800 opacity-50'></div>

			{/* Modal */}
			<div className='bg-[#EEEEEE] rounded-2xl px-6 relative  w-2/3'>
				<div className='flex justify-end py-5'>
					<button className='bg-[#666666] p-2 rounded-lg' onClick={toggleView}>
						<X size={40} strokeWidth={3} color='white' />
					</button>
				</div>
				<div className='flex flex-col'>
					{/* content */}
					<div className='flex flex-col gap-2 mb-5'>
						<div className='bg-white border-2 rounded-lg border-black p-2 '>
							<input
								disabled={!editProduct}
								className='w-full truncate text-xl'
								value={product.productName}
								// onChange={(e) => handleProductInfoChange(e, 'name')}
							/>
						</div>
						<div className='bg-white border-2 rounded-lg border-black p-2 '>
							<input
								disabled={!editProduct}
								className='max-w-xl truncate'
								value={product.category}
								// onChange={(e) => handleProductInfoChange(e, 'category')}
							/>
						</div>
					</div>

					<form onSubmit={handleSubmit}>
						<div className='flex justify-between mb-2'>
							<div className='flex gap-3'>
								<button
									type='button'
									onClick={handleAddSpecs}
									className={`p-3 ${
										addSpecs ? 'bg-[#c6c6c6]' : 'bg-[#546887]'
									} rounded-lg`}>
									<h1 className='text-white'>Add Property</h1>
								</button>
								{addSpecs && (
									<>
										<button
											type='submit'
											className='p-3 bg-[#30A18D] rounded-lg'>
											<h1 className='text-white'>Save</h1>
										</button>
										<button
											type='button'
											onClick={handleUndo}
											className='p-3 bg-red-500 rounded-lg'>
											<h1 className='text-white'>Cancel</h1>
										</button>
									</>
								)}
							</div>
							<button
								type='button'
								onClick={handleProductEdit}
								className={`rounded-full p-2 ${
									editProduct ? 'bg-[#c6C6C6]' : 'bg-green-500'
								}`}>
								<Pencil size={30} color={'white'} strokeWidth={2} />
							</button>
						</div>
						{addSpecs && (
							<div className='flex items-center gap-1'>
								<input
									ref={specNameRef}
									type='text'
									className='w-1/3 p-3 rounded-lg'
									placeholder='Property Name'
									required
								/>
								<div className='flex gap-2'>
									<div className='flex gap-2 p-2 max-w-sm overflow-auto'>
										{propertyValues.map((_, index) => (
											<input
												key={index}
												type='text'
												className='p-3 rounded-lg'
												value={propertyValues[index] || ''}
												onChange={handleInputChange(index)}
												placeholder={`Property Value `}
												required
											/>
										))}
									</div>
									<button
										type='button'
										onClick={toggleButton}
										className='p-3 bg-white rounded-lg'>
										<Plus strokeWidth={3} />
									</button>
								</div>
							</div>
						)}
					</form>
					<div className='max-h-60 overflow-y-auto'>
						<table className='w-full'>
							<thead>
								<tr className='text-left '>
									<th className='py-5'>Property Name</th>
									<th className='py-5'>Property Values</th>
									<th className='py-5 '>Action</th>
								</tr>
							</thead>
							<tbody>
								{data?.specs?.map((row) => (
									<tr key={row.code}>
										<td className='py-5'>{row.specs_name}</td>
										<td className='py-5 flex gap-2'>
											{row.values.map((val) => (
												<h1 key={val.id}>{val.spec_value}</h1>
											))}
										</td>
										<td className='py-5'>
											<button
												onClick={() => handleDelete(row.code)}
												className='text-red-500 hover:text-red-700'
												aria-label='Delete'>
												<Trash2 />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					{isDeleteItem && (
						<DeleteModal
							message='Product Specs'
							toggleDelete={toggleDelete}
							toggleClose={handleClose}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
