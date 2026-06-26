// src/services/data/datasetClient.js
const cache = new Map();

export const fetchDataset = async (filename) => {
  if (cache.has(filename)) {
    return cache.get(filename);
  }
  try {
    const response = await fetch(`/generated/${filename}`);
    if (!response.ok) throw new Error(`Failed to load ${filename}`);
    const data = await response.json();
    cache.set(filename, data);
    return data;
  } catch (error) {
    console.error(`Error fetching dataset ${filename}:`, error);
    return null;
  }
};
