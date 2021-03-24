import React from 'react'
const Field = (props) => {
	return (
		<button className="field" onClick={props.onClick}>
			{props.value}
		</button>
	)
}

export default Field
