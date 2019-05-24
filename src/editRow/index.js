const editRowInSheet = require('./editRowInSheet')

const editRow = async ({ supplier, ...data }) => {
	const dataOk = supplier && data
	console.log(supplier)
	console.log(data)
	console.log(dataOk)
	if (dataOk) {
		const sheetStatus = await editRowInSheet(supplier, data)
		return 'ok'
	}
	return 'dataError'
}

module.exports = editRow