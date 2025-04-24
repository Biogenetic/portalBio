import { internalServerErrorResult, methodNotAllowed, successResult } from '../../../infra/apiResult';
import nodemailer from 'nodemailer';

const prefix =(type)=> "data:" + type + ";base64,"
const extensionfile = (type) => type.split('/')[1]

const senderMail = (req) => {
    return new Promise((resolve, reject) => {
        const {type, content, codigoExame } = req.body;
        
        const sender = nodemailer.createTransport({
            host : 'smtp.office365.com',    
            port: 587,
            secure: false,
            tls: {
                ciphers:'SSLv3'
            },
            auth: {
                user : 'autenticacao@biogenetics.com.br',
                pass : 'Law086582'
            }
        })
        
        const email = {
            from : 'autenticacao@biogenetics.com.br',
            to : 'atendimento@biogenetics.com.br',
            subject : `Anexo de arquivo no pedido de exame #${codigoExame}`,
            text : `Segue em anexo o arquivo realizado no pedido de exame #${codigoExame}`,
            attachments : [
                {
                    filename : `${codigoExame}.${extensionfile(type)}`,
                    path:  prefix(type) + content
                }
            ]
        }
    
        sender.sendMail(email, (error) => {
            if (error)
            {
                reject(error);
                return;
            }

            resolve();
        })
    })
}


export default async function handler(req, res) {

    if (req.method !== 'POST')
    {
        methodNotAllowed(res);
        return;
    }

    try {
      await senderMail(req);  
      successResult(res, 'Email de anexo enviado com sucesso');
    } catch (error) {
        console.log(error);
        internalServerErrorResult(res, 'Falha no envio de email', error);
    }
}
  