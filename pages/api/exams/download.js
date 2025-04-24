import httpXml from "../../../infra/httpXml";
import { getXmlValue, getXmlChildren, getXmlNode, parseToXml } from "../../../infra/xmlConverts";
import { internalServerErrorResult, methodNotAllowed, successResult } from '../../../infra/apiResult';
import { parseCookiesByName } from '../../../infra/cookies';


export default async function handler(req, res) {

  if (req.method !== 'POST') {
    methodNotAllowed(res);
    return;
  }

  const { hash } = parseCookiesByName(req, 'biogUser');
  const { codExam } = req.body;

  try {
    const xml =
      `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <DownloadLaudo xmlns="http://tempuri.org/">
              <Chave_Seguranca>${hash}</Chave_Seguranca>
              <CodExame>${codExam}</CodExame>
            </DownloadLaudo>
          </soap:Body>
        </soap:Envelope>`;
    const { data } = await httpXml.post('http://biogenetics.fortiddns.com/BioWebPortal/Service.asmx', xml);

    const xmlBody = getXmlNode(data);
    const downloadResponse = getXmlNode(xmlBody);
    const downloadResult = getXmlNode(downloadResponse);
    const diffgr_diffgram = getXmlChildren(downloadResult, 'diffgr:diffgram');
    const dsDownload = getXmlNode(diffgr_diffgram);
    const xmlData = getXmlNode(dsDownload);

    successResult(res, {
      url: getXmlValue(getXmlChildren(xmlData, 'Retorno'))
    });
  } catch (error) {
    console.log(error);
    internalServerErrorResult(res, 'Falha para consultar os detalhe do exame ' + codExam, error);
  }
}
