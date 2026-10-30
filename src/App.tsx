import { Box, Button, Container, Stack } from "@mui/material";
import { useReducer } from "react";
import { v4 as uuid } from "uuid";
import { Header } from "./components/Header";
import { Item as ItemRatio } from "./components/Item";

interface Item {
  id: string;
  priceInput: string;
  amountInput: string;
  ratio: number | null;
}

type Action =
  | { type: "ADD_ITEM"; payload: Item }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_AMOUNT"; payload: { id: string; amountInput: string } }
  | { type: "UPDATE_PRICE"; payload: { id: string; priceInput: string } }
  | { type: "CLEAR" };

const getInitialItems = (): Item[] => [
  { id: uuid(), priceInput: "", amountInput: "", ratio: null },
  { id: uuid(), priceInput: "", amountInput: "", ratio: null },
];

const getRatio = (priceInput: string, amountInput: string): number | null => {
  const price = Number(priceInput);
  const amount = Number(amountInput);

  if (isNaN(price) || isNaN(amount) || amount == 0) {
    return null;
  }

  return price / amount;
};

function App() {
  const [items, dispatch] = useReducer(itemsReducer, getInitialItems());

  const sortedRatios = items
    .filter((item) => item.ratio != null)
    .sort((a, b) => a.ratio! - b.ratio!);

  const betterRatio = sortedRatios[0]?.ratio ?? null;
  const worstRatio = sortedRatios[sortedRatios.length - 1]?.ratio ?? null;

  function itemsReducer(state: Item[], action: Action): Item[] {
    switch (action.type) {
      case "ADD_ITEM": {
        return [...state, action.payload];
      }

      case "REMOVE_ITEM": {
        return state.filter((item) => item.id !== action.payload.id);
      }

      case "UPDATE_AMOUNT": {
        return state.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                amountInput: action.payload.amountInput,
                ratio: getRatio(item.priceInput, action.payload.amountInput),
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
                ratio: getRatio(action.payload.priceInput, item.amountInput),
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
        amountInput: "",
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

  function updateAmount(id: string, newAmount: string) {
    dispatch({
      type: "UPDATE_AMOUNT",
      payload: { id, amountInput: newAmount },
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
    <Box>
      <Header />

      <Container sx={{ px: 1, py: 2 }}>
        <Stack spacing={2} sx={{ alignItems: "flex-end" }}>
          <Stack spacing={2} sx={{ width: 1 }}>
            {items.map((item) => (
              <ItemRatio
                key={item.id}
                priceInput={item.priceInput}
                amountInput={item.amountInput}
                ratio={item.ratio}
                betterRatio={betterRatio}
                worstRatio={worstRatio}
                onRemoveItem={() => {
                  removeItem(item.id);
                }}
                onUpdateAmount={(newAmount: string) => {
                  updateAmount(item.id, newAmount);
                }}
                onUpdatePrice={(newPrice: string) => {
                  updatePrice(item.id, newPrice);
                }}
              />
            ))}
          </Stack>

          <Stack spacing={1} direction={"row"}>
            <Button onClick={addItem} variant="contained">
              Adicionar item
            </Button>

            <Button onClick={clear} color="error" variant="contained">
              Reiniciar
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export { App };
