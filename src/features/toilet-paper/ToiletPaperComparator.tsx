import { Button, Container, Stack } from "@mui/material";
import { useReducer } from "react";
import { v4 as uuid } from "uuid";
import { ComparatorCarousel } from "../../components/ui/ComparatorCarousel";
import { getComparisonRatios } from "../comparison/utils";
import { getToiletPaperCalculation } from "./calculator";
import { type ToiletPaperItem as ToiletPaperItemType } from "./model";
import { ToiletPaperItem } from "./ToiletPaperItem";

type Action =
  | { type: "ADD_ITEM"; payload: ToiletPaperItemType }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | {
      type: "UPDATE_ROLL_COUNT";
      payload: { id: string; rollCountInput: string };
    }
  | {
      type: "UPDATE_ROLL_LENGTH";
      payload: { id: string; rollLengthInput: string };
    }
  | { type: "UPDATE_PRICE"; payload: { id: string; priceInput: string } }
  | { type: "CLEAR" };

const getInitialItems = (): ToiletPaperItemType[] => [
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

function itemsReducer(
  state: ToiletPaperItemType[],
  action: Action,
): ToiletPaperItemType[] {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload.id);
    case "UPDATE_ROLL_COUNT":
      return state.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              rollCountInput: action.payload.rollCountInput,
              ...getToiletPaperCalculation(
                item.priceInput,
                action.payload.rollCountInput,
                item.rollLengthInput,
              ),
            }
          : item,
      );
    case "UPDATE_ROLL_LENGTH":
      return state.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              rollLengthInput: action.payload.rollLengthInput,
              ...getToiletPaperCalculation(
                item.priceInput,
                item.rollCountInput,
                action.payload.rollLengthInput,
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
              ...getToiletPaperCalculation(
                action.payload.priceInput,
                item.rollCountInput,
                item.rollLengthInput,
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

function ToiletPaperComparator() {
  const [items, dispatch] = useReducer(itemsReducer, getInitialItems());
  const { betterRatio, worstRatio } = getComparisonRatios(items);
  const addItem = () =>
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

  return (
    <Container sx={{ px: 1, py: 2 }}>
      <Stack spacing={2}>
        <ComparatorCarousel items={items}>
          {(item) => (
            <ToiletPaperItem
              item={item}
              betterRatio={betterRatio}
              worstRatio={worstRatio}
              onRemoveItem={() =>
                dispatch({ type: "REMOVE_ITEM", payload: { id: item.id } })
              }
              onUpdateRollCount={(rollCountInput) =>
                dispatch({
                  type: "UPDATE_ROLL_COUNT",
                  payload: { id: item.id, rollCountInput },
                })
              }
              onUpdateRollLength={(rollLengthInput) =>
                dispatch({
                  type: "UPDATE_ROLL_LENGTH",
                  payload: { id: item.id, rollLengthInput },
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

export { ToiletPaperComparator };
