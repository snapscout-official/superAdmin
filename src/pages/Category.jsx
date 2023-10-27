import React from 'react';
import Container from '../layouts/Index';
import Info from '../assets/images/Info.png';
import { setInfo } from '../redux/features/category/categorySlice';
import { useCategory } from '../context/CategoryHooks';
import { useDispatch } from 'react-redux';
import DeleteModal from '../components/modal/Delete';
import { Trash2 } from 'lucide-react';
import Spinner from '../components/Spinner';

export default function Category() {
	const dispatch = useDispatch();
	const {
		data,
		info,
		isNewCategory,
		isLoading,
		toggleCategory,
		onSubmit,
		handleUndo,
		fieldRef,
		searchTermRef,
		filteredRows,
		isDeleteItem,
		handleChange,
		handleDelete,
		handleClose,
		toggleDelete,
	} = useCategory();
	return (
		<Container>
			{isDeleteItem && (
				<DeleteModal
					message='category'
					toggleDelete={toggleDelete}
					toggleClose={handleClose}
				/>
			)}
			{isLoading && <Spinner />}
			<div className='flex justify-between items-center'>
				<h1 className='text-4xl font-bold'>Categories Catalogue</h1>
				<img src={Info} alt='Info Icon' />
			</div>
			{isNewCategory ? (
				<form onSubmit={onSubmit}>
					<div className='flex gap-5 items-center'>
						<div className='px-5 py-5 bg-[#D9D9D9] rounded-lg'>
							<h1 className='font-bold text-xl'>Add New Category</h1>
						</div>
						<button type='submit' className='px-5 py-5 bg-[#30A18D] rounded-lg'>
							<h1 className='font-bold text-white text-xl'>Save Changes</h1>
						</button>
						<button
							onClick={handleUndo}
							className='px-5 py-5 bg-red-500 rounded-lg'>
							<h1 className='font-bold text-white text-xl'>Cancel</h1>
						</button>
					</div>
					<div className='flex items-center gap-3 pt-5'>
						<div className='w-1/2'>
							<input
								ref={fieldRef}
								type='text'
								className='w-full p-5 rounded-lg'
								placeholder='Category Name'
								required
							/>
						</div>
						<div className='w-1/2'>
							{info.selectedType === '' && (
								<select
									className='w-full py-5 rounded-lg overflow-y-auto max-h-full max-w-full '
									value={info.selectedType}
									onChange={(event) => {
										dispatch(setInfo({ selectedType: event.target.value }));
										if (event.target.value === 'Third Category') {
											dispatch(
												setInfo({ selectedThird: fieldRef.current.value })
											);
										} else if (event.target.value === 'Sub Category') {
											dispatch(
												setInfo({ selectedSub: fieldRef.current.value })
											);
										} else if (event.target.value === 'Parent Category') {
											dispatch(
												setInfo({ selectedParent: fieldRef.current.value })
											);
										}
									}}>
									{info.categoryType.map((category, key) => (
										<option className='bg-white' value={category} key={key}>
											{category}
										</option>
									))}
								</select>
							)}

							{info.selectedType === 'Third Category' && (
								<select
									className='w-full py-5 rounded-lg overflow-y-auto max-h-full max-w-full '
									onChange={(event) => {
										dispatch(setInfo({ selectedSub: event.target.value }));
										dispatch(setInfo({ selectedType: 'Third Category' }));
									}}>
									<option value=''>Choose Sub Category</option>
									{data.subCategories.map((subCat) => (
										<option value={subCat.sub_name} key={subCat.sub_id}>
											{subCat.sub_name} (Sub Category)
										</option>
									))}
									required
								</select>
							)}
							{info.selectedType === 'Sub Category' && (
								<select
									className='w-full py-5 rounded-lg overflow-y-auto max-h-full max-w-full'
									onChange={(event) => {
										dispatch(setInfo({ selectedParent: event.target.value }));
										dispatch(setInfo({ selectedType: 'Sub Category' }));
									}}>
									<option value=''>Choose Parent Category</option>
									{data.categories.map((parentCat) => (
										<option
											value={parentCat.parent_name}
											key={parentCat.parent_id}>
											{parentCat.parent_name} (Parent Category)
										</option>
									))}
									required
								</select>
							)}
							{info.selectedType === 'Parent Category' && (
								<select
									className='w-full py-5 rounded-lg overflow-y-auto max-h-full max-w-full '
									value={info.selectedType}
									onChange={() => {
										dispatch(setInfo({ selectedType: 'Parent Category' }));
									}}>
									{info.categoryType.map((category, key) => (
										<option className='bg-white' value={category} key={key}>
											{category}
										</option>
									))}
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
						onClick={toggleCategory}
						className='px-10 py-5 bg-[#546887] text-white rounded-lg'>
						<h1 className='font-bold text-xl'>Add New Category</h1>
					</button>
					<div>pagination</div>
				</div>
			)}
			<div className='w-full pb-5'>
				<input
					type='text'
					className='w-full p-5 rounded-lg'
					placeholder='Search Category'
					defaultValue={searchTermRef.current}
					onChange={handleChange}
				/>
			</div>
			<div className='bg-[#EEEEEE] overflow-y-auto h-full'>
				<div className='flex'>
					<table className='w-full mx-3'>
						<thead>
							<tr className='text-left border-b-black'>
								<th className='py-5'>Category Code</th>
								<th className='py-5'>Parent Category</th>
								<th className='py-5'>Sub Category</th>
								<th className='py-5'>Third Category</th>
								<th className='py-5'>Action</th>
							</tr>
						</thead>
						<tbody>
							{filteredRows?.map((row) => [
								<tr key={row.id}>
									<td className='py-3'>{row.id}</td>
									<td className='py-3'>{row.parentName}</td>
									<td className='py-3'>{row.subName}</td>
									<td className='py-3'>{row.thirdName}</td>
									<td className='py-3'>
										<button onClick={() => handleDelete(row)}>
											<Trash2 color='red' />
										</button>
									</td>
								</tr>,
							])}
						</tbody>
					</table>
				</div>
			</div>
		</Container>
	);
}
