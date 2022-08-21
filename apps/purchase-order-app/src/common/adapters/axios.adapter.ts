import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  logger = new Logger('AxiosAdapterPurchaseOrder');
  private axios: AxiosInstance = axios;

  async get<T>(url: string, options?: AxiosRequestConfig<any>): Promise<T> {
    try {
      const { data } = await this.axios.get(url, options);

      return data;
    } catch (error) {
      this.errorAxiosInterceptor(error);
    }
  }

  async post<T>(
    url: string,
    body: any,
    options?: AxiosRequestConfig<any>,
  ): Promise<T> {
    try {
      const { data } = await this.axios.post(url, body, options);
      return data;
    } catch (error) {
      this.errorAxiosInterceptor(error);
    }
  }

  async put<T>(
    url: string,
    body: any,
    options?: AxiosRequestConfig<any>,
  ): Promise<T> {
    try {
      const { data } = await this.axios.put(url, body, options);

      return data;
    } catch (error) {
      this.errorAxiosInterceptor(error);
    }
  }

  async patch<T>(
    url: string,
    body?: any,
    options?: AxiosRequestConfig<any>,
  ): Promise<T> {
    try {
      const { data } = await this.axios.patch<T>(url, body, options);
      return data;
    } catch (error) {
      this.errorAxiosInterceptor(error);
    }
  }

  async delete<T>(url: string, options?: AxiosRequestConfig<any>): Promise<T> {
    try {
      const { data } = await this.axios.delete(url, options);
      return data;
    } catch (error) {
      this.errorAxiosInterceptor(error);
    }
  }

  errorAxiosInterceptor(error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response.status === 404) {
        return null;
      }
      this.logger.error(JSON.stringify(error.response?.data));
    }
    this.logger.error('Error calling api');
  }
}
