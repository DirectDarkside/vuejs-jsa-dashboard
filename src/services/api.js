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
      data: []
    },
    {
      title: "Amazon",
      titleImgSrc: "amazon.png",
      data: []
    },
    {
      title: "Google",
      titleImgSrc: "google.png",
      data: []
    },
    {
      title: "Meta",
      titleImgSrc: "meta.png",
      data: []
    },
    {
      title: "Microsoft",
      titleImgSrc: "microsoft.png",
      data: []
    },
    {
      title: "Nvidia",
      titleImgSrc: "nvidia.png",
      data: []
    },
    {
      title: "Tesla",
      titleImgSrc: "tesla.png",
      data: []
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
