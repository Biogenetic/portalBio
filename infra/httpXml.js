import axios from "axios";

const httpXml = axios.create({
    headers: {
      'Content-Type': 'text/xml',          
      'charset' : 'utf-8'
    }
})

export default httpXml;