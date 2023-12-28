export enum OrderBy {
	createdAt = 'createdAt',
	rating = 'rating',
	metacritic = 'metacritic',
	released = 'released',
	name = 'name',
}

export const OrderByDisplay: { [key in OrderBy]: string } = {
	[OrderBy.createdAt]: 'Date Added',
	[OrderBy.rating]: 'Popularity',
	[OrderBy.metacritic]: 'Rating',
	[OrderBy.released]: 'Release Date',
	[OrderBy.name]: 'Name',
}
