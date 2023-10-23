import React, { useState } from 'react';
import Input from './Input'; // Adjust the import path if necessary
import { Eye, EyeOff } from 'lucide-react';

export default function PasswordInput({ style, label, inputRef }) {
	const [inputType, setInputType] = useState('password');

	const toggleShowPassword = () => {
		setInputType(inputType === 'password' ? 'text' : 'password');
	};

	return (
		<div className='p-5'>
			<div className='flex flex-col relative'>
				<label className='label'>{label}</label>
				<div className={style}>
					<input
						ref={inputRef}
						type={inputType}
						className={`w-full p-2 py-3 rounded-l-lg `}
						required
					/>
					<button type='button' className='p-2' onClick={toggleShowPassword}>
						{inputType === 'password' ? <EyeOff /> : <Eye />}
					</button>
				</div>
			</div>
		</div>
	);
}
