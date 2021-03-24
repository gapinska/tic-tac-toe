import React, { useState, useEffect } from 'react'
import Field from './Field'
import GameStart from '../GameFlow/GameStart'
import { calculateVerdict, X, O, TIE } from '../../gameLogic'
import GameStatus from '../GameFlow/GameStatus'
import GameScore from '../GameFlow/GameScore'

const Board = () => {
	const [ startGame, setStartGame ] = useState(false)
	const [ gamer1TurnFirst, setGamer1TurnFirst ] = useState(true)
	const [ endGame, setEndGame ] = useState(false)
	const [ boardFields, setBoardFields ] = useState(Array(9).fill(null))
	const [ gamer1Turn, setGamer1Turn ] = useState(true)
	const [ verdict, setVerdict ] = useState(null)
	const [ gamer1Score, setGamer1Score ] = useState(0)
	const [ gamer2Score, setGamer2Score ] = useState(0)

	useEffect(
		() => {
			const verdict = calculateVerdict(boardFields)
			switch (verdict) {
				case X:
					setGamer1Score((prevGamer1Score) => prevGamer1Score + 1)
					setVerdict(verdict)
					break
				case O:
					setGamer2Score((prevGamer1Score) => prevGamer1Score + 1)
					setVerdict(verdict)
					break
				case TIE:
					setVerdict(TIE)
					break
			}
		},
		[ boardFields ]
	)

	useEffect(
		() => {
			setGamer1Turn(!gamer1TurnFirst)
		},
		[ verdict ]
	)

	const handleClickField = (index) => {
		if (boardFields[index] === null) {
			const newFields = [ ...boardFields ]
			newFields[index] = gamer1Turn ? X : O
			setBoardFields(newFields)
			setGamer1Turn(!gamer1Turn)
		}

		if (verdict) {
			setGamer1Turn(!gamer1TurnFirst)
		}
	}

	const handleClickGamerPicked = (gamer) => {
		if (gamer !== X) {
			setGamer1Turn(!gamer1Turn)
			setGamer1TurnFirst(false)
		}
		setStartGame(true)
	}

	const gamerTurn = gamer1Turn ? X : O

	return (
		<div>
			{(!startGame && (
				<div>
					<GameStart />
					<div className="btn-section">
						<button onClick={() => handleClickGamerPicked(X)}>{X}</button>
						<button onClick={() => handleClickGamerPicked(O)}>{O}</button>
					</div>
				</div>
			)) ||
				(startGame && (
					<div>
						<GameStatus gamerTurn={gamerTurn} />
						<GameScore gamer1Score={gamer1Score} gamer2Score={gamer2Score} />
						<div className="game-board">
							<div className="board">
								{boardFields.map((boardField, index) => (
									<Field key={index} value={boardField} onClick={() => handleClickField(index)} />
								))}
							</div>
						</div>
					</div>
				))}
		</div>
	)
}

export default Board
