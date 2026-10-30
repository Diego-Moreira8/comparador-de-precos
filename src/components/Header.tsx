import { AppBar, Stack, Typography } from "@mui/material";

function Header() {
  return (
    <AppBar position="sticky" sx={{ px: 2 }}>
      <Stack direction={"row"} sx={{ height: 60, alignItems: "center" }}>
        <Typography sx={{ fontSize: 20, fontWeight: 500 }}>
          Comparador de Preços
        </Typography>
      </Stack>
    </AppBar>
  );
}

export { Header };
