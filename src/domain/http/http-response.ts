export interface HTTPResponse {
  message?: string | any;
  result?: any;
  status_code?: number;
  code?: number;
  stack?: any;
  cause?: any;
  path?: string;
  timestamp?: string;
}
