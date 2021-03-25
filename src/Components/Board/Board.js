import React, { useState, useEffect } from 'react'
import Field from './Field'
import GameStart from '../GameFlow/GameStart'
import { calculateVerdict, X, O, TIE } from '../../gameLogic'
import GameStatus from '../GameFlow/GameStatus'
import GameContinue from '../GameFlow/GameContinue'
import GameEnd from '../GameFlow/GameEnd'
import GameOver from '../GameFlow/GameOver'
import GameBar from './GameBar'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'

const Board = () => {
	const [ startGame, setStartGame ] = useState(false)
	const [ gamer1Started, setgamer1Started ] = useState(true)
	const [ continueGameActive, setContinueGameActive ] = useState(false)
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
					setContinueGameActive(true)
					break
				case O:
					setGamer2Score((prevGamer1Score) => prevGamer1Score + 1)
					setVerdict(verdict)
					setContinueGameActive(true)
					break
				case TIE:
					setVerdict(TIE)
					setContinueGameActive(true)
					break
				default:
					return
			}
		},
		[ boardFields ]
	)

	const handleClickField = (index) => {
		if (!verdict) {
			if (boardFields[index] === null) {
				const newFields = [ ...boardFields ]
				newFields[index] = gamer1Turn ? X : O
				setBoardFields(newFields)
				setGamer1Turn(!gamer1Turn)
			}
		}
	}

	const handleClickGamerPicked = (gamer) => {
		if (gamer !== X) {
			setGamer1Turn(false)
			setgamer1Started(false)
		}
		setStartGame(true)
	}

	const handleClickContinueGame = () => {
		if (continueGameActive) {
			setGamer1Turn(!gamer1Started)
			setgamer1Started(!gamer1Started)
			setBoardFields(Array(9).fill(null))
			setVerdict(null)
			setContinueGameActive(false)
		}
	}

	const handleClickEndGame = () => {
		setEndGame(true)
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
			(startGame &&
			!endGame && (
				<div>
					<GameBar gamer1Score={gamer1Score} gamer2Score={gamer2Score} />
					<div className="game-flow-btn-section">
						<GameContinue
							status={verdict ? true : false}
							handleClickContinueGame={handleClickContinueGame}
						/>
						<GameEnd handleClickEndGame={handleClickEndGame} />
					</div>
					<GameStatus gamerTurn={gamerTurn} />

					<div className="game-board">
						<div className="board">
							{boardFields.map((boardField, index) => (
								<Field key={index} value={boardField} onClick={() => handleClickField(index)} />
							))}
						</div>
					</div>
					<Modal isOpen={true} />
				</div>
			)) || <GameOver gamer1Score={gamer1Score} gamer2Score={gamer2Score} />}
		</div>
	)
}

export default Board
