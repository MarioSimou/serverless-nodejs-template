import {DynamoDB} from 'aws-sdk'
import {setGetter} from '../index.js'

function DynamoDBClient({region = 'localhost', endpoint = 'http://localhost:8000', environment = 'development', tableName}) {
  if (!(this instanceof DynamoDBClient)) {
    return new DynamoDBClient({region, endpoint, environment, tableName})
  }
  if (!tableName) {
    throw new Error('Invalid table name value')
  }

  this._tableName = tableName
  this._environment = environment
  this._region = region
  this._endpoint = endpoint
  this._instance = new DynamoDB.DocumentClient({region, endpoint})

  setGetter.call(this, 'environment', arg => arg._environment)
  setGetter.call(this, 'region', arg => arg._region)
  setGetter.call(this, 'endpoint', arg => arg._endpoint)
  setGetter.call(this, 'instance', arg => arg._instance)
  setGetter.call(this, 'tableName', arg => arg._instance)
}

DynamoDBClient.prototype.findOneById = async function (id) {
  return this.findOne({id})
}

DynamoDBClient.prototype.findOne = async function (Key) {
  try {
    const options = {TableName: this._tableName, Key}
    const {Item} = await this._instance.get(options).promise()
    return [null, Item]
  } catch (e) {
    return [e]
  }
}

DynamoDBClient.prototype.find = async function (params) {
  try {
    const options = {TableName: this._tableName, Select: 'ALL_ATTRIBUTES', ...params}
    const {Items} = await this._instance.scan(options).promise()

    return [null, Items]
  } catch (e) {
    return [e]
  }
}

DynamoDBClient.prototype.insertOne = async function (values) {
  try {
    const options = {TableName: this._tableName, Item: values}

    await this._instance.put(options).promise()
    return this.findOneById(values.id)
  } catch (e) {
    return [e]
  }
}
DynamoDBClient.prototype.updateOneById = async function (id, ...args) {
  return this.updateOne({id}, ...args)
}
DynamoDBClient.prototype.updateOne = async function (Key, params) {
  try {
    const updateExpression = Object.keys(params)
      .reduce((acc, key, i) => [...acc, i === 0 ? `${key}=:${key}` : `,${key}=:${key}`], ['set'])
      .join(' ')
    const expressionAttributeNames = Object.entries(params).reduce((acc, [k, v]) => ({...acc, [`:${k}`]: v}), {})
    const options = {
      TableName: this._tableName,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeNames,
      Key,
      ReturnValues: 'ALL_NEW',
    }

    const {Attributes} = await this._instance.update(options).promise()
    return [null, Attributes]
  } catch (e) {
    return [e]
  }
}

DynamoDBClient.prototype.deleteOneById = async function (id) {
  return this.deleteOne({id})
}

DynamoDBClient.prototype.deleteOne = async function (Key) {
  try {
    const options = {TableName: this._tableName, Key}
    await this._instance.delete(options).promise()
    return [null, true]
  } catch (e) {
    return [e]
  }
}

export const getDynamoDBClient = () =>
  new DynamoDBClient({
    region: process.env.DYNAMODB_REGION,
    endpoint: process.env.DYNAMODB_ENDPOINT,
    environment: process.env.NODE_ENV,
    tableName: process.env.DYNAMODB_TABLE_NAME,
  })

export default DynamoDBClient
