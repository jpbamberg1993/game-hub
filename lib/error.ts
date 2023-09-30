type Success<T> = { success: true; value: T }
type Failure = { success: false; error: Error }

export type Result<T> = Success<T> | Failure

export class UnknownError extends Error {
	constructor(message: string = 'Unknown error') {
		super(message)
		this.name = 'UnknownError'
	}
}
