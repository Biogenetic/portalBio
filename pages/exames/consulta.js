import React, { useContext, useEffect, useState} from 'react';
import { CloudDownloadOutlined } from "@ant-design/icons";
import { Badge, Table, message } from "antd";
import { LayoutContext } from '../../contexts/LayoutContext';
import { getExams, download } from '../../services/exams';
import Link from 'next/link';
import AppCard from '../../components/app-card/AppCard';
import ExamFilterForm from '../../components/exams/ExamFilterForm';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../contexts/AuthContext';
import { sorterDate, sorterNumber, sorterString } from '../../infra/sorters';


export default function Consulta() {
    const { setTitleAndSubTitle, setBreadcrumbs } = useContext(LayoutContext);
    const { redirectIfNotAuthenticate } = useContext(AuthContext);
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = [   
      {
        title: "Entrada",
        dataIndex: "entrada"  ,
        key: "entrada",            
        sortDirections: ['descend'],
        sorter: (a, b) => sorterDate(a.entrada, b.entrada)
      },
      {
        title: "Previsão",
        dataIndex: "previsao"  ,
        key: "previsao",            
        sortDirections: ['descend'],
        sorter: (a, b) => sorterDate(a.previsao, b.previsao)
      },      {
        title: "Entrega",
        dataIndex: "entrega"  ,
        key: "entrega",            
        sortDirections: ['descend'],
        sorter: (a, b) => sorterDate(a.entrega, b.entrega),
      },
      {
        title: "#Pedido",
        dataIndex: "codigoExame",
        key: "codigoExame",                
        defaultSortOrder: 'descend',
        sorter: (a, b) => sorterNumber(a.codigoExame, b.codigoExame),
      },
      {
        title: "Paciente(s)",
        dataIndex: "pessoas",
        key: 'pessoas',
        width: "auto",
        sorter: (a, b) => sorterString(a.pessoas, b.pessoas),        
        render: (text, record) => {
          return (
            <Link href={`/exames/detalhe?codigoExame=${record.codigoExame}`}>                
              <a>{text}</a>
            </Link>
          )
        }    
      },
      {
        title: "Exame",
        dataIndex: "exame",
        key: "exame",        
        sorter: (a, b) => sorterString(a.exame, b.exame),  
      },
      {
        title: "Pendências",
        dataIndex: "pendencias",
        key: "pendencias",
        valueEnum: {
          Sim: { text: "Sim" },
          Não: { text: "Não" },
        },
        sorter: (a, b) => sorterString(a.pendencias, b.pendencias),
      },
      {
        title: "Status",
        dataIndex: "percentuaAndamento",
        key: "percentuaAndamento",
        width: 150,
        render: text => {
          if (text < 20) {
            return <Badge status="default" text="Em análise" />
          }
          if (text < 100) {
            return <Badge status="processing" text="Em andamento" />
          }
          return <Badge status="success" text="Concluído" />
        },
        sorter: (a, b) => sorterNumber(a.percentuaAndamento, b.percentuaAndamento),
      },
     {
        title: "Ações",
        dataIndex: "nomeLaudoSite",
        key: "nomeLaudoSite",
        width: "150px",
        align: 'right',
        render: (link, record) => {
          if (link) {
            return (
              <Link href={link} >
                <a target="_blank" onClick={(e)=> onPrintExamHandler(e, record)}>
                  {record.laudoJaBaixado && "Laudo baixado "}
                  <CloudDownloadOutlined
                    style={{ color: "#414141", fontSize: "19px" }}
                  />
                </a>
              </Link>

            )
          }
        },
        hideInSearch: true,
      }
    ]    

    const loadExams = async (params) => {      
      try {
        setLoading(true);  
        const { data } = await getExams(params);
        setExams(data.result);
      } catch (error) {
        console.log(error);
        message.error('Falha para consultar os pedidos de exames');
      }
      finally {        
        setLoading(false);  
      }
    }

    const onFilter = (fields) => {
      loadExams(
        {
          isSearch : true,
          ...fields
        });
    }

    const onFilterCancel = () => {
      loadExams({ isSearch : false });
    }

    const onPrintExamHandler = (e, record) => {  
      download({codExam : record.codigoExame});
    }

    useEffect(() => {        
     if (redirectIfNotAuthenticate())
     {
        return;
     }  
     setTitleAndSubTitle("Meus exames", "Visualize e gerencie os seus pedidos de exames.");
     setBreadcrumbs([
          {
              title: 'Inicio',
              url : 'dashboard',
              isSideBarItem : true
          },
          {
              title: 'Meus Exames',
              url : 'exames/consulta',
              isSideBarItem : true
          }
     ]);    
      
      loadExams({isSearch : false}); 
    }, []);
    
    return (
        <>
          <Helmet>
            <title>Meus exames - BioGenetics</title>
          </Helmet>
          <AppCard>
            <ExamFilterForm onFilter={onFilter} onCancel={onFilterCancel}/>
          </AppCard>
          <AppCard title="Lista de Pedidos">
            <Table 
              locale={{ emptyText: 'Nenhum pedido de exame foi localizado' }}
              loading={loading}
              dataSource={exams} 
              columns={columns}
              rowKey={record => record.codigoExame}
              scroll={{x : 400 }}
              pagination={{
                defaultPageSize: 10, 
                showSizeChanger: true, 
                pageSizeOptions: ['10', '20', '30'],
                position: ['bottomRight']
              }}/>
          </AppCard>
        </>
    )
}

