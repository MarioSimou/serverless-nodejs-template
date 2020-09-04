import { DynamoDB } from 'aws-sdk'
import { setGetter } from '../index.js'

function DynamoDBClient({
    region = 'localhost', 
    endpoint = 'http://localhost:8000',
    environment = 'development'
}){
    if(!(this instanceof DynamoDBClient)){
        return new DynamoDBClient({region, endpoint, environment})
    }

    this._environment = environment
    this._region = region
    this._endpoint = endpoint
    this._instance = new DynamoDB.DocumentClient({region, endpoint})

    setGetter.call(this, 'environment', arg => arg._environment)
    setGetter.call(this, 'region', arg => arg._region)
    setGetter.call(this, 'endpoint', arg => arg._endpoint)
    setGetter.call(this, 'instance', arg => arg._instance)
}

DynamoDBClient.prototype.findOne = function(){
    console.log("returns a single user")
    return null
}

DynamoDBClient.prototype.find = async function(){
    console.log('return a collection of users')
    return []
}

DynamoDBClient.prototype.insertOne = async function(){
    console.log('insert a client')
    return {
        username: 'testuser'
    }
}

DynamoDBClient.prototype.updateOne = async function(){
    console.log('update a client')
    return null
}

DynamoDBClient.prototype.deleteOne = async function(){
    console.log('delete a client')
    return null
}

let dynamoDBInstance

export const NewDynamoDBClient = config => {
    if(!dynamoDBInstance){
        dynamoDBInstance = new DynamoDBClient(config)
    }

    return dynamoDBInstance
}


export default DynamoDBClient