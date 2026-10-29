import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useId, useState } from "react";

interface ItemProps {
  ratio: null | number;
  onInputsChange: (weightInput: string, priceInput: string) => void;
  onRemove: () => void;
}

function Item({ ratio, onInputsChange, onRemove }: ItemProps) {
  const [nameInput, setNameInput] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [priceInput, setPriceInput] = useState("");

  const nameInputId = useId();
  const weightInputId = useId();
  const priceInputId = useId();
  const ratioInputId = useId();

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction={"column"} spacing={2}>
          <TextField
            fullWidth
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value);
            }}
            id={nameInputId}
            label="Nome do produto"
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              value={weightInput}
              onChange={(e) => {
                setWeightInput(e.target.value);
                onInputsChange(weightInput, priceInput);
              }}
              id={weightInputId}
              label="Peso (em quilos)"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="start">Kg</InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              value={priceInput}
              onChange={(e) => {
                setPriceInput(e.target.value);
                onInputsChange(weightInput, priceInput);
              }}
              id={priceInputId}
              label="Preço"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                },
              }}
            />
          </Stack>

          <TextField
            fullWidth
            value={ratio === null ? "-" : ratio}
            id={ratioInputId}
            disabled
            label="Preço por quilo"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">/Kg</InputAdornment>
                ),
              },
            }}
          />

          <CardActions>
            <Button onClick={onRemove} startIcon={<CloseIcon />} color="error">
              Remover item
            </Button>
          </CardActions>
        </Stack>
      </CardContent>
    </Card>
  );
}

export { Item };
