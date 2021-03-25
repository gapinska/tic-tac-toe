import React from "react"

const GameStatus = ({ gamerTurn, verdict }) => {
  console.log(verdict)
  return (
    <div className="game-status">
      {!verdict ? (
        <div>
          Your turn: <span>{gamerTurn}</span>
        </div>
      ) : (
        <div>The winner: {verdict}</div>
      )}
    </div>
  )
}

export default React.memo(GameStatus)
