import httpXml from "../../../infra/httpXml";
import { getXmlValue, getXmlChildren, getXmlNode } from "../../../infra/xmlConverts";
import { internalServerErrorResult, methodNotAllowed, successResult } from '../../../infra/apiResult';

export default async function handler(req, res) {

    if (req.method !== 'POST')
    {
        methodNotAllowed(res);
        return;
    }

    try {
        const { username, password } = req.body;

        const xml = 
        `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                xmlns:xsd="http://www.w3.org/2001/XMLSchema"                    
                xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">        
          <soap:Body>                                                         
            <Login2 xmlns="http://tempuri.org/">                              
              <UsuarioCliente>${username}</UsuarioCliente>     
              <senha_cliente>${password}</senha_cliente>                           
              <senhaWeb>(WRbiog280811)*</senhaWeb>                            
            </Login2>     
          </soap:Body>    
          </soap:Envelope>`;
          const  { data } = await httpXml.post('http://biogenetics.fortiddns.com/BioWebNovo/Service.asmx', xml);    


          const xmlBody = getXmlNode(data);
          const loginResponse = getXmlNode(xmlBody);   
          const loginResult = getXmlNode(loginResponse,);
          const diffgr_diffgram = getXmlChildren(loginResult, 'diffgr:diffgram');
          const documentElement =  getXmlNode(diffgr_diffgram);
          const login =  getXmlNode(documentElement);
          const hash = getXmlChildren(login, 'Hash');
          const hashValue = getXmlValue(hash);

          successResult(res, hashValue);
    } catch (error) {        
        console.log('Occurred error in api/auth/login folder path. error =>' + error.toString());
        internalServerErrorResult(res, 'Usuário ou senha invalido', error);
    }
}
  