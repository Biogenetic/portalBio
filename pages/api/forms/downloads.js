import httpXml from "../../../infra/httpXml";
import { getXmlValue, getXmlChildren, getXmlNode, parseToXml } from "../../../infra/xmlConverts";
import { internalServerErrorResult, methodNotAllowed, successResult } from '../../../infra/apiResult';
import { parseCookiesByName } from '../../../infra/cookies';


export default async function handler(req, res) {

    if (req.method !== 'GET')
    {
        methodNotAllowed(res);
        return;
    }

    const { hash } = parseCookiesByName(req, 'biogUser');

    try {
        const xml = 
        `<?xml version="1.0" encoding="utf-8"?>
            <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
                <ListarDownloads xmlns="http://tempuri.org/">
                    <Chave_Seguranca>${hash}</Chave_Seguranca>
                </ListarDownloads>
            </soap:Body>
        </soap:Envelope>`;

        const  { data } = await httpXml.post('http://biogenetics.fortiddns.com/BioWebNovo/Service.asmx', xml);    

        const xmlBody = getXmlNode(data);
        const listFormResponse = getXmlNode(xmlBody);
        const listFormResult = getXmlNode(listFormResponse);
        const diffgr_diffgram = getXmlChildren(listFormResult, 'diffgr:diffgram');
        const listForms = getXmlNode(diffgr_diffgram);

        if (! listForms)
        {
            successResult(res, []);
            return;
        }

        const listFormsXml = parseToXml(listForms);    
        const mappedForms = listFormsXml.childNodes().map(currentForm => {
  

            return {
                id : getXmlValue(getXmlChildren(currentForm, 'ID')),                
                categoriaId : getXmlValue(getXmlChildren(currentForm, 'Categoria_ID')),
                categoriaDescricao : getXmlValue(getXmlChildren(currentForm, 'Categoria_Descrição')),
                descricao : getXmlValue(getXmlChildren(currentForm, 'Descricao')),
                codigoDocumento : getXmlValue(getXmlChildren(currentForm, 'CodigoDocumento')),
                token : getXmlValue(getXmlChildren(currentForm, 'Token'))
            }
        });

        successResult(res, mappedForms);
    } catch (error) {        
        console.log(error);
        internalServerErrorResult(res, 'Falha para consultar a lista de formulários', error);
    }
}
  