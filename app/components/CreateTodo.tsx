'use client';
import React, { useState } from 'react';

type HCreateTodoProps = {
	onSelectedMenu: (menu: 'all' | 'incomplete' | 'complete' | 'create') => void;
};

const CreateTodo = ({ onSelectedMenu }: HCreateTodoProps) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [status, setStatus] = useState<'complete' | 'incomplete'>('incomplete');

	// TODOの作成処理
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setTitle('');
		setDescription('');
		setStatus('incomplete');
	};

	return (
		<div className="p-6 max-w-lg max-auto">
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="text"
					className="w-full rounded-md border p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="タイトル"
				/>
				<textarea
					className="w-full rounded-md border p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="詳細"
				/>
				<select
					className="w-full rounded-md border p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={status}
					onChange={(e) => setStatus(e.target.value as 'complete' | 'incomplete')}
				>
					<option value="incomplete">未完了</option>
					<option value="complete">完了</option>
				</select>
				<div className="flex gap-4 mt-6">
					<button
						type="submit"
						className="rounded-md bg-blue-500 px-6 py-1 text-white hover:bg-blue-600 transition"
					>
						作成
					</button>
					<button
						className="rounded-md bg-gray-400 px-6 py-1 text-white hover:bg-gray-500 transition"
						onClick={() => onSelectedMenu('all')}
					>
						キャンセル
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateTodo;
