import {setGetter} from '../index.js'

function HTTPResponse({statusCode, success, message, body}) {
  if (!(this instanceof HTTPResponse)) {
    return new HTTPResponse({statusCode, success, message, body})
  }

  this._statusCode = statusCode
  this._body = body
  this._message = message
  this._success = success

  setGetter.call(this, 'statusCode', arg => arg._statusCode)
  setGetter.call(this, 'body', arg => arg._body)
  setGetter.call(this, 'success', arg => arg._success)
  setGetter.call(this, 'message', arg => arg._message)
}

HTTPResponse.prototype.stringify = function () {
  return {
    statusCode: this._statusCode,
    body: JSON.stringify({
      status: this._statusCode,
      success: this._success,
      message: this._message,
      body: this._body,
    }),
  }
}

function HTTPError({statusCode, message}) {
  if (!(this instanceof HTTPError)) {
    return new HTTPError({statusCode, message})
  }

  HTTPResponse.call(this, {statusCode, message, success: false})
}
HTTPError.prototype = Object.create(HTTPResponse.prototype)
HTTPError.prototype.constructor = HTTPError

export {HTTPResponse, HTTPError}
