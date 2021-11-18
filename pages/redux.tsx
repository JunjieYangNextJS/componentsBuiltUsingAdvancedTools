import React, { useState, useEffect, useMemo } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Box, Button, Paper } from "@mui/material";
import _ from "lodash";
import Login from "./../components/Login";
import Profile from "./../components/Profile";

export default function ReduxExample() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Profile />
      <Login />
    </Box>
  );
}
