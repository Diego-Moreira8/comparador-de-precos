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
import { useId } from "react";

interface ItemProps {
  priceInput: string;
  amountInput: string;
  onRemoveItem: () => void;
  onUpdateAmount: (amount: string) => void;
  onUpdatePrice: (price: string) => void;
}

function Item({
  priceInput,
  amountInput,
  onRemoveItem,
  onUpdateAmount,
  onUpdatePrice,
}: ItemProps) {
  const nameInputId = useId();
  const weightInputId = useId();
  const priceInputId = useId();
  const ratioInputId = useId();

  const getRatio = (): string => {
    const price = Number(priceInput);
    const amount = Number(amountInput);

    if (isNaN(price) || isNaN(amount) || amount == 0) {
      return "-";
    }

    return (price / amount).toString();
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction={"column"} spacing={2}>
          <TextField fullWidth id={nameInputId} label="Nome do produto" />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              value={amountInput}
              onChange={(e) => onUpdateAmount(e.target.value)}
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
              onChange={(e) => onUpdatePrice(e.target.value)}
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
            value={getRatio()}
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
            <Button
              onClick={onRemoveItem}
              startIcon={<CloseIcon />}
              color="error"
            >
              Remover item
            </Button>
          </CardActions>
        </Stack>
      </CardContent>
    </Card>
  );
}

export { Item };
