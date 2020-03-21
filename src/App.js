import React, { useState } from 'react'

import { Switch, Route } from 'react-router-dom'

import Home from './views/HomePage'
import Error404Page from './views/404ErrorPage'
import RegisterPage from './views/RegisterPage'
import LoginPage from './views/LoginPage'
import ForgotPassPage from './views/ForgotPassPage'

import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Snacks from './components/Snacks'
import ScrollToTop from './components/ScrollToTop'

import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
	root: {
		height: '100%',
		margin: 0,
		display: 'flex',
		flexDirection: 'column',
	},
	toolbar: theme.mixins.toolbar,
	main: {
		[theme.breakpoints.up('md')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
		position: 'relative',
		height: '100vh',
	},
	backToTop: {
		position: 'fixed',
		bottom: theme.spacing(8),
		right: theme.spacing(2),
	},
}))

const allPages = [
	{
		view: Home,
		path: '/',
		exact: true,
	},
	{
		view: RegisterPage,
		path: '/account/register',
		exact: true,
	},
	{
		view: LoginPage,
		path: '/account/login',
		exact: true,
	},
	{
		view: ForgotPassPage,
		path: '/account/forgotpass',
		exact: true,
	},
]

const App = () => {
	const classes = useStyles()

	const [snackOpen, setSnackOpen] = useState(false)
	const [snackMessage, setSnackMessage] = useState('Test')
	const [snackClickawayCount, setSnackClickawayCount] = useState(0)

	const snackFunc = {
		newSnack: message => {
			setSnackMessage(message)
			setSnackOpen(true)
		},
		snacksClose: (event, reason) => {
			if (reason === 'clickaway') {
				if (snackClickawayCount === 1) {
					setSnackOpen(false)
					setSnackClickawayCount(0)
				} else setSnackClickawayCount(snackClickawayCount + 1)
			} else setSnackOpen(false)
		},
	}

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Snacks open={snackOpen} text={snackMessage} handleClose={snackFunc.snacksClose} />
			<NavBar />
			<div className={classes.main}>
				<div id="back-to-top-anchor" />
				<div className={classes.toolbar} />
				<Switch>
					{allPages.map((Page, key) => {
						return (
							<Route key={key} path={Page.path} exact>
								<Page.view newSnack={snackFunc.newSnack} />
							</Route>
						)
					})}
					<Route path="/">
						<Error404Page />
					</Route>
				</Switch>
				<ScrollToTop where="#back-to-top-anchor">
					<Fab color="secondary">
						<KeyboardArrowUpIcon />
					</Fab>
				</ScrollToTop>
				<Footer />
				<div id="down-at-bottom-anchor" />
			</div>
		</div>
	)
}

export default App
