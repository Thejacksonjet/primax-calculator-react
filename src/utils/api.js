// src/utils/api.js
import axios from 'axios';

// Mapping app tool names to API field names
const apiToolNameMapping = {
  'Drinkers (10L)': 'available_drinkers',
  'Feeders': 'available_feeders',
  'Plate Feeders': 'available_plate_feeders',
  'Thermal Lamps (250W)': 'available_thermal_lamps',
};

// Mapping API keys to app's display names for response
const toolNameMapping = {
  drinkers: 'Drinkers (10L)',
  feeders: 'Feeders',
  plate_feeders: 'Plate Feeders',
  thermal_lamp: 'Thermal Lamps (250W)',
  white_light_bulb: 'White Bulbs (7W)',
  thermometer: 'Thermometer',
  egg_trays: 'Egg Trays',
  wood_shavings: 'Wood Shavings',
};

// Mapping app chicken types to API breed_type values
const breedTypeMapping = {
  Hybrid: 'hybrid',
  Broilers: 'broiler',
  Layers: 'layer',
};

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.poultrycostcalc.com/v1',
});

export const calculatePoultryCost = async (chickenType, numberOfChickens, existingTools = {}) => {
  try {
    // Transform request payload
    const payload = {
      breed_type: breedTypeMapping[chickenType] || chickenType.toLowerCase(),
      chicken_quantity: parseInt(numberOfChickens, 10),
    };

    // Add existing tools to payload with integer parsing
    for (const [tool, quantity] of Object.entries(existingTools)) {
      const apiField = apiToolNameMapping[tool];
      if (apiField) {
        payload[apiField] = parseInt(quantity, 10) || 0; // Ensure integer, default to 0 if invalid
      }
    }

    console.log(`Sending API request for ${chickenType} with payload:`, JSON.stringify(payload, null, 2));

    const response = await API.post('/calculator/calculate', payload);

    console.log(`API response for ${chickenType}:`, JSON.stringify(response.data, null, 2));

    // Transform API response to app format
    const data = response.data;
    const items = [];

    // Log equipment details for debugging
    console.log('Equipment from API response:', JSON.stringify(data.equipment, null, 2));

    // Consumables
    Object.entries(data.consumables).forEach(([key, value]) => {
      if (key !== 'subtotal' && value.total_cost > 0) {
        items.push({
          item: key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()),
          quantity: value.quantity,
          cost: value.total_cost,
        });
      }
    });

    // Equipment
    Object.entries(data.equipment).forEach(([key, value]) => {
      if (key !== 'subtotal' && value.total_cost > 0) {
        const displayName = toolNameMapping[key] || key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
        items.push({
          item: displayName,
          quantity: value.quantity,
          cost: value.total_cost,
        });
      }
    });

    // Medications
    Object.entries(data.medications).forEach(([key, value]) => {
      if (key !== 'subtotal' && value.total_cost > 0) {
        items.push({
          item: key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase()),
          quantity: value.quantity,
          cost: value.total_cost,
        });
      }
    });

    console.log('Transformed items for CostTable:', JSON.stringify(items, null, 2));

    return {
      items,
      total: data.totals.total_cost,
      costPerChicken: data.totals.cost_per_chicken,
      estimatedDurationDays: data.totals.estimated_duration_days,
    };
  } catch (error) {
    console.error(`Error for ${chickenType} in calculatePoultryCost:`, {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw error;
  }
};