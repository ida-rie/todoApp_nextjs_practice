'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addComment, getComments } from '@/lib/api/comments';
import { Comments } from '@/types/comment';

// バリデーションスキーマ
const addCommentSchema = z.object({
	text: z.string().max(255, '255文字以内で入力してください'),
});

type addCommentFormData = z.infer<typeof addCommentSchema>;

const CommentSection = ({ todoId }: { todoId: number }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<addCommentFormData>({
		resolver: zodResolver(addCommentSchema),
	});

	const [comments, setComments] = useState<Comments[]>([]);

	const fetchComments = useCallback(async () => {
		try {
			const data = await getComments(todoId);
			if (data) setComments(data);
		} catch (error) {
			console.error('コメントの取得に失敗：', error);
		}
	}, [todoId]);

	useEffect(() => {
		fetchComments();
	}, [fetchComments]);

	const onSubmit = async (data: addCommentFormData) => {
		try {
			const newData = await addComment(todoId, data.text);
			if (!newData || !Array.isArray(newData)) {
				throw new Error('コメントの追加に失敗しました');
			}
			setComments([...comments, ...newData]);
			alert('コメントを追加しました');
		} catch (error) {
			console.error('コメントの追加に失敗：', error);
			alert('コメントの追加を失敗しました');
		} finally {
			reset();
		}
	};

	return (
		<div className="space-y-4 pt-10">
			<h2 className="text-xl font-bold">コメント</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
				<input
					{...register('text')}
					type="text"
					className="flex-1 rounded border p-1"
					placeholder="コメントを入力..."
				/>
				{errors.text && <p className="text-red-500">{errors.text.message}</p>}
				<button
					type="submit"
					className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
				>
					追加
				</button>
			</form>
			<ul className="space-y-2">
				{comments.map((comment) => (
					<li key={comment.id} className="p-2 text-gray-800 bg-gray-100">
						{comment.text}
					</li>
				))}
			</ul>
		</div>
	);
};

export default CommentSection;
