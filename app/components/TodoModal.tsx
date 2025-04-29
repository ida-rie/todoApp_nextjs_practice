'use client';

import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteTodo, updateTodo } from '@/lib/api/todos';
import { Todo } from '@/types/todos';
import CommentSection from './CommentSection';

// バリデーションスキーマ
const editTodoSchema = z.object({
	title: z.string().min(1, 'タイトルは入力必須です').max(255, '255文字以内で入力してください'),
	description: z.string().nullable().optional(),
	status: z.enum(['incomplete', 'inprogress', 'complete'], {
		errorMap: () => ({ message: 'ステータスを選択してください' }),
	}),
});

type editTodoFormData = z.infer<typeof editTodoSchema>;

type TodoModalProps = {
	todo: Todo | null;
	closeModal: () => void;
	handleTodoAdded: () => void;
};

const TodoModal = ({ todo, closeModal, handleTodoAdded }: TodoModalProps) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<editTodoFormData>({
		resolver: zodResolver(editTodoSchema),
	});

	useEffect(() => {
		reset({
			title: todo!.title,
			description: todo?.description,
			status: todo!.status,
		});
	}, [todo, reset]);

	const [isEditing, setIsEditing] = useState(false);

	// TODOの編集保存処理
	const onSubmit = async (data: editTodoFormData) => {
		try {
			await updateTodo(todo!.id, data.title, data.description as string, data.status);
			alert('TODOの更新しました');
			handleTodoAdded();
		} catch (error) {
			console.error('TODOの更新に失敗：', error);
			alert('TODOの更新を失敗しました');
		} finally {
			setIsEditing(false);
			closeModal();
		}
	};

	// TODOの削除処理
	const handleDelete = async () => {
		try {
			await deleteTodo(todo!.id);
			alert('TODOを削除しました');
			handleTodoAdded();
		} catch (error) {
			console.error('TODOの削除に失敗：', error);
			alert('TODOの削除を失敗しました');
		} finally {
			closeModal();
		}
	};

	return (
		<div className="fixed inset-0 flex justify-center items-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg w-2/3 shadow-lg">
				{isEditing ? (
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<input
							{...register('title')}
							type="text"
							className="w-full rounded-md border p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="タイトル"
						/>
						{errors.title && <p className="text-red-500">{errors.title.message}</p>}
						<textarea
							{...register('description')}
							className="w-full rounded-md border p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="詳細"
						/>
						<select
							{...register('status')}
							className="w-full rounded-md border p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="incomplete">未完了</option>
							<option value="inprogress">進行中</option>
							<option value="complete">完了</option>
						</select>
						{errors.status && <p className="text-red-500">{errors.status.message}</p>}
						<div className="flex gap-4 mt-6">
							<button
								type="submit"
								className="rounded-md bg-blue-500 px-6 py-1 text-white hover:bg-blue-600 transition"
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
					</form>
				) : (
					<div className="space-y-4">
						<h1 className="text-2xl font-bold">{todo!.title}</h1>
						<p className="text-lg text-gray-700">{todo?.description}</p>
						<span
							className={`inline-block rounded-full px-4 py-1 text-sm font-semibold ${
								todo!.status === 'complete'
									? 'bg-green-100 text-green-800'
									: todo!.status === 'incomplete'
									? 'bg-red-100 text-red-800'
									: 'bg-blue-100 text-blue-800'
							}`}
						>
							{todo!.status === 'complete'
								? '完了'
								: todo!.status === 'incomplete'
								? '未完了'
								: '進行中'}
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
				<CommentSection todoId={todo!.id} />
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
