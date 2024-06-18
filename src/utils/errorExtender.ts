
export class Unauthorized extends Error {
    constructor(public message: string) {
        super(message);
    }
}
  
export class Forbidden extends Error {
    constructor(public message: string) {
        super(message);
    }
}