'use client';
import { useState } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';

type MenuType = 'all' | 'incomplete' | 'complete' | 'create';

export default function Home() {
	const [selectedMenu, setSelectedMenu] = useState<MenuType>('all');

	return (
		<>
			<Sidebar selectedMenu={selectedMenu} onSelectedMenu={setSelectedMenu} />
			<div className="flex flex-col flex-1">
				<Header onSelectedMenu={setSelectedMenu} />
				<MainContent selectedMenu={selectedMenu} onSelectedMenu={setSelectedMenu} />
			</div>
		</>
	);
}
