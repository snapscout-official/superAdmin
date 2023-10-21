import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Login';
import Dashboard from './pages/Dashboard';
// import Category from './components/Category';
// import Product from './components/Product';
// import Settings from './components/Settings';
// import NotFound from './components/NotFound';

export default function App() {
	return (
		<main className='h-screen w-screen'>
			<Routes>
				<Route path='/' element={<Landing />} />
				<Route path='/dashboard' element={<Dashboard />} />
				{/* <Route path='/category' element={<Category />} />
				<Route path='/product' element={<Product />} />
				<Route path='/settings' element={<Settings />} />
				<Route path='*' element={<NotFound />} /> */}
			</Routes>
		</main>
	);
}
