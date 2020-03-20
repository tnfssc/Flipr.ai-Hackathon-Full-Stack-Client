import React from 'react'

import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}))

const ErrorPage = () => {
	const classes = useStyles()
	return (
		<div>
			<main className={classes.content}>
				<Typography paragraph>404 Error. Page you are looking for is not found on this site.</Typography>
			</main>
		</div>
	)
}

export default ErrorPage
