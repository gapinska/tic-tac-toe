import React from "react"
import { calculateFinalVerdict } from "../../gameLogic"

const GameOver = ({ gamer1Score, gamer2Score }) => {
  const finalVerdict = calculateFinalVerdict(gamer1Score, gamer2Score)
  return (
    <div className="game-info">
      <div className="game-info-title game-over-info">Game Over</div>
      <div className="game-info-title game-over-verdict">
        The winner: <span>{finalVerdict}</span>
      </div>
      <div className="game-info-title game-over-congrat">Congratulations!</div>
    </div>
  )
}

export default GameOver
