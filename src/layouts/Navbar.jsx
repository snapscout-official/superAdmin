import React from 'react';
import { Home, LayoutTemplate, Package, Cog } from 'lucide-react';
import SnapLogo from '../assets/images/SnapLogo';
import Button from '../components/Button';

export default function Navbar() {
	return (
		<nav className='flex flex-col gap-14 items-center  p-5'>
			<div className='pt-5 pb-10'>
				{/* <MapPin size={72} /> */}
				<SnapLogo />
			</div>
			<Button route='/dashboard'>
				<Home size={36} />
			</Button>
			<Button route='/category'>
				<LayoutTemplate size={36} />
			</Button>
			<Button route='/product'>
				<Package size={36} />
			</Button>
			<Button route='/settings'>
				<Cog size={36} />
			</Button>
		</nav>
	);
}
