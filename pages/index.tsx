import {
  Button,
  Image,
  Modal,
  Form,
  Cascader,
  DatePicker,
  message,
} from "antd";
import moment from "moment";
import Head from "next/head";
import { useEffect, useState } from "react";
import useAuth from "../auth/AuthContext";
import Layout from "../components/Layout";
import { fetchConToken } from "../helpers/fetch";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const { session } = useAuth();
  const [referencePointSections, setReferencePointSections] = useState([]);
  const [data, setData] = useState([]);
  const modalState = (state: boolean) => {
    setShowModal(state);
  };
  const onFinish = async (data: any) => {
    // console.log(data);
    data.arriveDate = data.arriveDate.format("YYYY-MM-DD");
    data.user = session.data.usr_document;
    const resp = await fetchConToken("visit", data, "POST");
    const body = await resp.json();
    if (body.ok) {
      message.success("Visita planeada con éxito");
      modalState(false);
    } else {
      message.error("Ha ocurrido un érror");
      modalState(false);
    }
  };
  // console.log(session);
  const getData = async () => {
    const resp = await fetchConToken("referencePointSection");
    const body = await resp.json();
    const cascaderOpt = body.results.map((e: any) => {
      return { value: e.rps_id, label: e.rps_name };
    });
    setData(body.results);
    setReferencePointSections(cascaderOpt);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Head>
        <title>RBIC</title>
        <meta name="description" content="Red de bienes de intereés cultural" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="content-container">
          <h1 className="main-title">Puntos de referencia - Secciones</h1>
          <div className="card__container">
            {data.map((element: any, i: any) => (
              <div key={i} className="card">
                <div className="card__info">
                  <h2 className="sub-title">{element.rps_name}</h2>
                  <p className="card__description">{element.rps_description}</p>
                </div>
                <div className="card__image">
                  <Image src={element.rps_image} preview={false} />
                </div>
              </div>
            ))}
          </div>
          <div className="aboutUs">
            <h2 className="aboutUs__title">¿Quiénes somos?</h2>
            <div className="aboutUs__text">
              <p>
                RBIC Es un sistema que permite administrar una Red de Bienes de
                Interés Cultural a instituciones que se desenvuelvan en este
                ámbito.
              </p>
              <p>
                Se busca establecer una red de trabajo entre institutos
                culturales que deseen dar a conocer sus exposiciones.
              </p>
            </div>
          </div>
          <div className="planVisit">
            <h2>Planea tu visita</h2>
            <Button type="primary" onClick={() => modalState(true)}>
              Buscar punto de referencia
            </Button>
            <Modal
              visible={showModal}
              onOk={() => modalState(false)}
              onCancel={() => modalState(false)}
              closable={false}
              footer={null}
            >
              <Form onFinish={onFinish}>
                <h2>Planea tu visita</h2>
                <span>Punto de referencia sección:</span>
                <Form.Item name="referencePointSection">
                  <Cascader
                    placeholder="Punto de referencia sección"
                    options={referencePointSections}
                  />
                </Form.Item>
                <span>Selecciona la fecha de tu visita</span>
                <Form.Item name="arriveDate">
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Fecha"
                    disabledDate={(current: any) =>
                      current && current < moment().startOf("day")
                    }
                  />
                </Form.Item>
                <div className="btn-form">
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Confirmar
                    </Button>
                  </Form.Item>
                  <Button onClick={() => modalState(false)}>Cerrar</Button>
                </div>
              </Form>
            </Modal>
          </div>
        </div>
      </Layout>
    </>
  );
}
