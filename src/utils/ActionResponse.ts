class ActionResponse {
  statusCode: number;
  message?: string | string[];
  error?: string;
  constructor(statusCode, message?,error?) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}

export default ActionResponse;
