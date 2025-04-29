import { supabase } from '../supabaseClient';

// コメントの取得
export const getComments = async (todoId: number) => {
	const { data, error } = await supabase
		.from('comments')
		.select('*')
		.eq('todo_id', todoId)
		.order('created_at', { ascending: true });

	if (error) {
		console.error('コメントの取得に失敗：', error.message);
		return [];
	}

	return data;
};

// コメントの追加
export const addComment = async (todoId: number, text: string) => {
	const { data, error } = await supabase
		.from('comments')
		.insert([{ todo_id: todoId, text }])
		.select();

	if (error) {
		console.error('コメントの追加に失敗：', error.message);
		return null;
	}

	return data;
};
