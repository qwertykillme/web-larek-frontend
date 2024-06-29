import { IEvents } from '../events';

export abstract class Model<T> {
	protected events: IEvents;
	constructor(data: Partial<T>, events: IEvents) {
		this.events = events;
		Object.assign(this, data);
	}

	emit(event: string, data?: object) {
		this.events.emit(event, data ?? {});
	}
}
