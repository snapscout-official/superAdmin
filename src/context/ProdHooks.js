import { useEffect, useRef, useState } from 'react';
import useAuth from './useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { setProductData } from '../redux/features/product/productSlice';
export const useProdSpecs = ({ product }) => {
	const data = useSelector((state) => state.product.productData.product);
	const { instance } = useAuth();
	const dispatch = useDispatch();
	const url = import.meta.env.VITE_URL;
	const [addSpecs, setAddSpecs] = useState(false);
	const [propertyValues, setPropertyValues] = useState(['']);
	const [editProduct, setEditProduct] = useState(false);
	const [isDeleteItem, setIsDeleteItem] = useState(false);
	const [productSpec, setProductSpec] = useState(null);
	const specNameRef = useRef('');
	const handleAddSpecs = () => {
		setAddSpecs(true);
	};
	const handleUndo = () => {
		setAddSpecs(false);
		setPropertyValues(['']);
	};
	const handleProductEdit = () => {
		setEditProduct(!editProduct);
	};

	const fetchProduct = async () => {
		try {
			const response = await instance.get(`${url}product-specs/${product.id}`);
			dispatch(
				setProductData({
					product: response.data,
				})
			);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchProduct();
	}, [addSpecs, isDeleteItem]);

	const toggleButton = () => {
		setPropertyValues([...propertyValues, '']);
	};
	const handleInputChange = (index) => (e) => {
		const newPropertyValues = [...propertyValues];
		newPropertyValues[index] = e.target.value;
		setPropertyValues(newPropertyValues);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = {
			specName: specNameRef.current.value,
			specValues: propertyValues,
		};
		instance
			.post(`${url}add-spec/${product.id}`, formData)
			.then((res) => {})
			.catch((err) => {
				console.log(err);
				// console.error('Error deleting category:', err.message);
				// Throw error so the calling function (handleDelete) can catch it too
				throw err;
			});
		handleUndo();
		setPropertyValues(['']);
		fetchProduct();
	};
	const deleteProductSPecs = async (id) => {
		const endpoint = `${url}product-spec/${data.product_id}/${id}`;
		instance
			.delete(endpoint)
			.then((res) => {})
			.catch((err) => {
				console.log(err);
				throw err;
			});
	};

	const handleDelete = (row) => {
		setIsDeleteItem(true);
		setProductSpec(row);
	};
	const handleClose = () => {
		setIsDeleteItem(false);
	};
	const toggleDelete = async () => {
		let prodSpec = productSpec;
		console.log(prodSpec);
		try {
			await deleteProductSPecs(prodSpec);
			fetchProduct();
		} catch (error) {
			console.error('There was an error deleting the product:', error.message);
		}
	};
	return {
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
	};
};
