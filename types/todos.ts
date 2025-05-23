export type Todo = {
	id: number;
	title: string;
	description: string;
	status: 'incomplete' | 'inprogress' | 'complete';
};
