import { Button, Container, Stack } from "@mui/material";
import { useReducer } from "react";
import { v4 as uuid } from "uuid";
import { ToiletPaper } from "./ToiletPaperItem";

interface ToiletPaper {
  id: string;
  priceInput: string;
  rollCountInput: string;
  rollLengthInput: string;
  totalLength: number | null;
  ratio: number | null;
}

type Action =
  | {
      type: "ADD_ITEM";
      payload: ToiletPaper;
    }
  | {
      type: "REMOVE_ITEM";
      payload: { id: string };
    }
  | {
      type: "UPDATE_ROLL_COUNT";
      payload: { id: string; rollCountInput: string };
    }
  | {
      type: "UPDATE_ROLL_LENGTH";
      payload: { id: string; rollLengthInput: string };
    }
  | {
      type: "UPDATE_PRICE";
      payload: { id: string; priceInput: string };
    }
  | {
      type: "CLEAR";
    };

const getInitialItems = (): ToiletPaper[] => [
  {
    id: uuid(),
    priceInput: "",
    rollCountInput: "",
    rollLengthInput: "",
    totalLength: null,
    ratio: null,
  },
  {
    id: uuid(),
    priceInput: "",
    rollCountInput: "",
    rollLengthInput: "",
    totalLength: null,
    ratio: null,
  },
];

// TODO: Retornar total no pacote
const getRatioAndTotalLength = (
  priceInput: string,
  rollCountInput: string,
  rollLengthInput: string,
): { ratio: number; totalLength: number } | null => {
  const price = Number(priceInput);
  const rollCount = Number(rollCountInput);
  const rollLength = Number(rollLengthInput);

  if (isNaN(price) || isNaN(rollCount) || isNaN(rollLength)) {
    return null;
  }

  const totalLength = rollCount * rollLength;

  if (totalLength === 0) {
    return null;
  }

  const ratio = price / totalLength;

  return { ratio, totalLength };
};

function ToiletPaperComparator() {
  const [items, dispatch] = useReducer(itemsReducer, getInitialItems());

  const sortedRatios = items
    .filter((item) => item.ratio != null)
    .sort((a, b) => a.ratio! - b.ratio!);

  const betterRatio = sortedRatios[0]?.ratio ?? null;
  const worstRatio = sortedRatios[sortedRatios.length - 1]?.ratio ?? null;

  function itemsReducer(state: ToiletPaper[], action: Action): ToiletPaper[] {
    switch (action.type) {
      case "ADD_ITEM": {
        return [...state, action.payload];
      }

      case "REMOVE_ITEM": {
        return state.filter((item) => item.id !== action.payload.id);
      }

      case "UPDATE_ROLL_COUNT": {
        return state.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                rollCountInput: action.payload.rollCountInput,
                ...getRatioAndTotalLength(
                  item.priceInput,
                  action.payload.rollCountInput,
                  item.rollLengthInput,
                ),
              }
            : item,
        );
      }

      case "UPDATE_ROLL_LENGTH": {
        return state.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                rollLengthInput: action.payload.rollLengthInput,
                ...getRatioAndTotalLength(
                  item.priceInput,
                  item.rollCountInput,
                  action.payload.rollLengthInput,
                ),
              }
            : item,
        );
      }

      case "UPDATE_PRICE": {
        return state.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                priceInput: action.payload.priceInput,
                ...getRatioAndTotalLength(
                  action.payload.priceInput,
                  item.rollCountInput,
                  item.rollLengthInput,
                ),
              }
            : item,
        );
      }

      case "CLEAR": {
        return getInitialItems();
      }

      default: {
        return state;
      }
    }
  }

  function addItem() {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: uuid(),
        priceInput: "",
        rollCountInput: "",
        rollLengthInput: "",
        totalLength: null,
        ratio: null,
      },
    });
  }

  function removeItem(id: string) {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { id },
    });
  }

  function updateRollCount(id: string, newRollCount: string) {
    dispatch({
      type: "UPDATE_ROLL_COUNT",
      payload: { id, rollCountInput: newRollCount },
    });
  }

  function updateRollLength(id: string, newRollLength: string) {
    dispatch({
      type: "UPDATE_ROLL_LENGTH",
      payload: { id, rollLengthInput: newRollLength },
    });
  }

  function updatePrice(id: string, newPrice: string) {
    dispatch({
      type: "UPDATE_PRICE",
      payload: { id, priceInput: newPrice },
    });
  }

  function clear() {
    dispatch({ type: "CLEAR" });
  }

  return (
    <Container sx={{ px: 1, py: 2 }}>
      <Stack spacing={2} sx={{ alignItems: "flex-end" }}>
        <Stack spacing={2} sx={{ width: 1 }}>
          {items.map((item) => (
            <ToiletPaper
              key={item.id}
              priceInput={item.priceInput}
              rollCountInput={item.rollCountInput}
              rollLengthInput={item.rollLengthInput}
              totalLength={item.totalLength}
              ratio={item.ratio}
              betterRatio={betterRatio}
              worstRatio={worstRatio}
              onRemoveItem={() => {
                removeItem(item.id);
              }}
              onUpdateRollCount={(newRollCount: string) => {
                updateRollCount(item.id, newRollCount);
              }}
              onUpdateRollLength={(newRollLength: string) => {
                updateRollLength(item.id, newRollLength);
              }}
              onUpdatePrice={(newPrice: string) => {
                updatePrice(item.id, newPrice);
              }}
            />
          ))}
        </Stack>

        <Stack spacing={1} direction={"row"}>
          <Button onClick={clear} color="error" variant="contained">
            Reiniciar
          </Button>

          <Button onClick={addItem} variant="contained">
            Adicionar item
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export { ToiletPaperComparator };
