const editRowInSheet = require('./editRowInSheet')

const editRow = async ({ supplier, ...data }) => {
	const dataOk = Boolean(supplier && data)
	if (dataOk) {
		const sheetStatus = await editRowInSheet(supplier, data)
		return 'ok'
	}
	return 'dataError'
}

module.exports = editRow