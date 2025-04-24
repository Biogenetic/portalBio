import React, { useContext, useEffect, useState } from "react"
import { LayoutContext } from "../../contexts/LayoutContext";
import { Row, Col, List, Card, Spin, message, Button, Tooltip } from "antd";
import { CheckCircleFilled, ExclamationCircleFilled, CloudDownloadOutlined, WhatsAppOutlined, InboxOutlined } from "@ant-design/icons"
import { attachFile, getExamDetail, download } from "../../services/exams";
import toBase64 from "../../infra/toBase64";
import _isArray from "lodash/isArray"
import _get from "lodash/get"
import AppCard from "../../components/app-card/AppCard";
import DashboardLabel from "../../components/dashboard-label/DashboardLabel";
import ExamFilesModal from "../../components/exams/ExamFilesModal";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../contexts/AuthContext";


export default function Detalhe() {
    const { setTitleAndSubTitle, setBreadcrumbs } = useContext(LayoutContext);
    const { redirectIfNotAuthenticate } = useContext(AuthContext);

    const [exam, setExam] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDownloadExam, setIsDownloadExam] = useState(false);
    const [isAttachFileVisible, setIsAttachFileVisible] = useState(false)

    useEffect(() => {
        if (redirectIfNotAuthenticate()) {
            return;
        }

        const params = new URLSearchParams(window.location.search);
        const codigoExameParam = params.get("codigoExame");
        setTitleAndSubTitle(`#${codigoExameParam}`, "Gerencie o pedido de exame.");
        setBreadcrumbs([
            {
                title: "Inicio",
                url: "dashboard",
                isSideBarItem: true
            },
            {
                title: "Meus Exames",
                url: "/exames/consulta",
                isSideBarItem: true
            },
            {
                title: `#${codigoExameParam}`,
                url: `/exames/${codigoExameParam}`,
                isSideBarItem: true
            }
        ]);
        loadExamData(codigoExameParam);
    }, [])

    const loadExamData = async (codigoExame) => {
        try {
            setIsLoading(true);
            const { data } = await getExamDetail(codigoExame);
            if (data.result)
                setExam(data.result);
        } catch (error) {
            console.log(error);
            message.error("Falha para carregar dados do exame selecionado");
        }
        finally {
            setIsLoading(false);
        }
    }

    const openAttachFileModal = (e) => {
        e.preventDefault();
        setIsAttachFileVisible(true);
    }

    const onPrintExamHandler = async () => {
        try {
            setIsDownloadExam(true);
            const { data } = await download({ codExam: exam.codigoExame });
            window.open(data.result.url, "_blank");
        } catch (error) {
            console.log(error);
            message.error("Ocorreu uma falha para baixar laudo do exame")
        }
        finally {
            setIsDownloadExam(false);
        }

    }

    const onAttachFileHandler = async (file) => {
        try {
            await attachFile({
                type: file.type,
                content: await toBase64(file),
                codigoExame: exam.codigoExame
            });
            setIsAttachFileVisible(false);
            message.success("Email do anexo foi enviado com sucesso");
        } catch (err) {
            console.log(err);
            message.error("Falha para anexar arquivo no exame");
        }
    }

    const onSendWhatsappMessage = () => {
        window.open(`https://api.whatsapp.com/send?phone=%2B5534999696012&text=Estou%20enviado%20um%20documento%20via%20portal%20conveniado%2C%20referente%20ao%20Pedido%20%23${exam.codigoExame}`, "_blank");
    }

    const statusText = exam?.percentuaAndamento === "100" ? "Concluído" : "Em andamento"
    const shipping = _get(exam, "tipoEnvioLaudo", "-")
    const pendencias = _get(exam, "pendenciasExame", ["Sem pendências"])

    const statusStyle = {
        color: exam?.percentuaAndamento === "100" ? "#128934" : "#1890ff",
        marginRight: "4px",
        fontSize: 16,
    }

    return (
        <>
            <Helmet>
                <title>Meus exames - BioGenetics</title>
            </Helmet>
            {
                isLoading ?
                    <Spin></Spin>
                    :
                    exam &&
                    <>
                        <AppCard
                            title="Pacientes"
                            extra={
                                <Button
                                    type="primary"
                                    style={{ textDecoration: "underline" }}
                                    onClick={onPrintExamHandler}
                                    loading={isDownloadExam}>
                                    <CloudDownloadOutlined />
                                    Baixar Laudo
                                </Button>
                            }
                        >

                            <Row>
                                <Col span={20}>
                                    <p>{exam.pessoas}</p>
                                </Col>
                            </Row>
                        </AppCard>

                        <AppCard title={exam.Exame}>
                            <Row>
                                <Col xs={24} lg={7} xl={6}>
                                    <DashboardLabel title="Controle laboratorial" >
                                        {exam.controlLab}
                                    </DashboardLabel>
                                </Col>

                                <Col xs={24} lg={4} xl={5}>
                                    <DashboardLabel title="Modalidade" >
                                        {exam.tipoExame}
                                    </DashboardLabel>
                                </Col>
                                <Col xs={24} lg={5} xl={5}>
                                    <DashboardLabel title="Tipo de envio" >
                                        {shipping}
                                        {exam.envioFisico !== "false" && exam.codRastreio && (
                                            <a
                                                href="https://www2.correios.com.br/sistemas/rastreamento/default.cfm"
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{
                                                    marginLeft: "6px",
                                                    textDecoration: "underline",
                                                    fontSize: 14,
                                                }}
                                            >
                                                {exam.CodRastreio}
                                            </a>
                                        )}
                                    </DashboardLabel>
                                </Col>
                                <Col xs={24} lg={4} xl={4}>
                                    <DashboardLabel title="Bonificação" >
                                        {exam.bonificado}
                                    </DashboardLabel>
                                </Col>
                                <Col xs={24} lg={4} xl={4}>
                                    <DashboardLabel title="Judicial" >
                                        {exam.judicial}
                                    </DashboardLabel>
                                </Col>
                                <Col xs={24} lg={24} className="mt24">
                                    <DashboardLabel title="Status" >
                                        <CheckCircleFilled style={statusStyle} />
                                        {statusText}. O exame encontra-se em: {exam.setorExame}.
                                    </DashboardLabel>
                                </Col>
                            </Row>
                        </AppCard>

                        <Row gutter={16}>
                            <Col xs={{ span: 24 }} lg={{ span: 10 }}>
                                <AppCard
                                    title="Pendências"
                                    extra={
                                        <Card.Meta
                                            avatar={
                                                <ExclamationCircleFilled
                                                    style={{
                                                        color: "#f6ae42",
                                                        width: 20,
                                                        height: 20,
                                                        fontSize: 19,
                                                    }}
                                                />
                                            }
                                        />
                                    }
                                >
                                    <List
                                        size="large"
                                        dataSource={_isArray(pendencias) ? pendencias : [pendencias]}
                                        renderItem={(item, index) => (
                                            <>
                                                <List.Item key={index} style={{ padding: "8px 24px" }}>
                                                    {item}
                                                </List.Item>
                                            </>
                                        )}
                                    />
                                </AppCard>

                            </Col>
                            <Col xs={{ span: 24 }} lg={{ span: 14 }} className="mt24 mt0-m mt0-l">
                                <AppCard
                                    title="Anexos"
                                    extra={
                                        <>
                                            <Tooltip title="Enviar via Whatsapp">
                                                <Button
                                                    type="success"
                                                    style={{ textDecoration: "underline", marginRight: "4px" }}
                                                    onClick={onSendWhatsappMessage}>
                                                    <WhatsAppOutlined />
                                                </Button>
                                            </Tooltip>

                                            <Button style={{ textDecoration: "underline" }} onClick={openAttachFileModal}>
                                                <InboxOutlined />
                                                Anexar novo arquivo
                                            </Button>
                                        </>

                                    }
                                >
                                    <p className="ma0 fw4">Os anexos podem ser encaminhados via Whatsapp pelo botão acima ou anexados e enviados por e-mail para sabio@biogenetics.com.br</p>
                                </AppCard>
                            </Col>
                        </Row>

                        <ExamFilesModal
                            isVisible={isAttachFileVisible}
                            onCancel={() => setIsAttachFileVisible(false)}
                            onAttachFile={onAttachFileHandler}
                        />
                    </>
            }
        </>


    )
}