'use client';
import { Todo } from '@/types/todos';
import React, { useEffect, useState } from 'react';
import TodoModal from './TodoModal';
import CreateTodo from './CreateTodo';
import { getTodos } from '@/lib/api/todos';
import TodoList from './TodoList';

type MainContentProps = {
	selectedMenu: 'all' | 'incomplete' | 'inprogress' | 'complete' | 'create';
	onSelectedMenu: (menu: 'all' | 'incomplete' | 'inprogress' | 'complete' | 'create') => void;
};

const MainContent = ({ selectedMenu, onSelectedMenu }: MainContentProps) => {
	const [todos, setTodos] = useState<Todo[]>([]);

	const fetchTodos = async () => {
		try {
			const data = await getTodos();
			setTodos(data);
		} catch (error) {
			console.error('TODOの取得に失敗：', error);
		}
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	const handleTodoAdded = async () => {
		await fetchTodos();
	};

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
				<CreateTodo onSelectedMenu={onSelectedMenu} handleTodoAdded={handleTodoAdded} />
			) : (
				<TodoList filteredTodos={filteredTodos} openModal={openModal} />
			)}

			{/* モーダルの表示 */}
			{isModalOpen && selectedTodo && (
				<TodoModal todo={selectedTodo} closeModal={closeModal} handleTodoAdded={handleTodoAdded} />
			)}
		</main>
	);
};

export default MainContent;
