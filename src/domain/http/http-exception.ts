export class HTTPException {
  error?: string;
  message?: string;
  status_code?: number;
  timestamp?: Date;
  path?: string;

  constructor(exception: IHTTPException) {
    this.error = exception.error;
    this.message = exception.message || "No message available";
    this.status_code = exception.status_code || 400;
    this.timestamp = new Date();
    this.path = exception.path || "No path available";
  }
}

export interface IHTTPException {
  error?: string;
  message?: string;
  status_code?: number;
  timestamp?: Date;
  path?: string;
}
