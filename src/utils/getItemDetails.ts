export type Item = {
  id: string;
  name: string;
  price: string;
  unit: string;
  inStock: string;
  stockKeeping: string;
  brand: string;
};

const ItemDetails: Item[] = [
  {
    id: "1",
    name: "Laptop",
    price: "1000",
    unit: "unit",
    inStock: "5",
    stockKeeping: "6",
    brand: "Apple",
  },
  {
    id: "2",
    name: "Tomatoes",
    price: "100",
    unit: "kg",
    inStock: "10",
    stockKeeping: "20",
    brand: "No Brand",
  },
  {
    id: "3",
    name: "Potatoes",
    price: "300",
    unit: "Kg",
    inStock: "40",
    stockKeeping: "50",
    brand: "No Brand",
  },
  {
    id: "4",
    name: "Biscuit",
    price: "100",
    unit: "unit",
    inStock: "100",
    stockKeeping: "200",
    brand: "Maliban",
  },
  {
    id: "5",
    name: "Tea",
    price: "110",
    unit: "Kg",
    inStock: "100",
    stockKeeping: "100",
    brand: "Dilmah",
  },
  {
    id: "6",
    name: "Chips",
    price: "250",
    unit: "unit",
    inStock: "200",
    stockKeeping: "300",
    brand: "Kist",
  },
];

export const getItemDetails = () => {
  const newData = ItemDetails.map((item) => {
    const unitLabel = item.unit.toLowerCase() === "kg" ? "KG" : "Unit";
    const stockKeepingUnitLabel =
      item.unit.toLowerCase() === "kg" ? "KG" : "Unit";

    const formattedInStock =
      item.unit.toLowerCase() === "kg"
        ? `${item.inStock}${unitLabel}`
        : item.inStock;

    const formattedStockKeeping =
      item.unit.toLowerCase() === "kg"
        ? `${item.stockKeeping}${stockKeepingUnitLabel}`
        : item.stockKeeping;

    return {
      id: item.id,
      name: item.name,
      price: `${item.price}.00 (${unitLabel})`,
      unit: item.unit,
      inStock: `${formattedInStock} /${formattedStockKeeping}`,
      stockKeeping:
        item.unit.toLowerCase() === "kg"
          ? `${formattedStockKeeping}`
          : `${item.stockKeeping}`,
      brand: item.brand,
    };
  });

  return newData;
};
