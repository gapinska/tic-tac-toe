import React from 'react'
import Button from '@material-ui/core/Button'

const GameContinue = ({ handleClickContinueGame, status }) => {
	const disabled = !status

	return (
		<Button disabled={disabled} variant="outlined" color="primary" onClick={handleClickContinueGame}>
			Next round
		</Button>
	)
}

export default GameContinue
