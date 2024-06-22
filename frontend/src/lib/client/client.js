import axios from "axios";
import aniwave from "../app/source";
import { headers } from "./headers";
import { Get } from "../wailsjs/go/main/App";


axios.defaults.headers.common["Accept-Encoding"] = "gzip";

class clientClass {
  /**
   * Represents the Aniwave class.
   * @param {import("../types/source").Source} source - The source object.
   */
  constructor(source) {
    this.source = source;
    this.client = axios.create({
      baseURL: this.source.baseUrl,
      headers: headers,
    });
  }

  async get(url, options = {}) {
    const response = await Get(url, options);
    return response;
  }
}

const Client = new clientClass(aniwave);

export { Client };
