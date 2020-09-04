import { v4 as uuidv4} from 'uuid'
import { NewDynamoDBClient } from '../utils/classes/DynamoDBClient'
import { 
    HTTPResponse, HTTPError
} from '../utils/classes/HTTPResponse'

const dynamoDBClient = NewDynamoDBClient({
    region: process.env.DYNAMODB_REGION,
    endpoint: process.env.DYNAMODB_ENDPOINT,
    environment: process.env.NODE_ENV,
})

const postUser = async event => {
    try {
        const id = uuidv4()
        const item = {
            Id: id,
            username: 'john',
        }
        // throw new HTTPError({message: 'some error', statusCode: 200})
        const user = await dynamoDBClient.insertOne()

        return new HTTPResponse({statusCode: 200, success: true, data: user}).stringify()
    }catch(e){
        return new HTTPError({statusCode: e.statusCode || 400 , message: e.message}).stringify()
    }
}

export default postUser