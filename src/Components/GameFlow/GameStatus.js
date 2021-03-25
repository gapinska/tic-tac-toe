import React from 'react'

const GameStatus = ({ gamerTurn }) => {
	return (
		<div className="game-status">
			<div>
				Your turn: <span>{gamerTurn}</span>
			</div>
		</div>
	)
}

export default React.memo(GameStatus)
