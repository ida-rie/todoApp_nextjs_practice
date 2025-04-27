'use client';

import { Todo } from '@/types/todos';
import React, { useState } from 'react';

type TodoModalProos = {
	todo: Todo | null;
	closeModal: () => void;
};

const TodoModal = ({ todo, closeModal }: TodoModalProos) => {
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState(todo?.title ?? '');
	const [description, setDescription] = useState(todo?.description ?? '');
	const [status, setStatus] = useState<'complete' | 'incomplete'>('incomplete');

	// TODOの編集保存処理
	const handleSave = () => {
		setIsEditing(false);
		console.log('保存');
	};

	// TODOの削除処理
	const handleDelete = () => {
		console.log('削除');
		closeModal();
	};

	return (
		<div className="fixed inset-0 flex justify-center items-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg w-2/3 shadow-lg">
				{isEditing ? (
					<div className="space-y-4">
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
								className="rounded-md bg-blue-500 px-6 py-1 text-white hover:bg-blue-600 transition"
								onClick={handleSave}
							>
								保存
							</button>
							<button
								className="rounded-md bg-gray-400 px-6 py-1 text-white hover:bg-gray-500 transition"
								onClick={() => setIsEditing(false)}
							>
								キャンセル
							</button>
						</div>
					</div>
				) : (
					<div className="space-y-4">
						<h1 className="text-2xl font-bold">{title}</h1>
						<p className="text-lg text-gray-700">{description}</p>
						<span
							className={`inline-block rounded-full px-4 py-1 text-sm font-semibold ${
								status === 'complete' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
							}`}
						>
							{status === 'complete' ? '完了' : '未完了'}
						</span>
						<div className="flex gap-4 pt-6">
							<button
								className="rounded-md bg-blue-500 px-6 py-1 text-white hover:bg-blue-600 transition"
								onClick={() => setIsEditing(true)}
							>
								編集
							</button>
							<button
								className="rounded-md bg-red-500 px-6 py-1 text-white hover:bg-red-600 transition"
								onClick={handleDelete}
							>
								削除
							</button>
						</div>
					</div>
				)}
				<button
					onClick={closeModal}
					className="mt-4 text-blue-500 hover:text-blue-700 text-sm font-semibold"
				>
					TODO一覧に戻る
				</button>
			</div>
		</div>
	);
};

export default TodoModal;
