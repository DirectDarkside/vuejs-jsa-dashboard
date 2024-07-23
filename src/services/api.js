import axios from "axios";

const order = [
  "",
  "Mar 21",
  "Jun 21",
  "Sep 21",
  "Dec 21",
  "Mar 22",
  "Jun 22",
  "Sep 22",
  "Dec 22",
  "Mar 23",
  "3 Aug 23",
  "2 Nov 23",
  "1 Feb 24",
  "2 Mai 24",
];

class StockService {
  companyDatas = [
    {
      title: "Apple",
      titleImgSrc: "apple.png",
      revenueRow: 5,
      netIncomeRow: 36,
      grossMargin: 23,
      revenueData: [],
      netIncomeData: [],
      grossMarginData: [],
    },
    {
      title: "Amazon",
      titleImgSrc: "amazon.png",
      revenueRow: 9,
      netIncomeRow: 41,
      grossMargin: 15,
      revenueData: [],
      netIncomeData: [],
      grossMarginData: [],
    },
    {
      title: "Google",
      titleImgSrc: "google.png",
      revenueRow: 5,
      netIncomeRow: 41,
      grossMargin: 25,
      revenueData: [],
      netIncomeData: [],
      grossMarginData: [],
    },
    {
      title: "Meta",
      titleImgSrc: "meta.png",
      revenueRow: 5,
      netIncomeRow: 27,
      grossMargin: 11,
      revenueData: [],
      netIncomeData: [],
      grossMarginData: [],
    },
    {
      title: "Microsoft",
      titleImgSrc: "microsoft.png",
      revenueRow: 9,
      netIncomeRow: 30,
      grossMargin: 15,
      revenueData: [],
      netIncomeData: [],
      grossMarginData: [],
    },
    {
      title: "Nvidia",
      titleImgSrc: "nvidia.png",
      revenueRow: 5,
      netIncomeRow: 29,
      grossMargin: 11,
      revenueData: [],
      netIncomeData: [],
      grossMarginData: [],
    },
    {
      title: "Tesla",
      titleImgSrc: "tesla.png",
      revenueRow: 13,
      netIncomeRow: 44,
      grossMargin: 26,
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

  async getRevenue(sheetName) {
    const date = await this.fetchSheetData(sheetName);
    return order.map(key => date[3][key]);
  }
}

export const stockService = new StockService(); // export Singleton-Instance 
