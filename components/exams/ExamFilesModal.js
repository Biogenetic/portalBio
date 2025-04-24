import React, {useState} from 'react';
import { Modal, Button, Upload, message } from 'antd'
import { InboxOutlined} from '@ant-design/icons'

const { Dragger } = Upload;

const ExamFilesModal = ({isVisible, onCancel, onAttachFile}) => {
    const [files, setFiles] = useState([]);

    const beforeUploadHandler = (file) => {

        if (file.type.includes('jpg') ||
           file.type.includes('jpeg') || 
            file.type.includes('png') || 
            file.type.includes('gif') || 
            file.type.includes('pdf') || 
            file.type.includes('doc') || 
            file.type.includes('docx'))
        {
            setFiles([file]);
            message.success('Anexo selecionado com sucesso');
            return true;
        }
        else 
        {
            setFiles([]);            
            message.error('Extensão do arquivo não é permitida');
            return false;
        }    
    }

    return (
        <Modal 
            visible={isVisible}
            title="Envio eletrônico de documentos"
            onCancel={onCancel}
            footer={
                [
                    <Button key="cancel" onClick={() => onCancel()}>
                        Cancelar
                    </Button>,
                    <Button 
                        key="attachFile" 
                        type="primary"
                        onClick={() => onAttachFile(files[0])}>
                        Concluir
                    </Button>,
                ]
            }
            >   
            <p>
                Enviar comprovante de pagamento, declaração e documento geral. Arquivos digitalizados dos comprovantes de pagamento, extensões (*.jpg, *gif, *pdf, *doc, *docx)
            </p>
            <Dragger fileList={files} beforeUpload={beforeUploadHandler}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p>Clique ou arraste o arquivo para esta área.</p>
             </Dragger>

        </Modal>
    )
}

export default ExamFilesModal;