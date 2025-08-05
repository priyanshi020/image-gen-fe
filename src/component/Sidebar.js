import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar } from "@mui/material";

const drawerWidth = 240;

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        backgroundColor: "red",
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <List>
        <ListItem>
          <ListItemText primary="New Chat" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
