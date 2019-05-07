const editRowInSheet = require('./editRowInSheet')

const editRow = async () => {
	if (true) {
		const sheetStatus = await editRowInSheet()
		return 'ok'
	}
	return 'dataError'
}