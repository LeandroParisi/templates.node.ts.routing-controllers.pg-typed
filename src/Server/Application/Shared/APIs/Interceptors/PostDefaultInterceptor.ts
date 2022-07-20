/* eslint-disable @typescript-eslint/no-unsafe-return */
/* istanbul ignore file */

import { Action, Interceptor, InterceptorInterface } from 'routing-controllers'
import { Service } from 'typedi'
import PostReponse from '../BaseClasses/Responses/PostResponse'
import { ResponseMessages } from '../Enums/Messages'
import METHODS from '../Enums/Methods'

@Interceptor()
@Service()
export class PostDefaultInterceptor implements InterceptorInterface {
  intercept(action: Action, content: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const method = action.request.method as string

    if (method === METHODS.POST) {
      return new PostReponse(content, ResponseMessages.CreatedSuccessfully)
    }

    return content
  }
}
