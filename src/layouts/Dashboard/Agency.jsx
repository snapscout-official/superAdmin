import React, { useState } from 'react';
import Chart from '../../components/Chart';
import { data } from '../../data/Agency';

export default function Agency() {
	useState;
	const [userData, setUserData] = useState({
		labels: data.map((data) => data.month),
		datasets: [
			{
				label: 'Agency Users',
				data: data.map((data) => data.user),
				backgroundColor: ['#56D98A'],
				borderColor: 'black',
				borderWidth: 2,
			},
		],
	});
	return (
		<div className='flex-grow'>
			<Chart data={userData} />
		</div>
	);
}
