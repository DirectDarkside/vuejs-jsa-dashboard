import axios from "axios";

class StockService {
  companyDatas = [
    {
      title: "Apple",
      titleImgSrc: "apple.png",
      url: "szmcovl2hrz4z?sheet=$AAPL",
      revenueRow: 3,
      netIncomeRow: 34,
      grossMargin: 21,
      revenueData: [],
      netIncomeData: [],
      grossMarginData: [],
    },
    // {
    //   title: "Amazon",
    //   titleImgSrc: "amazon.png",
    //   url: "szmcovl2hrz4z?sheet=$AMZN",
    //   revenueRow: 7,
    //   netIncomeRow: 41,
    //   grossMargin: 15,
    //   revenueData: [],
    //   netIncomeData: [],
    //   grossMarginData: [],
    // },
    // {
    //   title: "Google",
    //   titleImgSrc: "google.png",
    //   revenueRow: 5,
    //   netIncomeRow: 41,
    //   grossMargin: 25,
    //   revenueData: [],
    //   netIncomeData: [],
    //   grossMarginData: [],
    // },
    // {
    //   title: "Meta",
    //   titleImgSrc: "meta.png",
    //   revenueRow: 5,
    //   netIncomeRow: 27,
    //   grossMargin: 11,
    //   revenueData: [],
    //   netIncomeData: [],
    //   grossMarginData: [],
    // },
    // {
    //   title: "Microsoft",
    //   titleImgSrc: "microsoft.png",
    //   revenueRow: 9,
    //   netIncomeRow: 30,
    //   grossMargin: 15,
    //   revenueData: [],
    //   netIncomeData: [],
    //   grossMarginData: [],
    // },
    // {
    //   title: "Nvidia",
    //   titleImgSrc: "nvidia.png",
    //   revenueRow: 5,
    //   netIncomeRow: 29,
    //   grossMargin: 11,
    //   revenueData: [],
    //   netIncomeData: [],
    //   grossMarginData: [],
    // },
    // {
    //   title: "Tesla",
    //   titleImgSrc: "tesla.png",
    //   revenueRow: 13,
    //   netIncomeRow: 44,
    //   grossMargin: 26,
    //   revenueData: [],
    //   netIncomeData: [],
    //   grossMarginData: [],
    // },
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
      sortData.push({
        date: key,
        data: data[key],
      });
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
