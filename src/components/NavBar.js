import React, { useState } from 'react'

import SideDrawer from './Drawer'

import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Drawer from '@material-ui/core/Drawer'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Slide from '@material-ui/core/Slide'

const drawerWidth = 240
const useStyles = makeStyles(theme => ({
	drawer: {
		[theme.breakpoints.up('md')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up('md')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	drawerPaper: {
		width: drawerWidth,
	},
}))

const HideOnScroll = props => {
	const trigger = useScrollTrigger()
	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{props.children}
		</Slide>
	)
}

const NavBar = props => {
	const classes = useStyles()

	const [drawerOpen, setDrawerOpen] = useState(false)

	const handleDrawerToggle = open => {
		setDrawerOpen(open)
	}
	return (
		<>
			<HideOnScroll>
				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={() => handleDrawerToggle(true)}
							className={classes.menuButton}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap>
							Responsive drawer
						</Typography>
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			<nav className={classes.drawer}>
				<Hidden mdUp implementation="css">
					<SwipeableDrawer
						anchor="left"
						open={drawerOpen}
						onOpen={() => handleDrawerToggle(true)}
						onClose={() => handleDrawerToggle(false)}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true,
						}}
					>
						<SideDrawer />
					</SwipeableDrawer>
				</Hidden>
				<Hidden smDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant="permanent"
						open
					>
						<SideDrawer />
					</Drawer>
				</Hidden>
			</nav>
		</>
	)
}

export default NavBar
