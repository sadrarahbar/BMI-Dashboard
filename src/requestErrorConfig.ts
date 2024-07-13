﻿import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { message, notification } from 'antd';

// Error handling scheme: Error type
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// Response data format agreed with the backend
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

/*
 * @name Error handling
 * Pro's built-in error handling, you can make your own changes here
 * @doc https://umijs.org/docs/max/request#Configuration
 */
export const errorConfig: RequestConfig = {
  // Error handling: umi@3's error handling scheme.
  errorConfig: {
    // Error throwing
    errorThrower: (res) => {
      const { success, data, errorCode, errorMessage, showType } =
        res as unknown as ResponseStructure;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
        throw error; // Throws self-made errors
      }
    },
    // Error reception and processing
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // Error thrown by our errorThrower.
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(errorMessage);
          }
        }
      } else if (error.response) {
        // Axios error
        // The request was successfully sent and the server also responded with a status code, but the status code is outside the 2xx range
        message.error(`Response status:${error.response.status}`);
      } else if (error.request) {
        // The request was successfully initiated, but no response was received
        // \`error.request\` is an instance of XMLHttpRequest in the browser,
        // and an instance of http.ClientRequest in node.js
        message.error('None response! Please retry.');
      } else {
        // Something went wrong when sending the request
        message.error('Request error, please retry.');
      }
    },
  },

  // Request Interceptor
  requestInterceptors: [
    (config: RequestOptions) => {
      // Intercept request configuration for personalized processing.
      // const url = config?.url?.concat('?token = 123');
      // return { ...config, url };
      return { ...config };
    },
  ],

  // Response Interceptor
  responseInterceptors: [
    (response) => {
      // Intercept response data and perform personalized processing
      const { data } = response as unknown as ResponseStructure;

      if (data?.success === false) {
        message.error('Request failed!');
      }
      return response;
    },
  ],
};
