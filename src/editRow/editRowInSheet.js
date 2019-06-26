const auth = require('../authentication/auth')

const editRowInSheet = (supplier, data) => {
	return new Promise( async (resolve, reject) => {
		const { getRows, addRow } = await auth()
		getRows(1, (error, rows) => {
			if (error)
				reject({ message: 'Error in getRows', details: error })
			const [ supplierRow ] = rows.filter( ({ fabricante }) => fabricante === supplier)
			let dataToSave = {}
			Object.keys(data).map(key => {
				if (supplierRow)
					supplierRow[key.replace('-','')] = data[key]
				else
					dataToSave[key.replace('-','')] = data[key]
			})
			console.log(supplierRow)
			console.log(dataToSave)
			if (supplierRow) {
				supplierRow.save(error => {
					if (error)
						reject({ message: 'Error in SpreadsheetRow.Save', details: error })
				})
				resolve('ok')
			} else {
				dataToSave.fabricante = supplier
				addRow(1, dataToSave, error => {
					if (error)
						reject({ message: 'Error in addRow', details: error })
					resolve('ok')
				})
			}
		})
	})
}

module.exports = editRowInSheet