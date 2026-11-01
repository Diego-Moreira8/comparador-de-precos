import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Chip,
  InputAdornment,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { useId } from "react";
import type { Unit } from "../types";

interface ItemProps {
  unit: Unit;
  priceInput: string;
  amountInput: string;
  ratio: number | null;
  betterRatio: number | null;
  worstRatio: number | null;
  onRemoveItem: () => void;
  onUpdateAmount: (amount: string) => void;
  onUpdatePrice: (price: string) => void;
}

function Item({
  unit,
  priceInput,
  amountInput,
  ratio,
  betterRatio,
  worstRatio,
  onRemoveItem,
  onUpdateAmount,
  onUpdatePrice,
}: ItemProps) {
  const nameInputId = useId();
  const priceInputId = useId();
  const amountInputId = useId();
  const ratioInputId = useId();

  const isBetterRatio = ratio === betterRatio;
  const isWorstRatio = ratio === worstRatio;

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
      <Stack
        spacing={1}
        sx={{
          alignItems: "flex-end",
        }}
      >
        <Stack direction={"column"} spacing={1.5} sx={{ width: 1 }}>
          <TextField
            size="small"
            fullWidth
            id={nameInputId}
            label="Descrição"
            placeholder="Ex.: Frango, Sadia, Perdigão..."
            autoComplete="off"
          />

          <Stack direction="row" spacing={0.5}>
            <TextField
              onChange={(e) => onUpdatePrice(e.target.value)}
              value={priceInput}
              label="Preço"
              autoComplete="off"
              required
              type="number"
              id={priceInputId}
              size="small"
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              onChange={(e) => onUpdateAmount(e.target.value)}
              value={amountInput}
              label="Quantidade"
              autoComplete="off"
              required
              type="number"
              id={amountInputId}
              size="small"
              fullWidth
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="start">
                      {unit.abbreviation}
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Stack>

          <TextField
            value={ratio || "-"}
            label={`Preço por ${unit.name.toLocaleLowerCase()}`}
            disabled
            id={ratioInputId}
            size="small"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
                endAdornment: (
                  <Stack direction="row" spacing={0.75}>
                    {isBetterRatio != isWorstRatio && isBetterRatio && (
                      <Chip
                        label="Melhor preço "
                        color="success"
                        size="small"
                      />
                    )}
                    {isBetterRatio != isWorstRatio && isWorstRatio && (
                      <Chip label="Pior preço " color="error" size="small" />
                    )}
                  </Stack>
                ),
              },
            }}
          />
        </Stack>

        <Button
          onClick={onRemoveItem}
          startIcon={<CloseIcon />}
          color="error"
          size="small"
        >
          Remover item
        </Button>
      </Stack>
    </Paper>
  );
}

export { Item };
