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
    const { codExam } = req.query;

    try {
        const xml = 
        `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
          <DetalhesExame xmlns="http://tempuri.org/">
            <ID_Exame>${codExam}</ID_Exame>
            <Chave_Seguranca>${hash}</Chave_Seguranca>
          </DetalhesExame>
          </soap:Body>
        </soap:Envelope>`;

        const  { data } = await httpXml.post('http://biogenetics.fortiddns.com/BioWebNovo/Service.asmx', xml);    

        const xmlBody = getXmlNode(data);
        const examDetailResponse = getXmlNode(xmlBody);
        const detailExamResult= getXmlNode(examDetailResponse);
        const diffgr_diffgram = getXmlChildren(detailExamResult, 'diffgr:diffgram');
        const examDetail = getXmlChildren(diffgr_diffgram, 'DetalheExame');        
        const exam = getXmlChildren(examDetail, 'Exame');
        const examXml = parseToXml(exam);

        const mappedExam = {
            codigoExame : getXmlValue(getXmlChildren(examXml, 'CodEntrevista')),
            controlLab : getXmlValue(getXmlChildren(examXml, 'ControlLab')),
            data : getXmlValue(getXmlChildren(examXml, 'Data')),
            tipoExame : getXmlValue(getXmlChildren(examXml, 'TipoExame')),
            exame : getXmlValue(getXmlChildren(examXml, 'Exame')),
            bonificado : getXmlValue(getXmlChildren(examXml, 'Bonificado')),            
            judicial: getXmlValue(getXmlChildren(examXml, 'Judicial')),
            pessoas : getXmlValue(getXmlChildren(examXml, 'Pessoas')),
            percentuaAndamento : getXmlValue(getXmlChildren(examXml, 'PercentuaAndamento')),
            valor : getXmlValue(getXmlChildren(examXml, 'Valor')),
            valorPagSeguro : getXmlValue(getXmlChildren(examXml, 'ValorPagSeguro')),
            valorAberto : getXmlValue(getXmlChildren(examXml, 'ValorAberto')),
            coleta: getXmlValue(getXmlChildren(examXml, 'Coleta')),
            envioEletronico: getXmlValue(getXmlChildren(examXml, 'EnvioEletronico')),
            envioFisico: getXmlValue(getXmlChildren(examXml, 'EnvioFisico')),
            downloadSite: getXmlValue(getXmlChildren(examXml, 'DownloadSite')),
            examePago : getXmlValue(getXmlChildren(examXml, 'ExamePago')),
            setorExame : getXmlValue(getXmlChildren(examXml, 'SetorExame')),
            pendenciasExame : getXmlValue(getXmlChildren(examXml, 'PendenciasExame'))
        }
        successResult(res, mappedExam);
    } catch (error) {        
        console.log(error);
        internalServerErrorResult(res, 'Falha para consultar os detalhe do exame ' + codExam, error);
    }
}
  