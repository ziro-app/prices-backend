const editRowInSheet = require('./editRowInSheet')

const editRow = async ({ fabricante, ...data }) => {
	const dataOk = fabricante && data
	if (dataOk) {
		const sheetStatus = await editRowInSheet(fabricante, data)
		return 'ok'
	}
	return 'dataError'
}