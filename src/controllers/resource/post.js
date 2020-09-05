import { v4 as uuidv4} from 'uuid'
import { getDynamoDBClient } from '../../utils/classes/DynamoDBClient'
import { 
    HTTPResponse, HTTPError
} from '../../utils/classes/HTTPResponse'


export default async event => {
    try {
        const dynamoDBClient = getDynamoDBClient() 

        if(!event.body){
            throw new HTTPError({statusCode: 404, message: 'Invalid request body'})
        }

        const id = uuidv4()
        const body = JSON.parse(event.body)

        const [err, user] = await dynamoDBClient.insertOne({...body, id})
        if(err){
            throw new HTTPError(err)
        }

        return new HTTPResponse({statusCode: 200, success: true, body: user}).stringify()
    }catch(e){
        return new HTTPError({statusCode: e.statusCode || 400 , message: e.message}).stringify()
    }
}