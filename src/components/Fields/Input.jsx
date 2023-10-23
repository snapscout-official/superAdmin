import React from 'react';

export default function Input({ type, style, label, inputRef }) {
	return (
		<div className='p-5'>
			<div className='flex flex-col'>
				<label className='label'>{label}</label>
				<input ref={inputRef} type={type} className={style} required />
			</div>
		</div>
	);
}
