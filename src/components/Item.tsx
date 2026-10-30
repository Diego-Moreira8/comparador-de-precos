import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Card,
  CardContent,
  Chip,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { useId } from "react";

interface ItemProps {
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
  const weightInputId = useId();
  const priceInputId = useId();
  const ratioInputId = useId();

  const isBetterRatio = ratio === betterRatio;
  const isWorstRatio = ratio === worstRatio;

  return (
    <Card variant="outlined">
      <CardContent>
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
            />

            <Stack direction="row" spacing={0.5}>
              <TextField
                onChange={(e) => onUpdatePrice(e.target.value)}
                value={priceInput}
                label="Preço"
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
                label="Peso"
                required
                type="number"
                id={weightInputId}
                size="small"
                fullWidth
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="start">Kg</InputAdornment>
                    ),
                  },
                }}
              />
            </Stack>

            <TextField
              value={ratio || "-"}
              label="Preço por quilo"
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
      </CardContent>
    </Card>
  );
}

export { Item };
