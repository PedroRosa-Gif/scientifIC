import Notificator from "./Notificator";

class Validate extends Notificator {
    constructor() {
        super();
    }

    validateRequired(value: any | undefined, message: string): string {
        if (!value || (typeof(value) === 'string' && value.length <= 0)) {
            this.notificate(message);
            return message;
        }

        return "";
    }

    validateString(value: string, maxLength: number, message: string, minLenght?: number): string {
        if ((minLenght && value.length < minLenght) || value.length > maxLength) {
            this.notificate(message);
            return message;
        };

        return "";
    }

    validateNumber(value: number, message: string, min?: number, max?: number): string {
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