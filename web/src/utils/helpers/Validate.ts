import Notificator from "./Notificator";

class Validate extends Notificator {
	validateRequired(value: any | undefined, message: string): string {
		if (!value || (typeof(value) === 'string' && value.length <= 0)) {
				this.notificate(message);
				return message;
		}

		return "";
	}

	validateString(value: string, maxLength: number, message: string, required?: string, minLenght?: number): string {
		if (required && value.length <= 0) {
			this.notificate(required);
			return required;
		}

		// Se o campo não é requerido e é vazio, passa
		if (!(!required && value.length <= 0) && ((minLenght && value.length < minLenght) || value.length > maxLength)) {
			this.notificate(message);
			return message;
		};

		return "";
	}

	validateNumber(value: number, message: string, min?: number, max?: number, required?: string): string {
		if (required && (isNaN(value) || value === 0)) {
			this.notificate(required);
			return required;
		}

		if (min) {
				if (value < min) {
					this.notificate(message);
					return message;
				}
		}

		if (max) {
				if (value > max) {
					this.notificate(message);
					return message;
				}
		}

		return "";
	}
}

export default Validate;