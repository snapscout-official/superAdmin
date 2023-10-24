import React from 'react';
import { useDispatch } from 'react-redux';
import { useProduct } from '../context/ProductsHooks';
import { setProdInfo } from '../redux/features/product/productSlice';
import Container from '../layouts/Index';
import Info from '../assets/images/Info.png';
import { Trash2 } from 'lucide-react';
import Product from './Product';
import DeleteModal from '../components/modal/Delete';

export default function Products() {
	const dispatch = useDispatch();
	const {
		catData,
		info,
		isNewProduct,
		textFieldRef,
		toggleProduct,
		onSubmit,
		handleClose,
		filteredRows,
		isView,
		selectedRow,
		isDeleteItem,
		searchTermRef,
		handleChange,
		handleDelete,
		toggleClose,
		toggleDelete,
		toggleView,
	} = useProduct();
	return (
		<Container>
			<div className='flex justify-between items-center'>
				<h1 className='text-4xl font-bold'>Product Catalogue</h1>
				<img src={Info} alt='Info Icon' />
			</div>
			{isNewProduct ? (
				<form onSubmit={onSubmit}>
					<div className='flex gap-5 items-center'>
						<div className='px-5 py-5 bg-[#D9D9D9] rounded-lg'>
							<h1 className='font-bold text-xl'>Add New Product</h1>
						</div>
						<button type='submit' className='px-5 py-5 bg-[#30A18D] rounded-lg'>
							<h1 className='font-bold text-xl text-white'>Save Changes</h1>
						</button>
						<button
							type='button'
							onClick={handleClose}
							className='px-5 py-5 bg-red-500 rounded-lg'>
							<h1 className='font-bold text-white text-xl'>Close</h1>
						</button>
					</div>
					<div className='flex items-center gap-3 pt-5'>
						<div className='w-1/2'>
							<input
								ref={textFieldRef}
								type='text'
								className='w-full p-5 rounded-lg'
								placeholder='Product Name'
								required
							/>
						</div>
						<div className='w-1/2'>
							{info.selectedParent == null && (
								<select
									className='w-full py-5 rounded-lg overflow-y-auto max-h-full max-w-full'
									onChange={(event) => {
										dispatch(
											setProdInfo({ selectedParent: event.target.value })
										);
									}}>
									<option value=''>Choose Parent Category</option>
									{catData.categories.map((parent) => (
										<option value={parent.parent_name} key={parent.parent_name}>
											{parent.parent_name} (Parent Category){' '}
										</option>
									))}
									required
								</select>
							)}
							{info.selectedParent != null && info.selectedSub == null && (
								<select
									className='w-full py-5 rounded-lg overflow-y-auto max-h-full max-w-full '
									onChange={(event) => {
										dispatch(setProdInfo({ selectedSub: event.target.value }));
									}}>
									<option value=''>Choose Sub Category</option>
									{catData.subCategories
										.filter((sub) => sub.parent_category == info.selectedParent)
										.map((sub) => (
											<option value={sub.sub_id} key={sub.sub_id}>
												{sub.sub_name} (Sub Category)
											</option>
										))}
									required
								</select>
							)}
							{info.selectedParent != null && info.selectedSub != null && (
								<select
									className='w-full py-5 rounded-lg overflow-y-auto max-h-full max-w-full '
									onChange={(event) => {
										dispatch(
											setProdInfo({ selectedThird: event.target.value })
										);
									}}>
									<option value=''>Choose Third Category</option>
									{catData.thirdCategories
										.filter((third) => third.sub_id == info.selectedSub)
										.map((third) => (
											<option value={third.third_id} key={third.third_id}>
												{third.third_name} (Third Category)
											</option>
										))}
									required
								</select>
							)}
						</div>
					</div>
					<div className='flex items-center py-2'>
						<div className='grow border-t-2 border-black mr-2'></div>
						<h1>Pagination Pagination Pagination</h1>
					</div>
				</form>
			) : (
				<div className='flex justify-between items-end py-5'>
					<button
						onClick={toggleProduct}
						className='px-10 py-5 bg-[#546887] text-white rounded-lg'>
						<h1 className='font-bold text-xl'>Add New Product</h1>
					</button>
					<div>pagination</div>
				</div>
			)}
			<div className='w-full pb-5'>
				<input
					type='text'
					className='w-full p-5 rounded-lg'
					placeholder='Search Product'
					defaultValue={searchTermRef.current}
					onChange={handleChange}
				/>
			</div>
			<div className='bg-[#EEEEEE] overflow-y-auto h-full'>
				<div className='flex'>
					<table className='w-full mx-3'>
						<thead>
							<tr className='text-left '>
								<th className='py-5 w-1/10'>Product Code</th>
								<th className='py-5 w-1/2'>Product Name</th>
								<th className='py-5 w-3/10'>Category</th>
								<th className='py-5 w-1/10'>Action</th>
							</tr>
						</thead>
						<tbody>
							{filteredRows?.map((row) => (
								<tr key={row.id}>
									<td className='py-3 w-1/10'>{row.id}</td>
									<td className='py-3 w-1/2'>
										<h1 className='truncate max-w-md'>{row.productName}</h1>
									</td>
									<td className='py-3 w-3/10'>{row.category}</td>
									<td className='py-3 w-1/10'>
										<div className='flex gap-2'>
											<button onClick={() => toggleView(row)}>
												<h1 className='rounded-full bg-[#4EA993] px-4 py-2 text-white font-bold'>
													View
												</h1>
											</button>
											<button onClick={() => handleDelete(row)}>
												<Trash2 color='red' />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			{isDeleteItem && (
				<DeleteModal
					message='product'
					toggleDelete={toggleDelete}
					toggleClose={toggleClose}
				/>
			)}
			{isView && <Product toggleView={toggleView} product={selectedRow} />}
		</Container>
	);
}
