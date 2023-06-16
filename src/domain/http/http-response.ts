export interface HTTPResponse {
  message?: string | any;
  result?: any;
  statusCode?: number;
  code?: number;
  stack?: any;
  cause?: any;
}
