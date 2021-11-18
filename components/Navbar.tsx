import React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import {
  Drawer,
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import AppBar, { AppBarProps } from "@mui/material/AppBar";
import { useRouter } from "next/router";
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Mail,
} from "@mui/icons-material";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface MyAppBarProps extends AppBarProps {
  open?: boolean;
}

const MyAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<MyAppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const MyDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Navbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navItemsOne = [
    { label: "Home", to: "/" },
    { label: "Data Grid", to: "/dashboard/recentOrders" },
    { label: "Recharts", to: "/dashboard/todayChart" },
    { label: "Formik", to: "/signin" },
  ];

  const navItemsTwo = [
    { label: "ReactQuery", to: "/tryReactQuery/todos" },
    { label: "InfiniteQuery", to: "/tryReactQuery/infiniteQuery" },
    { label: "Redux showcase", to: "/redux" },
  ];

  const router = useRouter();

  const handleNavigate = (navItem: string) => {
    router.push(navItem);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <MyAppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </MyAppBar>
      <MyDrawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navItemsOne.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleNavigate(item.to)}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {navItemsTwo.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleNavigate(item.to)}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </MyDrawer>
      <DrawerHeader />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>
          This app contains loads components with ready-to-use functionalities.
          They are all built with advanced tools and libraries like GraphQL,
          Apollo, React-Query, Redux, Recharts, Material-Ui, Formik,
          hooks/custom hooks, NextJS, TypeScript and etc...
        </Typography>
        <Typography paragraph>
          Some examples can be seen by clicking into the navigation bar on the
          left.{" "}
        </Typography>
      </Box>
    </Box>
  );
}
