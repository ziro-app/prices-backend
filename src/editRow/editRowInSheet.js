const auth = require('../authentication/auth')

const editRowInSheet = (fabricante, data) => {
	return new Promise( async (resolve, reject) => {
		const { getRows } = await auth()
		getRows(1, (error, rows) => {
			if (error)
				reject({ message: 'Error in getRows', details: error })
			const [ result ] = rows.filter(row => row.fabricante === fabricante)
			if (result) {
				result.bijuteria_min = data.bijuteria_min
				result.save(error => {
					if (error)
						reject({ message: 'Error in row.save', details: error })
					resolve('ok')
				})
			} else
				reject({ message: 'Error in server getRows', details: 'Row id does not exist' })
		})
	})
}

module.exports = editRowInSheet