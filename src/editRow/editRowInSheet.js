const auth = require('../authentication/auth')

const editRowInSheet = (fabricante, data) => {
	return new Promise( async (resolve, reject) => {
		const { getCells } = await auth()
		getCells(1, (error, cells) => {
			if (error)
				reject({ message: 'Error in getCells', details: error })
			console.log(cells)
			const [ supplier ] = cells.filter(({ value }) => value === fabricante)
			console.log(supplier)
			if (supplier) {
				const cellsToUpdate = cells.filter(({ row }) => row === supplier.row).slice(1)
				const updatedCells = cellsToUpdate.map((cell, index) => {
					cell.value = data[index + 2]
					return cell
				})
				console.log(updatedCells)
				for (let i = 0; i < updatedCells.length; i++) {
					updatedCells[i].save(error => {
						if (error)
							reject({ message: 'Error in cell.Save', details: error })
					})
				}
				resolve('ok')
			} else
				reject({ message: 'Error in getCells', details: 'Supplier does not exist' })
		})
	})
}

module.exports = editRowInSheet