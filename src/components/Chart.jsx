import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export default function Chart({ data }) {
	const chartOptions = {
		maintainAspectRatio: false,
		responsive: true,
	};
	return (
		<div className='bg-white h-full w-full'>
			<Bar data={data} options={chartOptions} />
		</div>
	);
}
