'use client';
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addTodo } from '@/lib/api/todos';

// バリデーションスキーマ
const createTodoSchema = z.object({
	title: z.string().min(1, 'タイトルは入力必須です').max(255, '255文字以内で入力してください'),
	description: z.string().nullable().optional(),
});

type createTodoFormData = z.infer<typeof createTodoSchema>;

type CreateTodoProps = {
	onSelectedMenu: (menu: 'all' | 'incomplete' | 'complete' | 'create') => void;
	handleTodoAdded: () => void;
};

const CreateTodo = ({ onSelectedMenu, handleTodoAdded }: CreateTodoProps) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<createTodoFormData>({ resolver: zodResolver(createTodoSchema) });

	// TODOの作成処理
	const onSubmit = async (data: createTodoFormData) => {
		try {
			await addTodo(data.title, data.description as string);
			alert('TODOを追加しました');
			handleTodoAdded();
		} catch (error) {
			console.error('TODOの追加に失敗：', error);
			alert('TODOの追加を失敗しました');
		} finally {
			reset();
			onSelectedMenu('all');
		}
	};

	return (
		<div className="p-6 max-w-lg max-auto">
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
