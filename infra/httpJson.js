import axios from "axios";

const httpJson = axios.create({
    headers: {
      'Content-Type': 'application/json'
    }
})

export default httpJson;