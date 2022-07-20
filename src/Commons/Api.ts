/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Service } from 'typedi'

import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios'
import ExternalApiError from './Errors/ExternalApiError'

interface IApi {
  method: Method,
  endpoint: string,
  body?: any,
  headers?: any,
  otherOptions?: AxiosRequestConfig
}

@Service()
export default abstract class Api {
  protected abstract BaseUrl : string

  /**
   * Default fetcher for entire application
   * @param {string} method HTTP method to be used on request
   * @param {string} url Complet URL for the request: server + endpoint
   * @param {object} body Request body
   * @param {object} headers Request headers
   * @returns Object { ...responsePayload } Any relevant information returned by the API. It will always include a key message (even on errors)
  */
  private async MakeRequest<TResponse>({
    method, endpoint, body = null, headers = null, ...otherOptions
  } : IApi) : Promise<TResponse> {
    const options : AxiosRequestConfig = {
      method,
      headers: headers && { ...headers },
      url: `${this.BaseUrl}${endpoint}`,
      data: body && { ...body },
      ...otherOptions,
    }

    const response = await axios(options)
    return response.data as TResponse
  }

  async Request<TResponse>(payload : IApi) : Promise<TResponse> {
    try {
      return await this.MakeRequest<TResponse>(payload)
    } catch (error) {
      const { response } = error as AxiosError

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new ExternalApiError(response.status, response.data.error, error)
    }
  }
}
