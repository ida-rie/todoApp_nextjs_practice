import { supabase } from '../supabaseClient';

// TODOの取得
export const getTodos = async () => {
	const { data, error } = await supabase
		.from('todos')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) {
		console.error('TODOの取得に失敗：', error.message);
		return [];
	}
	return data;
};

// TODOの追加
export const addTodo = async (title: string, description: string) => {
	const { data, error } = await supabase
		.from('todos')
		.insert([{ title, description, status: 'incomplete' }]);

	if (error) {
		console.error('TODOの追加に失敗：', error.message);
		return [];
	}
	return data;
};

// TODOの更新
export const updateTodo = async (
	id: number,
	title: string,
	description: string,
	status: string
) => {
	const { data, error } = await supabase
		.from('todos')
		.update({ title, description, status })
		.eq('id', id);

	if (error) {
		console.error('TODOの更新に失敗：', error.message);
		return null;
	}

	return data;
};

// TODOの削除
export const deleteTodo = async (id: number) => {
	const { data, error } = await supabase.from('todos').delete().eq('id', id);

	if (error) {
		console.error('TODOの削除に失敗：', error.message);
		return null;
	}

	return data;
};
