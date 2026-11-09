import { Button, Container, Stack, Tooltip } from "@mui/material";
import { useReducer, useState } from "react";
import { v4 as uuid } from "uuid";
import { ComparatorCarousel } from "../../components/ui/ComparatorCarousel";
import { getComparisonRatios } from "../comparison/utils";
import { getCommonProductRatio } from "./calculator";
import { CommonItem } from "./CommonItem";
import { type CommonProductItem, type Unit, units } from "./model";

type Action =
  | { type: "ADD_ITEM"; payload: CommonProductItem }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_AMOUNT"; payload: { id: string; amountInput: string } }
  | { type: "UPDATE_PRICE"; payload: { id: string; priceInput: string } }
  | { type: "CLEAR" };

const getInitialItems = (): CommonProductItem[] => [
  { id: uuid(), priceInput: "", amountInput: "", ratio: null },
  { id: uuid(), priceInput: "", amountInput: "", ratio: null },
];

function itemsReducer(
  state: CommonProductItem[],
  action: Action,
): CommonProductItem[] {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload.id);
    case "UPDATE_AMOUNT":
      return state.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              amountInput: action.payload.amountInput,
              ratio: getCommonProductRatio(
                item.priceInput,
                action.payload.amountInput,
              ),
            }
          : item,
      );
    case "UPDATE_PRICE":
      return state.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              priceInput: action.payload.priceInput,
              ratio: getCommonProductRatio(
                action.payload.priceInput,
                item.amountInput,
              ),
            }
          : item,
      );
    case "CLEAR":
      return getInitialItems();
    default:
      return state;
  }
}

function CommonProductComparator() {
  const [unit, setUnit] = useState<Unit>(units[0]);
  const [items, dispatch] = useReducer(itemsReducer, getInitialItems());
  const { betterRatio, worstRatio } = getComparisonRatios(items);
  const addItem = () =>
    dispatch({
      type: "ADD_ITEM",
      payload: { id: uuid(), priceInput: "", amountInput: "", ratio: null },
    });

  return (
    <Container sx={{ px: 1, py: 2 }}>
      <Stack spacing={2}>
        <Stack
          spacing={0.5}
          direction="row"
          sx={{ width: 1, justifyContent: "center" }}
        >
          {units.map((currentUnit) => (
            <Tooltip key={currentUnit.name} title={currentUnit.name}>
              <Button
                onClick={() => setUnit(currentUnit)}
                variant={currentUnit === unit ? "contained" : "outlined"}
                sx={{ minWidth: 48 }}
              >
                {currentUnit.abbreviation}
              </Button>
            </Tooltip>
          ))}
        </Stack>

        <ComparatorCarousel items={items}>
          {(item) => (
            <CommonItem
              unit={unit}
              item={item}
              betterRatio={betterRatio}
              worstRatio={worstRatio}
              onRemoveItem={() =>
                dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } })
              }
              onUpdateAmount={(amountInput) =>
                dispatch({
                  type: "UPDATE_AMOUNT",
                  payload: { id: item.id, amountInput },
                })
              }
              onUpdatePrice={(priceInput) =>
                dispatch({
                  type: "UPDATE_PRICE",
                  payload: { id: item.id, priceInput },
                })
              }
            />
          )}
        </ComparatorCarousel>

        <Stack spacing={1} direction="row" sx={{ justifyContent: "end" }}>
          <Button
            onClick={() => dispatch({ type: "CLEAR" })}
            color="error"
            variant="contained"
          >
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

export { CommonProductComparator };
