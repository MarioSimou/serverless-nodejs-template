import {getDynamoDBClient} from '../../utils/classes/DynamoDBClient'
import {HTTPResponse, HTTPError} from '../../utils/classes/HTTPResponse'
import * as e from '../../utils/errors'

export default async event => {
  try {
    const {id} = event.pathParameters
    const body = JSON.parse(event.body)
    if (!id || !body) {
      throw new HTTPError({statusCode: 400, message: e.errBadRequest})
    }

    const [err, user] = await getDynamoDBClient().updateOneById(id, body)

    if (err) {
      throw new HTTPError(err)
    }
    if (!user) {
      throw new HTTPError({statusCode: 404, message: e.errNotFound})
    }

    return new HTTPResponse({statusCode: 200, success: true, body: user}).stringify()
  } catch (e) {
    return new HTTPError({statusCode: e.statusCode || 400, message: e.message}).stringify()
  }
}
