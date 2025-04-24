import httpXml from "../../../infra/httpXml";
import { getXmlValue, getXmlChildren, getXmlNode, parseToXml } from "../../../infra/xmlConverts";
import { internalServerErrorResult, methodNotAllowed, successResult } from '../../../infra/apiResult';


export default async function handler(req, res) {

    if (req.method !== 'POST')
    {
        methodNotAllowed(res);
        return;
    }

   

    try { 
        const { token, password } = req.body;
        const xml = 
        `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <DownloadLaudo xmlns="http://tempuri.org/">
              <Token_cliente>${token}</Token_cliente>
              <senha_Cliente>${password}</senha_Cliente>
            </DownloadLaudo>
          </soap:Body>
        </soap:Envelope>`;

        const  { data } = await httpXml.post('http://biogenetics.fortiddns.com/BioWebENE/ServiceENE.asmx', xml);  


        const xmlBody = getXmlNode(data);
        const downloadResponse = getXmlNode(xmlBody);
        const downloadResult = getXmlNode(downloadResponse);
        const diffgr_diffgram = getXmlChildren(downloadResult, 'diffgr:diffgram');
        const newDataSet = getXmlNode(diffgr_diffgram);
        const dataDownload = getXmlNode(newDataSet);
        const dataDownloadXml = parseToXml(dataDownload);

        const mappedToken = {
            status : getXmlValue(getXmlChildren(dataDownloadXml, 'Status')),
            retorno : getXmlValue(getXmlChildren(dataDownloadXml, 'Retorno')),
        }

        successResult(res, mappedToken);
    } catch (error) {        
        console.log(error);
        internalServerErrorResult(res, 'Falha para consultar os detalhe do exame ' + codExam, error);
    }
}
  