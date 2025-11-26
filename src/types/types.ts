export interface Movie {
	id:number;
	name:string;
	year:Date;
	imageUrl:string;
	genre?:string[];
	description?:string;
	raiting:number
}

export interface Genres {
	id:number;
	name:string;
}