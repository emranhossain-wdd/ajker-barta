import * as React from 'react';
import { Avatar, Box, Menu, Tooltip } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { ChartBar as ChartBarIcon } from '../../../icons/chart-bar';
import { Cog as CogIcon } from '../../../icons/cog';
import { Lock as LockIcon } from '../../../icons/lock';
import { Selector as SelectorIcon } from '../../../icons/selector';
import { ShoppingBag as ShoppingBagIcon } from '../../../icons/shopping-bag';
import { User as UserIcon } from '../../../icons/user';
import { UserAdd as UserAddIcon } from '../../../icons/user-add';
import { Users as UsersIcon } from '../../../icons/users';
import { Divider } from '@mui/material';
import { NavItem } from '../NavItem/NavItem';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Logo } from '../Logo/Logo';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../../../hooks/useAuth';


const items = [
    {
        href: '/dashboard',
        icon: (<ChartBarIcon fontSize="small" />),
        title: 'Dashboard'
    },
    {
        href: '/dashboard/account',
        icon: (<UserIcon fontSize="small" />),
        title: 'Account'
    },
    {
        href: '/dashboard/users',
        icon: (<UsersIcon fontSize="small" />),
        title: 'Employee'
    },
    {
        href: '/dashboard/addNews',
        icon: (<UsersIcon fontSize="small" />),
        title: 'Add News'
    },
    {
        href: '/dashboard/manageNews',
        icon: (<ShoppingBagIcon fontSize="small" />),
        title: 'Manage News'
    },
    {
        href: '/dashboard/settings',
        icon: (<CogIcon fontSize="small" />),
        title: 'Settings'
    },
    {
        href: '/dashboard/makeAdmin',
        icon: (<LockIcon fontSize="small" />),
        title: 'Make Admin'
    },
    {
        href: '/',
        icon: (<UserAddIcon fontSize="small" />),
        title: 'Back to home'
    }
];

// drawer style //////////////////////////
const drawerWidth = 260;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(1),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

/// dashboard navbar /////////////
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    backgroundColor: "white",
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
/////////////////

const DashboardHome = ({ children }) => {
    const { user, logOut } = useAuth();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    ///// Side bar content///// 

    React.useEffect(
        () => {
            if (!router.isReady) {
                return;
            }
            if (open) {
                console.log("");
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router.asPath]
    );

    const content = (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', color: 'white', }} >
                <div>
                    <Box sx={{ p: 3 }}>
                        <NextLink href="/" passHref>
                            <a> <Logo sx={{ height: 42, width: 42 }} /> </a>
                        </NextLink>
                    </Box>
                    <Box sx={{ px: 2 }}>
                        <Box sx={{ alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.04)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', px: 3, py: '11px', borderRadius: 1 }}>
                            <div>
                                <Typography color="inherit" variant="subtitle1"  > Ajker Barta</Typography>
                                <Typography color="neutral.400" variant="body2" >  Update {' '} : Newses</Typography>
                            </div>
                            <SelectorIcon sx={{ color: 'neutral.500', width: 14, height: 14 }} />
                        </Box>
                    </Box>
                </div>
                <Divider
                    sx={{
                        borderColor: '#2D3748',
                        my: 3
                    }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    {items.map((item) => (
                        <NavItem
                            key={item.title}
                            icon={item.icon}
                            href={item.href}
                            title={item.title}
                        // setDPanel={setDPanel}
                        />
                    ))}
                </Box>
                <Divider sx={{ borderColor: '#2D3748' }} />
                <Box sx={{ px: 2, py: 3 }} > </Box>
            </Box>
        </>
    );
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Dashboard navbar */}
            <AppBar open={open} className="bg-white">
                <Toolbar>
                    <IconButton onClick={handleDrawerClose}
                        sx={{ mr: 2, ...(!open && { display: 'none' }) }}
                        className="fs-2">
                        {theme.direction === 'ltr' ? <CloseIcon fontSize='large' sx={{ color: 'black' }} /> : <CloseIcon fontSize='large' sx={{ color: 'black' }} />}
                    </IconButton>
                    <IconButton
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}>
                        <MenuIcon fontSize='large' sx={{ color: 'black' }} />
                    </IconButton>
                    <br />
                    <div className='container flex items-center justify-between'>
                        <Typography className='text-black font-bold' variant="h5" noWrap component="div">
                            Ajker Barta
                        </Typography>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src={user?.photoURL || "https://i.ibb.co/ScbTKWS/admin.png"} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px', width: '500px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top', horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top', horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu} >
                                <div onClick={handleCloseUserMenu} className="flex flex-col px-3 py-2 w-48">
                                    <h5 className='ml-2 cursor-pointer font-bold text-gray-600' onClick={() => router.push('/')} >< HomeIcon />  Home</h5>

                                    <h5 className='ml-2 cursor-pointer font-bold text-gray-600' onClick={logOut}><LogoutIcon /> Logout</h5>
                                </div>
                            </Menu>
                        </Box>
                    </div>
                </Toolbar>
            </AppBar>

            {/* Drawer  */}
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#111827',
                        color: '#FFFFFF',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                {/* Sidebar content  */}
                {content}
            </Drawer>

            {/* Dashboard main */}
            <Main open={open} >
                <div className="pt-20">
                    {children}
                </div>
            </Main>
        </Box>
    );
};
export default DashboardHome;