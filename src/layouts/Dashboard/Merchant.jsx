import React, { useState } from 'react';
import Chart from '../../components/Chart';
import { data } from '../../data/Merchant';

export default function Merchant() {
	useState;
	const [userData, setUserData] = useState({
		labels: data.map((data) => data.month),
		datasets: [
			{
				label: 'Merchant Users',
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
