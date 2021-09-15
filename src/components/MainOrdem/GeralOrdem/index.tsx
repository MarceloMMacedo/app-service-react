

import { DatePicker } from "antd";
import moment from "moment";
import { Ordem } from "../../../types/ordem/ordem"; 
import "./style.css";
import 'moment/locale/pt-br';
import locale from 'antd/es/date-picker/locale/pt_BR';

import 'antd/dist/antd.css'; 
import { SampleDto } from "../../../types/sampledto";
import './style.css' 
interface GeralOrdemProps {
 ordem:Ordem,
  ordemId,
  controller: string,
  tecnicos:SampleDto[],
  onSaveOrder:(obj)=>void,
}

function GeralOrdem({ ordem, controller,onSaveOrder,ordemId ,tecnicos}: GeralOrdemProps) {


  

  
  /*const inciogeral = () => {
    let params: AxiosRequestConfig = {
      method: "GET",
      url: `${controller}/ordem/${ordemId}`,
    };
    requestBackend(params).then((rest) => {
      setordem(rest.data);
      console.log(ordem);

    }).finally(() => {
    });
  }
  */
  function saveConclusao(data: Date) {
 

    onSaveOrder({ ...ordem, dataConclusao: data });
  }
  function savedataAbertura(data: Date) {
 
    onSaveOrder({ ...ordem, dataAbertura: data });
  }
  function savedataProgramada(data: Date) {
  
    onSaveOrder({ ...ordem, dataProgramada: data });
  }
  const onchangecanal = (event) => {

    onSaveOrder({ ...ordem, canal: event.target.value });
  }
  /*function onSaveOrder(obj) {
    let params: AxiosRequestConfig = {
      method: "POST",
      url: `${controller}/saveobj/${ordemId}`,
      data: obj
    };
    requestBackend(params).then((rest) => {
      message.success('Data atualizao com sucesso');
      inciogeral();
    }).finally(() => {
    });
    console.log(ordem);
  }
  */
  return (
    <>
      <div className="col-xl-3  pe-xl-2">
        <div className="card mb-3 cardh">
          <div className="card-header bg-light btn-reveal-trigger d-flex flex-between-center">
            <h5 className="mb-0">{ordem ? ordem.origem : ''}</h5>
          
          </div>
          <div className="card-body">
            <table className="table table-borderless fs--1 mb-0">

              <tr className="border-bottom">
                <th className="ps-0">Abertura</th>

                <th className="pe-0 text-end p-1">
                  <DatePicker onChange={(value) => { savedataAbertura(value.toDate()) }}
                    className=" alturadate  " showTime locale={locale} value={ordem && moment(ordem.dataAbertura)}
                    format={"DD/MM/YYYY  HH:mm:ss a"} />
                </th>
              </tr>
              <tr className="border-bottom">
                <th className="ps-0">Previsão</th>

                <th className="pe-0 text-end p-1">
                  <DatePicker onChange={(value) => { savedataProgramada(value.toDate()) }}
                    className=" alturadate  " showTime locale={locale} value={ordem && moment(ordem.dataProgramada)}
                    format={"DD/MM/YYYY  HH:mm:ss a"} />
                </th>
              </tr>
              <tr className="border-bottom">
                <th className="ps-0">Conclusão</th>
                <th className="pe-0 text-end p-1">

                  <DatePicker onChange={(value) => { saveConclusao(value.toDate()) }}
                    className=" alturadate  " showTime locale={locale} value={ordem && moment(ordem.dataConclusao)}
                    format={"DD/MM/YYYY  HH:mm:ss a"} />

                </th>
              </tr>
              <tr className="border-bottom">
                <th className="ps-0">Técnico</th>
                <th className="pe-0 text-end ">
                  <div className=" alturadate1   " >
                    <select   value={ordem && ordem.tecnico && ordem.tecnico?.id} className=" alturadate  " 
                      onChange={(event) => {
                        onSaveOrder({ ...ordem, tecnico: { id: event.target.value } });
                      }}
                    >
                      {tecnicos && tecnicos.map((x) => <option key={"" + new Date().getMilliseconds} value={x.id} >{x.nome}</option>)}
                    </select>
                  </div>
                </th>
              </tr>
              <tr className="border-bottom">
                <th className="ps-0">Origem Chamado</th>
                <th className="pe-0 text-end ">
                  <div className=" alturadate1   " >  
                  <select value={ordem && ordem.canal} className=" alturadate   " 
                    onChange={(event) => {
                      onSaveOrder({ ...ordem, canal: event.target.value });
                    }}
                  >
                    <option key={"" + new Date().getMilliseconds} value="TELEFONE">TELEFONE</option>
                    <option key={"" + new Date().getMilliseconds} value="ONSITE">ONSITE</option>
                    <option key={"" + new Date().getMilliseconds} value="WHATSAPP">WHATSAPP</option>
                    <option key={"" + new Date().getMilliseconds} value="WEB">WEB</option>
                    <option key={"" + new Date().getMilliseconds} value="OUTROS">OUTROS</option>

                  </select>
                  </div>
                </th>
              </tr>
            </table>
          </div>

        </div>

      </div>

    </>
  );
}

export default GeralOrdem;
