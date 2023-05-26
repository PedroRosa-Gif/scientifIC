class Notificator {
	notifications: string[];

	constructor() {
		this.notifications = [];
	}

	notificate(message: string): void {
		this.notifications.push(message);
	}

	getNotifications(): string[] {
		return this.notifications;
	}

	isValidOperation(): boolean {
		return this.notifications.length === 0;
	}
}

export default Notificator;