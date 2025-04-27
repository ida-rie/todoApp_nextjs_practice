import React from 'react';

type HeaderProps = {
	onSelectedMenu: (menu: 'all' | 'incomplete' | 'complete' | 'create') => void;
};

const Header = ({ onSelectedMenu }: HeaderProps) => {
	return (
		<header className="flex items-center justify-between bg-white px-6 py-4 shadow">
			<h1 className="text-xl font-bold">Next.jsで作るTODOアプリ</h1>
			<button
				className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
				onClick={() => onSelectedMenu('create')}
			>
				TODO作成
			</button>
		</header>
	);
};

export default Header;
