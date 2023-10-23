import React from 'react';
import Container from '../layouts/Index';
import Header from '../layouts/Dashboard/Header';
import Calendar from '../layouts/Dashboard/Calendar';
import Merchant from '../layouts/Dashboard/Merchant';
import Agency from '../layouts/Dashboard/Agency';

export default function Dashboard() {
	return (
		<Container>
			<Header />
			<div className='w-full h-full flex pt-5'>
				<div className='w-1/4 pr-5'>
					<Calendar />
				</div>
				<div className='w-3/4 h-full flex flex-col items-stretch gap-2 '>
					<Merchant />
					<Agency />
				</div>
			</div>
		</Container>
	);
}
