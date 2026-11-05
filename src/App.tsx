import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import { CommonComparator } from "./components/CommonComparator";
import { Header } from "./components/Header";
import { ToiletPaperComparator } from "./components/ToiletPaperComparator";

type ComparatorVariant = "common" | "toiletPaper";

const comparators: { name: string; variant: ComparatorVariant }[] = [
  {
    name: "Comum",
    variant: "common",
  },
  {
    name: "Papel higiênico",
    variant: "toiletPaper",
  },
];

function App() {
  const [comparator, setComparator] = useState<ComparatorVariant>("common");

  return (
    <Box>
      <Header />

      <Stack
        spacing={0.5}
        direction={"row"}
        sx={{ width: 1, justifyContent: "center" }}
      >
        {comparators.map((c, index) => (
          <Button
            key={index}
            onClick={() => setComparator(c.variant)}
            variant={c.variant === comparator ? "contained" : "outlined"}
          >
            {c.name}
          </Button>
        ))}
      </Stack>

      {comparator === "common" && <CommonComparator />}
      {comparator === "toiletPaper" && <ToiletPaperComparator />}
    </Box>
  );
}

export { App };
