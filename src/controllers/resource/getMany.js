import {getDynamoDBClient} from '../../utils/classes/DynamoDBClient'
import {HTTPResponse, HTTPError} from '../../utils/classes/HTTPResponse'
import * as e from '../../utils/errors'

export default async () => {
  try {
    const [err, users = []] = await getDynamoDBClient().find({})

    if (err) {
      throw new HTTPError(err)
    }
    if (users.length === 0) {
      throw new HTTPError({statusCode: 404, message: e.errNotFound})
    }

    return new HTTPResponse({statusCode: 200, success: true, body: users}).stringify()
  } catch (e) {
    return new HTTPError({statusCode: e.statusCode || 400, message: e.message}).stringify()
  }
}
