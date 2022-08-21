export interface HttpAdapter {
  get<T>(url: string, options?: any): Promise<T>;
  post<T>(url: string, body: any, options?: any): Promise<T>;
  put<T>(url: string, body: any, options?: any): Promise<T>;
  delete<T>(url: string, options?: any): Promise<T>;
}
