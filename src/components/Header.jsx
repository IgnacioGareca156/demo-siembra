import {
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import {  useState } from "react";
import NavListDrawerResponsive from "./NavListDrawerResponsive";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false)


  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            edge="start"
            aria-label="menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
              }}
            >
              Colegio Nueva Siembra
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <NavListDrawerResponsive 
          onClick={() => setOpen(false)}
        />
      </Drawer>
    </>
  );
}
