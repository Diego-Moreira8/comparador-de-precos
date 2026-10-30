import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useReducer } from "react";
import { v4 as uuid } from "uuid";
import { Item as ItemRatio } from "./components/Item";

interface Item {
  id: string;
  priceInput: string;
  amountInput: string;
}

type Action =
  | { type: "ADD_ITEM"; payload: Item }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_AMOUNT"; payload: { id: string; amountInput: string } }
  | { type: "UPDATE_PRICE"; payload: { id: string; priceInput: string } }
  | { type: "CLEAR" };

const getInitialItems = (): Item[] => [
  { id: uuid(), priceInput: "", amountInput: "" },
];

function App() {
  const [items, dispatch] = useReducer(itemsReducer, getInitialItems());

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
            ? { ...item, amountInput: action.payload.amountInput }
            : item,
        );
      }

      case "UPDATE_PRICE": {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, priceInput: action.payload.priceInput }
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
      },
    });
  }

  function removeItem(id: string) {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { id },
    });
  }

  function updateAmount(id: string, amount: string) {
    dispatch({
      type: "UPDATE_AMOUNT",
      payload: { id, amountInput: amount },
    });
  }

  function updatePrice(id: string, price: string) {
    dispatch({
      type: "UPDATE_PRICE",
      payload: { id, priceInput: price },
    });
  }

  function clear() {
    dispatch({ type: "CLEAR" });
  }

  return (
    <Box>
      <AppBar position="sticky" sx={{ px: 2 }}>
        <Stack direction={"row"} sx={{ height: 60, alignItems: "center" }}>
          <Typography sx={{ fontSize: 20, fontWeight: 500 }}>
            Comparador de Preços
          </Typography>
        </Stack>
      </AppBar>

      <Container sx={{ px: 1, py: 4 }}>
        <Stack spacing={2}>
          <Stack spacing={2}>
            {items.map((item) => (
              <ItemRatio
                key={item.id}
                priceInput={item.priceInput}
                amountInput={item.amountInput}
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
