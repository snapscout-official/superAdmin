import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	setInfo,
	setCategoryData,
} from '../redux/features/category/categorySlice';
import useAuth from './useAuth';

export const useCategory = () => {
	const data = useSelector((state) => state.category.categoryData);
	const info = useSelector((state) => state.category.info);
	const { instance } = useAuth();
	const dispatch = useDispatch();
	const url = import.meta.env.VITE_URL;
	const [rows, setRows] = useState([]);
	const [isNewCategory, setIsNewCategory] = useState(false);
	const fieldRef = useRef(null);
	const [filteredRows, setFilteredRows] = useState([]);
	const [isDeleteItem, setIsDeleteItem] = useState(false);
	const [category, setCategory] = useState();
	const searchTermRef = useRef('');

	const toggleCategory = () => {
		setIsNewCategory(!isNewCategory);
	};

	useEffect(() => {
		instance
			.get(`${url}create-category`)
			.then((res) => {
				dispatch(
					setCategoryData({
						thirdCategories: res.data.thirdCategories,
						subCategories: res.data.subCategories,
						categories: res.data.parentCategories,
					})
				);
			})
			.catch((err) => console.log(err));
	}, [isNewCategory, isDeleteItem]);

	const onSubmit = (event) => {
		event.preventDefault();

		// ... (your existing validation and submission logic here)

		instance
			.post(`${url}create-category`, {
				parentCategory: info.selectedParent,
				subCategory: info.selectedSub,
				thirdCategory: info.selectedThird,
			})
			.then(() => {
				setIsNewCategory(false);
			})
			.catch((err) => console.log(err));
	};

	const handleUndo = () => {
		fieldRef.current.value = '';
		dispatch(
			setInfo({
				selectedType: '',
				selectedParent: '',
				selectedSub: '',
				selectedThird: '',
			})
		);
		setIsNewCategory(false);
	};

	const dataProcessor = () => {
		const newRows = [];

		// First, add all parent categories
		data?.categories?.forEach((parentCat) => {
			newRows.push({
				id: parentCat.parent_id,
				parentName: parentCat.parent_name,
				subName: '',
				thirdName: '',
				catLevel: 1,
			});
		});
		// Then, add sub categories
		data?.subCategories?.forEach((subCat) => {
			newRows.push({
				id: subCat.sub_id,
				parentName: subCat.parent_category,
				subName: subCat.sub_name,
				thirdName: '',
				catLevel: 2,
			});
		});
		data?.thirdCategories?.forEach((thirdCat) => {
			newRows.push({
				id: thirdCat.third_id,
				parentName: thirdCat.parentName,
				subName: thirdCat.subName,
				thirdName: thirdCat.third_name,
				catLevel: 3,
			});
		});
		return newRows;
	};
	useEffect(() => {
		const newRows = dataProcessor(data);
		setRows(newRows);
		setFilteredRows(newRows);
	}, [data]);
	const handleChange = (e) => {
		searchTermRef.current = e.target.value;
		const filtered = rows.filter((row) =>
			(
				row.parentName.toLowerCase() +
				row.subName.toLowerCase() +
				row.thirdName.toLowerCase()
			).includes(searchTermRef.current.toLowerCase())
		);
		setFilteredRows(filtered);
	};

	const CATEGORY_ENDPOINTS = {
		1: `${url}parent-category`,
		2: `${url}sub-category`,
		3: `${url}third-category`,
	};
	const deleteCategory = async (categoryId, categoryLevel) => {
		const endpoint = `${CATEGORY_ENDPOINTS[categoryLevel]}/${categoryId}`;
		console.log(endpoint);
		instance
			.delete(endpoint)
			.then((res) => {
				setIsDeleteItem(false);
			})
			.catch((err) => {
				console.log(err);
				// console.error('Error deleting category:', err.message);
				// Throw error so the calling function (handleDelete) can catch it too
				throw err;
			});
	};
	const handleDelete = (row) => {
		setIsDeleteItem(true);
		setCategory(row);
	};
	const handleClose = () => {
		setIsDeleteItem(false);
	};
	const toggleDelete = async () => {
		let cat = category;
		try {
			await deleteCategory(cat.id, cat.catLevel);
		} catch (error) {
			console.error('There was an error deleting the category:', error.message);
		}
	};
	return {
		data,
		info,
		isNewCategory,
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
	};
};
