import React from 'react';

export default function Button({ style, type, textStyle, message }) {
	return (
		<div className='flex justify-center p-5'>
			<button type={type} className={style}>
				<h1 className={textStyle}> {message}</h1>
			</button>
		</div>
	);
}
