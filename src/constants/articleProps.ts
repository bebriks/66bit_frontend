export type IArticleProp = {
	summary: string,
	data: string[],
	filterName: string,
	values: (string | string[])[]
}
export const Technology = {
	summary: 'Стек технологий',
	data: [
		'CSharp', 
		'React', 
		'Java', 
		'PHP', 
		'Figma', 
		'Word'
	],
	filterName: 'Stack',
	values: [
		'CSharp', 
		'React', 
		'Java', 
		'PHP', 
		'Figma', 
		'Word'
	],
}
export const Position = {
	summary: 'Должность',
	data: [
		'Backend-разработчик', 
		'Frontend-разработчик', 
		'Аналитик', 
		'Менеджер', 
		'Дизайнер',
		'Fullstack'
	],
	filterName: 'Position',
	values: [
		'Backend',
		'Frontend', 
		'Analyst', 
		'Manager', 
		'Designer',
		'Fullstack'
	],
}
export const Gender = {
	summary: 'Пол',
	data: [
		'Мужчина', 
		'Женщина'
	],
	filterName: 'Gender',
	values: [
		'Male', 
		'Female'
	],
}

export const Contacts = {
	number: '+7 343 290 84 76',
	email: 'info@66bit.ru'
}