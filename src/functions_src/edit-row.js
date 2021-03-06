require('dotenv').config()
const response = require('../utils/response')
const editRow = require('../editRow/index')

exports.handler = async ({ httpMethod, queryStringParameters, body }) => {
	let state = 'ok'
	try {
		if (httpMethod !== 'POST')
			state = 'methodError'
		if (Object.keys(queryStringParameters).length !== 0)
			state = 'parametersError'
		if (state === 'ok') {
			state = await editRow(JSON.parse(body))
		}
	} catch (error) {
		console.log(error.message)
		if (error.details)
			console.log(error.details)
		state = 'executionError'
	}
	return response(state)
}

// curl -d '{"supplier":"100 Morena","bijuteria-min":"19.9","bijuteria-max":"99.9","body-min":"19.9","body-max":"99.9","blusa-min":"19.9","blusa-max":"99.9","bolsa-min":"19.9","bolsa-max":"99.9"}' -X POST https://prices-backend.ziro.online/.netlify/functions/edit-row
// curl -d '{"supplier":"100 Morena","bijuteria-min":"19.9","bijuteria-max":"99.9","body-min":"19.9","body-max":"99.9","blusa-min":"19.9","blusa-max":"99.9","bolsa-min":"19.9","bolsa-max":"99.9"}' -X POST http://localhost:9000/edit-row