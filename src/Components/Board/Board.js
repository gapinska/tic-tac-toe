import React, { useState, useEffect } from 'react'
import Field from './Field'
import { calculateVerdict, X, O, TIE } from '../../gameLogic'

const Board = () => {
	const [ boardFields, setBoardFields ] = useState(Array(9).fill(null))
	const [ gamer1Turn, setGamer1Turn ] = useState(true)

	useEffect(
		() => {
			const verdict = calculateVerdict(boardFields)
			switch (verdict) {
				case X:
				case O:
					console.log(verdict)
					break
				case TIE:
					console.log('tie')
					break
			}
		},
		[ boardFields ]
	)

	const handleClick = (index) => {
		if (boardFields[index] === null) {
			const newFields = [ ...boardFields ]
			newFields[index] = gamer1Turn ? X : O
			setBoardFields(newFields)
			setGamer1Turn(!gamer1Turn)
		}
	}

	return (
		<div>
			<div>Your turn: {gamer1Turn ? X : O}</div>
			<div className="board">
				{boardFields.map((boardField, index) => (
					<Field key={index} value={boardField} onClick={() => handleClick(index)} />
				))}
			</div>
		</div>
	)
}

export default Board
