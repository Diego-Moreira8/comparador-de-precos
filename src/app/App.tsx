import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import { Header } from "../components/layout/Header";
import { comparators, type ComparatorId } from "./comparators";

function App() {
  const [comparatorId, setComparatorId] = useState<ComparatorId>("common");
  const comparator = comparators.find(({ id }) => id === comparatorId)!;
  const Comparator = comparator.Component;

  return (
    <Box>
      <Header />

      <Stack
        spacing={0.5}
        direction="row"
        sx={{ width: 1, justifyContent: "center" }}
      >
        {comparators.map(({ id, label }) => (
          <Button
            key={id}
            onClick={() => setComparatorId(id)}
            variant={id === comparatorId ? "contained" : "outlined"}
          >
            {label}
          </Button>
        ))}
      </Stack>

      <Comparator />
    </Box>
  );
}

export { App };
