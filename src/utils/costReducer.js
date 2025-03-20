// src/utils/costReducer.js
export const toolCosts = {
    'Drinkers (10L)': 8000,
    'Feeders': 5000,
    'Plate Feeders': 5000,
    'Thermal Lamps (250W)': 15000,
    'White Bulbs (7W)': 3500,
    'Thermometer': 15000,
  };
  
  export const reduceCosts = (data, existingTools) => {
    if (!data || !data.items) return data;
  
    let totalReduction = 0;
    const adjustedItems = data.items.map((item) => {
      const quantityOwned = existingTools[item.item] || 0;
      if (quantityOwned > 0 && toolCosts[item.item]) {
        // Assume API provides quantity needed for the given number of chickens
        const requiredQuantity = item.quantity;
        const quantityToBuy = Math.max(0, requiredQuantity - quantityOwned);
        const costPerUnit = toolCosts[item.item];
        const reduction = (requiredQuantity - quantityToBuy) * costPerUnit;
        totalReduction += reduction;
        return { ...item, cost: Math.max(0, item.cost - reduction) };
      }
      return item;
    });
  
    return {
      ...data,
      total: Math.max(0, data.total - totalReduction),
      items: adjustedItems,
    };
  };