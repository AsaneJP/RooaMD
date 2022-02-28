import { memo, ReactElement, useMemo, useState, VFC } from 'react'
import {
  Box,
  createTheme,
  CssBaseline,
  Divider,
  IconButton,
  List,
  styled,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import MuiDrawer from '@mui/material/Drawer'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import { MainListItem } from '../organisms/MainListItem'
import { ListContent } from '../atom/ListContent'
import { menuOpenState } from '../../globalState/menuOpenState'
import { useContextMenu } from '../../hooks/useContextMenu'
import { ContextMenu } from '../molecules/ContextMenu'
import { listCheckState } from '../../globalState/listCheckState'

const drawerWidth = 240

type AppBarProps = MuiAppBarProps & {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: 0,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: '100vw',
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
    },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(0),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(7),
      },
    }),
  },
}))

type Props = {
  title: string
  children: ReactElement
}

export const Layout: VFC<Props> = memo((props) => {
  const { children, title } = props
  const { handleContextMenu } = useContextMenu()
  const setSelectedIndex = useSetRecoilState(listCheckState)
  const [menuOpen, setMenuOpen] = useRecoilState(menuOpenState)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const navigate = useNavigate()

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  )
  const [open, setOpen] = useState(false)
  const toggleDrawer = () => {
    setOpen(!open)
    setMenuOpen(!menuOpen)
  }

  const handleListClear = () => {
    setSelectedIndex('default')
  }

  const handlePush = () => {
    navigate('/')
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <Typography
              variant="h1"
              sx={{ fontSize: '20px', margin: '0 auto', cursor: 'pointer' }}
              onClick={handlePush}
            >
              RooaMD
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Box
            sx={{ height: `calc(100vh - 64px - 130px)`, overflow: 'scroll', overflowX: 'hidden' }}
            onContextMenu={handleContextMenu}
          >
            <Divider />
            <MainListItem />
            <Box onClick={handleListClear} sx={{ minHeight: '40px' }} />
            <ContextMenu />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 'auto' }}>
            <Divider />
            <List>
              <ListContent id="setting" name="設定" url="/setting" icon={<SettingsIcon />} />
              <ListContent id="user" name="ユーザー" url="/user" icon={<PersonIcon />} />
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  )
})
