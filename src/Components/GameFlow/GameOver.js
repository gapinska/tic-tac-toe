import React from "react"
import { calculateFinalVerdict } from "../../gameLogic"

const GameOver = ({ gamer1Score, gamer2Score }) => {
  const finalVerdict = calculateFinalVerdict(gamer1Score, gamer2Score)
  return (
    <div className="game-info">
      <div className="game-info-title">Game Over</div>
      <div className="game-info-title">The winner: {finalVerdict}</div>
    </div>
  )
}

export default GameOver
