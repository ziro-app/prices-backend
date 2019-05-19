const auth = require('../authentication/auth')

const editRowInSheet = (supplier, data) => {
	return new Promise( async (resolve, reject) => {
		const { getRows, addRow } = await auth()
		getRows(1, (error, rows) => {
			if (error)
				reject({ message: 'Error in getRows', details: error })
			const [ supplierRow ] = rows.filter( ({ fabricante }) => fabricante === supplier)
			const products = Object.keys(data).map(value => value.replace('_',''))
			if (supplierRow) {
				for (let i = 0; i < products.length; i++)
					supplierRow[products[i]] = Object.values(data)[i]
				supplierRow.save(error => {
					if (error)
						reject({ message: 'Error in SpreadsheetRow.Save', details: error })
				})
				resolve('ok')
			} else {
				data.fabricante = supplier
				addRow(1, data, error => {
					if (error)
						reject({ message: 'Error in addRow', details: error })
					resolve('ok')
				})
			}
		})
	})
}

module.exports = editRowInSheet