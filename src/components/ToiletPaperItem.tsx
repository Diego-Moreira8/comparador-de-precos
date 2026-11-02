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

interface ToiletPaperProps {
  priceInput: string;
  rollCountInput: string;
  rollLengthInput: string;
  totalLength: number | null;
  ratio: number | null;
  betterRatio: number | null;
  worstRatio: number | null;
  onRemoveItem: () => void;
  onUpdateRollLength: (amount: string) => void;
  onUpdateRollCount: (amount: string) => void;
  onUpdatePrice: (price: string) => void;
}

function ToiletPaper({
  priceInput,
  rollCountInput,
  rollLengthInput,
  totalLength,
  ratio,
  betterRatio,
  worstRatio,
  onRemoveItem,
  onUpdateRollCount,
  onUpdateRollLength,
  onUpdatePrice,
}: ToiletPaperProps) {
  const nameInputId = useId();
  const priceInputId = useId();
  const rollCountInputId = useId();
  const rollLengthInputId = useId();
  const totalLengthInputId = useId();
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
            label="Marca"
            placeholder="Ex.: Paloma, Neve, Personal..."
            autoComplete="off"
          />

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
            onChange={(e) => onUpdateRollCount(e.target.value)}
            value={rollCountInput}
            label="Quantidade de rolos"
            autoComplete="off"
            required
            type="number"
            id={rollCountInputId}
            size="small"
            fullWidth
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">rolos</InputAdornment>
                ),
              },
            }}
          />

          <TextField
            onChange={(e) => onUpdateRollLength(e.target.value)}
            value={rollLengthInput}
            label="Comprimento do rolo"
            autoComplete="off"
            required
            type="number"
            id={rollLengthInputId}
            size="small"
            fullWidth
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="start">m/rolo</InputAdornment>
                ),
              },
            }}
          />

          <TextField
            value={totalLength || "-"}
            label={"Quantidade total"}
            disabled
            id={totalLengthInputId}
            size="small"
            fullWidth
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">m</InputAdornment>,
              },
            }}
          />

          <TextField
            value={ratio || "-"}
            label={`Preço por metro`}
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
                      <Chip label="Melhor preço" color="success" size="small" />
                    )}
                    {isBetterRatio != isWorstRatio && isWorstRatio && (
                      <Chip label="Pior preço" color="error" size="small" />
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

export { ToiletPaper };
