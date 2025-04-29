import React from 'react';
import { Todo } from '@/types/todos';

type TodoListProps = {
	filteredTodos: Todo[];
	openModal: (todo: Todo) => void;
};

const TodoList = ({ filteredTodos, openModal }: TodoListProps) => {
	return (
		<ul className="flex flex-wrap gap-4 p-6">
			{filteredTodos.map((todo) => {
				const statusColor =
					todo.status === 'complete'
						? 'bg-green-100 text-green-800'
						: todo.status === 'incomplete'
						? 'bg-red-100 text-red-800'
						: 'bg-blue-100 text-blue-800';

				return (
					<li
						key={todo.id}
						className="w-60 rounded-lg bg-yellow-100 p-4 shadow-md transition hover:bg-yellow-200 cursor-pointer"
						onClick={() => openModal(todo)}
					>
						<div className="justify-between items-start">
							<h2 className="text-lg font-bold">{todo.title}</h2>
							<p className="mt-2 text-sm text-gray-600">{todo.description}</p>
							<span
								className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${statusColor}`}
							>
								{todo.status === 'complete'
									? '完了'
									: todo.status === 'incomplete'
									? '未完了'
									: '進行中'}
							</span>
						</div>
					</li>
				);
			})}
		</ul>
	);
};

export default TodoList;
