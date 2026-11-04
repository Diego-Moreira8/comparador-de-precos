import { Button, Container, Stack, Tooltip } from "@mui/material";
import { useReducer, useState } from "react";
import { v4 as uuid } from "uuid";
import type { CommonItem as CommonItemType, Unit } from "../types";
import { CommonItem as CommonItemComponent } from "./CommonItem";

type Action =
  | { type: "ADD_ITEM"; payload: CommonItemType }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_AMOUNT"; payload: { id: string; amountInput: string } }
  | { type: "UPDATE_PRICE"; payload: { id: string; priceInput: string } }
  | { type: "CLEAR" };

const getInitialItems = (): CommonItemType[] => [
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

const units: Unit[] = [
  { name: "Unidade", abbreviation: "UN" },
  { name: "Quilograma", abbreviation: "KG" },
  { name: "Grama", abbreviation: "G" },
  { name: "Litro", abbreviation: "L" },
  { name: "Mililitro", abbreviation: "ML" },
];

function CommonComparator() {
  const [unit, setUnit] = useState<Unit>(units[0]);
  const [items, dispatch] = useReducer(itemsReducer, getInitialItems());

  const sortedRatios = items
    .filter((item) => item.ratio != null)
    .sort((a, b) => a.ratio! - b.ratio!);

  const betterRatio = sortedRatios[0]?.ratio ?? null;
  const worstRatio = sortedRatios[sortedRatios.length - 1]?.ratio ?? null;

  function itemsReducer(
    state: CommonItemType[],
    action: Action,
  ): CommonItemType[] {
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
    <Container sx={{ px: 1, py: 2 }}>
      <Stack spacing={2} sx={{ alignItems: "flex-end" }}>
        <Stack
          spacing={0.5}
          direction={"row"}
          sx={{ width: 1, justifyContent: "center" }}
        >
          {units.map((u) => (
            <Tooltip key={u.name} title={u.name}>
              <Button
                onClick={() => setUnit(u)}
                variant={u === unit ? "contained" : "outlined"}
                sx={{ minWidth: 48 }}
              >
                {u.abbreviation}
              </Button>
            </Tooltip>
          ))}
        </Stack>

        <Stack spacing={2} sx={{ width: 1 }}>
          {items.map((item) => (
            <CommonItemComponent
              key={item.id}
              unit={unit}
              item={item}
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

export { CommonComparator };
