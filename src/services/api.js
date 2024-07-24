import axios from "axios";

class StockService {
  companyDatas = [
    {
      title: "Apple",
      titleImgSrc: "apple.png",
      url: "fim91wicrbr01?sheet=$AAPL",
      revenueRow: 3,
      netIncomeRow: 34,
      grossMargin: 21,
      revenueData: [],
      netIncomeData: [],
      grossMarginData: [],
    },
    {
      title: "Amazon",
      titleImgSrc: "amazon.png",
      url: "fim91wicrbr01?sheet=$AMZN",
      revenueRow: 7,
      netIncomeRow: 39,
      grossMargin: 13,
      revenueData: [],
      netIncomeData: [],
      grossMarginData: [],
    },
    {
      title: "Google",
      titleImgSrc: "google.png",
      url: "fim91wicrbr01?sheet=$GOOG",
      revenueRow: 3,
      netIncomeRow: 39,
      grossMargin: 23,
      revenueData: [],
      netIncomeData: [],
      grossMarginData: [],
    },
    {
      title: "Meta",
      titleImgSrc: "meta.png",
      url: "fim91wicrbr01?sheet=$META",
      revenueRow: 3,
      netIncomeRow: 25,
      grossMargin: 9,
      revenueData: [],
      netIncomeData: [],
      grossMarginData: [],
    },
    {
      title: "Microsoft",
      titleImgSrc: "microsoft.png",
      url: "fim91wicrbr01?sheet=$MSFT",
      revenueRow: 7,
      netIncomeRow: 28,
      grossMargin: 13,
      revenueData: [],
      netIncomeData: [],
      grossMarginData: [],
    },
    {
      title: "Nvidia",
      titleImgSrc: "nvidia.png",
      url: "fim91wicrbr01?sheet=$NVDA",
      revenueRow: 3,
      netIncomeRow: 27,
      grossMargin: 9,
      revenueData: [],
      netIncomeData: [],
      grossMarginData: [],
    },
    {
      title: "Tesla",
      titleImgSrc: "tesla.png",
      url: "fim91wicrbr01?sheet=$TSLA",
      revenueRow: 11,
      netIncomeRow: 42,
      grossMargin: 24,
      revenueData: [],
      netIncomeData: [],
      grossMarginData: [],
    },
  ];

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

  async getData(sheetName, index) {
    const data = {};
    const date = await this.fetchSheetData(sheetName);
    const currentCompany = this.companyDatas[index];
    data.revenue = this.formatData(date[currentCompany.revenueRow]);
    data.netIncome = this.formatData(date[currentCompany.netIncomeRow]);
    data.grossMargin = this.formatData(date[currentCompany.grossMargin]);
    return data;
  }

  formatData(data) {
    let sortData = [];

    // 1. Schlüssel extrahieren und in ein Array umwandeln
    const keys = Object.keys(data);

    // 3. Schlüssel nach Datum sortieren
    keys.sort((a, b) => this.parseDate(a) - this.parseDate(b));

    // 4. Sortierte Schlüssel-Wert-Paare ausgeben
    for (const key of keys) {
      if(key.length != 0 && key != " @doppelgaengerio @pip_net" && key != "Release") {
        sortData.push({
          date: key,
          data: data[key],
        });
      }
    }
    return sortData;
  }

  // 2. Hilfsfunktion zum Parsen der Datumsangaben
  parseDate(dateStr) {
    const parts = dateStr.split(" ");
    if (parts.length === 1) return new Date(0); // Für leere Strings
    const day = parseInt(parts[0]);
    const monthAbbrev = parts[1];
    const year = parseInt(parts[2]) + 2000; // Annahme: 21. Jahrhundert

    const monthIndex = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      Mai: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    }[monthAbbrev];
    return new Date(year, monthIndex, day);
  }
}

export const stockService = new StockService(); // export Singleton-Instance
