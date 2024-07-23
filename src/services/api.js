import axios from "axios";

class StockService {
  constructor() {
    this.api = axios.create({
      baseURL: "https://sheetdb.io/api/v1/",
    });
  }

  async fetchSheetData(sheetId) {
    try {
      const response = await this.api.get(sheetId);
      return response.data;
    } catch (error) {
      console.error("Cannot load the Data:", error);
      throw error; // Fehler weitergeben zur Behandlung in der Komponente
    }
  }
}

export const stockService = new StockService(); // export Singleton-Instance 
