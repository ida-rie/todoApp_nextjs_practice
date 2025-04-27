'use client';
import { Comments } from '@/types/comment';
import React, { useState } from 'react';

type CommentSectionProps = {
	comments: Comments[];
	addComment: (text: string) => void;
};

const CommentSection = ({ comments, addComment }: CommentSectionProps) => {
	const [newComment, setNewComment] = useState('');

	const handleAddComment = () => {
		if (newComment.trim()) {
			addComment(newComment);
			setNewComment('');
		}
	};
	return (
		<div className="space-y-4 pt-10">
			<h2 className="text-xl font-bold">コメント</h2>
			<div className="flex gap-2">
				<input
					type="text"
					className="flex-1 rounded border p-1"
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					placeholder="コメントを入力..."
				/>
				<button
					className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
					onClick={handleAddComment}
				>
					追加
				</button>
			</div>
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
