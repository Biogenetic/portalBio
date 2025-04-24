import httpXml from "../../../infra/httpXml";
import { getXmlValue, getXmlChildren, getXmlNode, parseToXml } from "../../../infra/xmlConverts";
import { internalServerErrorResult, methodNotAllowed, successResult } from '../../../infra/apiResult';
import { parseCookiesByName } from '../../../infra/cookies';

function formatDate(date) {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}


export default async function handler(req, res) {

    if (req.method !== 'GET')
    {
        methodNotAllowed(res);
        return;
    }

    try {
        const { hash } = parseCookiesByName(req, 'biogUser');

        const { isSearch } = req.query;
        let xml = '';
        if (isSearch)
        {
          const { codigoExame, exame, pessoas, pendencias, dataInicioEntrada, dataFimEntrada, dataInicioEntrega, dataFimEntrega } = req.query;
          
          xml = `<?xml version="1.0" encoding="utf-8"?>
          <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
              <ListagemExamesFiltro xmlns="http://tempuri.org/">
                <Chave_Seguranca>${hash}</Chave_Seguranca>      
                <codigo>${codigoExame ? codigoExame : ''}</codigo>
                <tipoExame></tipoExame>
                <bonificacao></bonificacao>
                <Pendencia>${pendencias ? pendencias : ''}</Pendencia>
                <Judicial></Judicial>
                <dataInicioEntrada>${dataInicioEntrada ? formatDate(dataInicioEntrada) : ''}</dataInicioEntrada>
                <dataFimEntrada>${dataFimEntrada ? formatDate(dataFimEntrada) : ''}</dataFimEntrada>
                <dataInicioEntrega>${dataInicioEntrega ? formatDate(dataInicioEntrega) : ''}</dataInicioEntrega>
                <dataFimEntrega>${dataFimEntrega ? formatDate(dataFimEntrega) : ''}</dataFimEntrega>
                <Participantes>${pessoas ? pessoas : ''}</Participantes>
                <Exame>${exame ? exame : ''}</Exame>
              </ListagemExamesFiltro>
            </soap:Body>
          </soap:Envelope>`
        }
        else {
          xml = 
          `<?xml version="1.0" encoding="utf-8"?>
          <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
              <ListagemExames xmlns="http://tempuri.org/">
                <Chave_Seguranca>${hash}</Chave_Seguranca>
              </ListagemExames>
            </soap:Body>
          </soap:Envelope>`;
  
          
        }
        
        const  { data } = await httpXml.post('http://biogenetics.fortiddns.com/BioWebNovo/Service.asmx', xml);   

        const xmlBody = getXmlNode(data);
        const listExamResponse = getXmlNode(xmlBody);
        const listExamResult = getXmlNode(listExamResponse);
        const diffgr_diffgram = getXmlChildren(listExamResult, 'diffgr:diffgram');
        const exams = getXmlChildren(diffgr_diffgram, 'Exames');


        if (! exams)
        {
           successResult(res,  []);
           return;
        }

        const examsXml = parseToXml(exams);        

        const mappedExams = examsXml.childNodes().map(currentExam => {
            return {
                codigoExame : getXmlValue(getXmlChildren(currentExam, 'CodigoExame')),
                controlLab : getXmlValue(getXmlChildren(currentExam, 'ControlLab')),
                data : getXmlValue(getXmlChildren(currentExam, 'Data')),
                previsao : getXmlValue(getXmlChildren(currentExam, 'Previsão')),
                entrada : getXmlValue(getXmlChildren(currentExam, 'Entrada')),  
                exame : getXmlValue(getXmlChildren(currentExam, 'Exame')),
                tipoExame : getXmlValue(getXmlChildren(currentExam, 'TipoExame')),
                judicial : getXmlValue(getXmlChildren(currentExam, 'Judicial')),
                percentuaAndamento : getXmlValue(getXmlChildren(currentExam, 'PercentuaAndamento')),
                bonificado : getXmlValue(getXmlChildren(currentExam, 'Bonificado')),
                valor : getXmlValue(getXmlChildren(currentExam, 'Valor')),
                valorPagSeguro : getXmlValue(getXmlChildren(currentExam, 'ValorPagSeguro')),
                valorAberto : getXmlValue(getXmlChildren(currentExam, 'ValorAberto')),
                pessoas : getXmlValue(getXmlChildren(currentExam, 'Pessoas')),
                examePago : getXmlValue(getXmlChildren(currentExam, 'ExamePago')),
                pendencias : getXmlValue(getXmlChildren(currentExam, 'Pendencias')),
                laudoJaBaixado : getXmlValue(getXmlChildren(currentExam, 'Pendencias')) === "Sim",
                nomeLaudoSite : getXmlValue(getXmlChildren(currentExam, 'NomeLaudoSite')),
                entrega: getXmlValue(getXmlChildren(currentExam, 'Entrega')),
            }
        }) 
        successResult(res, mappedExams);
    } catch (error) {        
        console.log(error);
        internalServerErrorResult(res, 'Falha para consultar exames', error);
    }
}
  