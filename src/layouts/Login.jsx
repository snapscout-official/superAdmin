import React from 'react';
import Layout from './Landing';
import Icon from '../assets/images/Login.png';

export default function Container({ children }) {
	return (
		<Layout>
			<div className='flex flex-col items-center justify-center bg-white rounded-lg py-12 md:py-10 px-3 md:px-5 w-full md:max-w-sm'>
				<img className='w-48 md:w-60' src={Icon} alt='Login Icon' />
				{children}
			</div>
		</Layout>
	);
}
