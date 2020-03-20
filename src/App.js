import React from 'react'

import { Switch, Route } from 'react-router-dom'

import Home from './views/HomePage'
import Error404Page from './views/404ErrorPage'

import NavBar from './components/NavBar'
import Footer from './components/Footer'

import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import Zoom from '@material-ui/core/Zoom'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
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
]

const ScrollToTop = props => {
	const classes = useStyles()
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 100,
	})

	const handleClick = event => {
		const anchor = (event.target.ownerDocument || document).querySelector(props.where)

		if (anchor) {
			anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
		}
	}

	return (
		<Zoom in={trigger}>
			<div onClick={handleClick} role="presentation" className={classes.backToTop}>
				{props.children}
			</div>
		</Zoom>
	)
}

const App = () => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<CssBaseline />
			<NavBar />
			<div className={classes.main}>
				<div id="back-to-top-anchor" />
				<div className={classes.toolbar} />
				<Switch>
					{allPages.map((Page, key) => {
						return (
							<Route key={key} path={Page.path} exact>
								<Page.view />
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
