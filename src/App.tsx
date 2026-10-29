import { Button, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Item as ItemRatio } from "./components/Item";

interface ItemRatio {
  id: string;
  ratio: null | number;
}

function App() {
  const [itemsRatios, setItemsRatios] = useState<ItemRatio[]>(() => [
    {
      id: uuid(),
      ratio: null,
    },
  ]);

  const addItem = () => {
    setItemsRatios([
      ...itemsRatios,
      {
        id: uuid(),
        ratio: null,
      },
    ]);
  };

  const removeItem = (itemId: string) => {
    setItemsRatios(itemsRatios.filter((item) => item.id !== itemId));
  };

  const updateItem = (
    itemId: string,
    weightInput: string,
    priceInput: string,
  ) => {
    setItemsRatios(
      itemsRatios.map((item) => {
        if (item.id === itemId) {
          return {
            id: itemId,
            ratio: parseInt(priceInput) / parseInt(weightInput),
          };
        } else {
          return item;
        }
      }),
    );
  };

  return (
    <Container>
      <Stack spacing={4}>
        <Typography component="h1" sx={{ fontWeight: 700 }}>
          Comparador de Preços
        </Typography>

        <Stack spacing={2}>
          {itemsRatios.map((item) => (
            <ItemRatio
              key={item.id}
              ratio={item.ratio}
              onInputsChange={(weightInput: string, priceInput: string) =>
                updateItem(item.id, weightInput, priceInput)
              }
              onRemove={() => removeItem(item.id)}
            />
          ))}
        </Stack>

        <Button onClick={addItem} variant="contained">
          Adicionar item
        </Button>
      </Stack>
    </Container>
  );
}

export { App };
