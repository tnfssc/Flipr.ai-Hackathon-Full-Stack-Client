import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		paddingBottom: 100,
	},
}))

const PersonalBoard = props => {
	const classes = useStyles()
	const history = useHistory()
	if (!props.loggedIn) {
		setTimeout(() => {
			props.newSnack('Login to proceed')
			history.push('/')
		}, 0)
		return <></>
	} else {
		const fetchPersonalBoards = () => {}

		return (
			<Fade in>
				<main className={classes.content}>
					<p>Personal Board</p>
				</main>
			</Fade>
		)
	}
}

export default PersonalBoard
