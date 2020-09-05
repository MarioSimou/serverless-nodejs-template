import {getDynamoDBClient} from '../../utils/classes/DynamoDBClient'
import {HTTPError, HTTPResponse} from '../../utils/classes/HTTPResponse'
import * as err from '../../utils/errors'

export default async event => {
  try {
    const {id} = event.pathParameters
    if (!id) {
      return new HTTPError({statusCode: 400, message: err.errBadRequest})
    }

    const [e] = await getDynamoDBClient().deleteOneById(id)
    if (e) {
      throw new HTTPError({statusCode: e.statusCode, message: e.message})
    }

    return new HTTPResponse({statusCode: 204, success: true})
  } catch (e) {
    return new HTTPError({statusCode: e.statusCode || 400, message: e.message}).stringify()
  }
}
