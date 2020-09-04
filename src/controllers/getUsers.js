const getUsers = async event => {

    return {
      statusCode: 200,
      body: JSON.stringify({message: 'will return a all users'})
    }
}

export default getUsers