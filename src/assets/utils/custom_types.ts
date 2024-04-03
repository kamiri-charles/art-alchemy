export type UserType = {
	id: string;
	username: string;
	firstname: string;
	lastname: string;
	profilePicture: string;
	email: string;
	password: string;
	isArtist: boolean;
	isAdmin: boolean;
	[key: string]: string | boolean;
};

export type ArtType = {
	id: string;
	title: string;
	imageData: string[];
	description: string;
	tags: string[];
	category: string;
	price: number;
	owner: string;
	stars: number;
	comments: string[];
	views: number;
};

export type EditablesType = {
	firstname: boolean;
	lastname: boolean;
	email: boolean;
	[key: string]: boolean;
};

export type CartType = {
	id: string;
	userId: string;
	artIds: string[];
};

export type OrderType = {
	id: string;
	userId: string;
	location: string;
	cardNumber: string;
	csv: string;
	email: string;
	phone: string;
	items: string[];
};
