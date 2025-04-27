import React from 'react';

type SidebarProps = {
	selectedMenu: 'all' | 'incomplete' | 'inprogress' | 'complete' | 'create';
	onSelectedMenu: (menu: 'all' | 'incomplete' | 'inprogress' | 'complete' | 'create') => void;
};

const Sidebar = ({ selectedMenu, onSelectedMenu }: SidebarProps) => {
	return (
		<div className="w-64 bg-white shadow-lg">
			<div className="p-6 text-2xl font-bold">メニュー</div>
			<nav className="flex flex-col gap-4 p-6">
				<button
					className={`text-left hover:text-blue-500 ${
						selectedMenu === 'all' ? 'font-bold text-blue-500' : ''
					}`}
					onClick={() => onSelectedMenu('all')}
				>
					TODO一覧
				</button>
				<button
					className={`text-left hover:text-blue-500 ${
						selectedMenu === 'incomplete' ? 'font-bold text-blue-500' : ''
					}`}
					onClick={() => onSelectedMenu('incomplete')}
				>
					未完了一覧
				</button>
				<button
					className={`text-left hover:text-blue-500 ${
						selectedMenu === 'inprogress' ? 'font-bold text-blue-500' : ''
					}`}
					onClick={() => onSelectedMenu('inprogress')}
				>
					進行中一覧
				</button>
				<button
					className={`text-left hover:text-blue-500 ${
						selectedMenu === 'complete' ? 'font-bold text-blue-500' : ''
					}`}
					onClick={() => onSelectedMenu('complete')}
				>
					完了一覧
				</button>
			</nav>
		</div>
	);
};

export default Sidebar;
