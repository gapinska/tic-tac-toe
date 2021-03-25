import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"

const PlayerButton = ({ onClick, value }) => {
  return (
    <Paper elevation={3} className="player-btn" onClick={onClick}>
      {value}
    </Paper>
  )
}

export default PlayerButton
