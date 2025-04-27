'use client';
import { Todo } from '@/types/todos';
import React, { useState } from 'react';
import TodoModal from './TodoModal';
import CreateTodo from './CreateTodo';

type MainContentProps = {
	selectedMenu: 'all' | 'incomplete' | 'complete' | 'create';
	onSelectedMenu: (menu: 'all' | 'incomplete' | 'complete' | 'create') => void;
};

// descriptionを指定文字数で省略する関数
const truncateText = (text: string, maxLength: number) => {
	return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

// 仮のデータ
export const todos: Todo[] = [
	{
		id: '1',
		title: 'TypeScriptの勉強',
		description: '型の勉強を進める',
		status: 'incomplete',
	},
	{
		id: '2',
		title: 'Next.jsでアプリ作成',
		description: 'App Routerを使って練習する',
		status: 'incomplete',
	},
	{
		id: '3',
		title: 'TailwindCSSを学習',
		description: 'ユーティリティクラスを理解する',
		status: 'complete',
	},
];

const MainContent = ({ selectedMenu, onSelectedMenu }: MainContentProps) => {
	const filteredTodos = todos.filter((todo) => {
		if (selectedMenu === 'all') return true;
		return todo.status === selectedMenu;
	});

	const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = (todo: Todo) => {
		setSelectedTodo(todo);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setSelectedTodo(null);
		setIsModalOpen(false);
	};

	return (
		<main>
			{selectedMenu === 'create' ? (
				<CreateTodo onSelectedMenu={onSelectedMenu} />
			) : (
				<ul className="flex flex-wrap gap-4 p-6">
					{filteredTodos.map((todo) => {
						const statusColor =
							todo.status === 'complete'
								? 'bg-green-100 text-green-800'
								: 'bg-red-100 text-red-800';

						return (
							<li
								key={todo.id}
								className="w-60 rounded-lg bg-yellow-100 p-4 shadow-md transition hover:bg-yellow-100"
								onClick={() => openModal(todo)}
							>
								<div className="justify-between items-start">
									<h2 className="text-lg font-bold">{todo.title}</h2>
									<p className="mt-2 text-sm text-gray-600">{truncateText(todo.description, 10)}</p>
									<span
										className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${statusColor}`}
									>
										{todo.status === 'complete' ? '完了' : '未完了'}
									</span>
								</div>
							</li>
						);
					})}
				</ul>
			)}

			{/* モーダルの表示 */}
			{isModalOpen && selectedTodo && <TodoModal todo={selectedTodo} closeModal={closeModal} />}
		</main>
	);
};

export default MainContent;
