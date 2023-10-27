import React from 'react';
import { ScaleLoader } from 'react-spinners';

export default function Spinner() {
	console.log('Spinner');

	return (
		<div>
			<ScaleLoader color='#000000' size={10} />
		</div>
	);
}
