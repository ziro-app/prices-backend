require('dotenv').config()
// const response = require('../utils/response')
const editRow = require('../editRow/index')

exports.handler = async ({ httpMethod, queryStringParameters, body }) => {
	let state = 'ok'
	try {
		if (httpMethod !== 'POST')
			state = 'methodError'
		if (Object.keys(queryStringParameters).length !== 0)
			state = 'parametersError'
		if (state === 'ok') {
			// state = await editRow(JSON.parse(body))
		}
	} catch (error) {
		console.log(error.message)
		if (error.details)
			console.log(error.details)
		state = 'executionError'
	}
	return 'ok'
	// return response(state)
}