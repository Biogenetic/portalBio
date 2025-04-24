import httpXml from "../../../infra/httpXml";
import { getXmlValue, getXmlNode } from "../../../infra/xmlConverts";
import { internalServerErrorResult, methodNotAllowed, successResult } from '../../../infra/apiResult';
import { parseCookiesByName } from '../../../infra/cookies';

export default async function handler(req, res) {

    if (req.method !== 'POST')
    {
        methodNotAllowed(res);
        return;
    }

    try {        
        const { hash } = parseCookiesByName(req, 'biogUser');
        const { newPassword } = req.body;

        const xml = 
        `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                xmlns:xsd="http://www.w3.org/2001/XMLSchema"                    
                xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">        
          <soap:Body>                                                         
            <AlterarSenha xmlns="http://tempuri.org/">
                        <Chave_Seguranca>${hash}</Chave_Seguranca>
                        <NovaSenha>${newPassword}</NovaSenha>
                    </AlterarSenha>
            </soap:Body>    
          </soap:Envelope>`;
          const  { data } = await httpXml.post('http://biogenetics.fortiddns.com/BioWebNovo/Service.asmx', xml);    

          const xmlBody = getXmlNode(data);
          const changePasswordResponse = getXmlNode(xmlBody);
          const changePasswordResult = getXmlNode(changePasswordResponse);
          const changePasswordResultValue = getXmlValue(changePasswordResult)

          successResult(res, changePasswordResultValue);
    } catch (error) {        
        console.log('Occurred error in api/auth/change-password folder path. error =>' + error.toString());
        internalServerErrorResult(res, 'Ocorreu uma falha para realizar a troca de senha', error);
    }
}
  