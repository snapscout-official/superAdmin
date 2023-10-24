import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	setProdInfo,
	setProductData,
} from '../redux/features/product/productSlice';
import { useCategory } from './CategoryHooks';
import useAuth from './useAuth';

export const useProduct = () => {
	const data = useSelector((state) => state.product.productData);
	const catData = useSelector((state) => state.category.categoryData);
	const info = useSelector((state) => state.product.info);
	const dispatch = useDispatch();
	const { instance } = useAuth();
	const url = import.meta.env.VITE_URL;
	const [isNewProduct, setIsNewProduct] = useState(false);
	const textFieldRef = useRef(null);
	const [rows, setRows] = useState([]);
	const [filteredRows, setFilteredRows] = useState([]);
	const [isView, setIsView] = useState(false);
	const [selectedRow, setSelectedRow] = useState(null);
	const searchTermRef = useRef('');
	const [isDeleteItem, setIsDeleteItem] = useState(false);
	const [product, setProduct] = useState();
	const toggleProduct = () => {
		setIsNewProduct(!isNewProduct);
	};
	const { fetchCategory } = useCategory();

	const fetchProducts = async () => {
		try {
			const response = await instance.get(`${url}products`);
			dispatch(
				setProductData({
					products: response.data.data,
				})
			);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchProducts();
		fetchCategory();
	}, [isNewProduct, isDeleteItem]);

	const onSubmit = (e) => {
		e.preventDefault();
		let formData;
		if (info.selectedThird == null) {
			formData = {
				product_name: textFieldRef.current.value,
				description: 'Your product description',
				subCategoryId: info.selectedSub,
			};
			console.log(formData);
		} else {
			formData = {
				product_name: textFieldRef.current.value,
				description: 'Your product description',
				thirdCategoryId: info.selectedThird,
			};
		}
		console.log(info);
		if (info.selectedParent === null) {
			alert('Please select a parent category.');
			return;
		} else if (info.selectedSub === null) {
			alert('Please at least select a sub category.');
			return;
		}
		console.log(url + 'add-product');
		instance
			.post(`${url}add-product`, formData)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.error('There was an error!', error);
			});

		textFieldRef.current.value = '';
		dispatch(
			setProdInfo({
				selectedParent: null,
				selectedSub: null,
				selectedThird: null,
			})
		);
		setIsNewProduct(false);
	};

	const handleClose = () => {
		textFieldRef.current.value = '';

		dispatch(
			setProdInfo({
				selectedParent: null,
				selectedSub: null,
				selectedThird: null,
			})
		);
		setIsNewProduct(false);
	};

	const dataProcessor = () => {
		const newRows = [];
		Object.values(data.products).map((obj) => {
			newRows.push({
				id: obj.product_id,
				productName: obj.product_name,
				category: obj.third_name ? obj.third_name : obj.sub_name,
			});
		});

		return newRows;
	};
	useEffect(() => {
		const newRows = dataProcessor();
		setRows(newRows);
		setFilteredRows(newRows);
	}, [data]);

	const handleChange = (e) => {
		searchTermRef.current = e.target.value;
		const filtered = rows.filter((row) =>
			(row.category.toLowerCase() + row.productName.toLowerCase()).includes(
				searchTermRef.current.toLowerCase()
			)
		);
		setFilteredRows(filtered);
	};

	const deleteProduct = async (productId) => {
		const endpoint = `${url}product/${productId}`;
		instance
			.delete(endpoint)
			.then((res) => {
				console.log(res.data.message);
			})
			.catch((err) => {
				console.log(err);
				throw err;
			});
		setIsDeleteItem(false);
	};
	const handleDelete = (row) => {
		setIsDeleteItem(true);
		setProduct(row);
	};
	const toggleClose = () => {
		setIsDeleteItem(false);
	};
	const toggleDelete = async () => {
		let prod = product;
		try {
			await deleteProduct(prod.id);
		} catch (error) {
			console.error('There was an error deleting the product:', error.message);
		}
	};
	const toggleView = (row) => {
		setSelectedRow(row);
		setIsView(!isView);
	};
	return {
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
	};
};
