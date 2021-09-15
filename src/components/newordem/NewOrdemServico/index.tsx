
import { Steps, Button, message, notification, Divider, DatePicker } from 'antd';
import { AxiosRequestConfig } from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br';
import locale from 'antd/es/date-picker/locale/pt_BR';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { newOrdem, Ordem } from '../../../types/ordem/ordem';
import { SampleDto } from '../../../types/sampledto';
import { formatDate } from '../../../util/formatters';
import { requestBackend } from '../../../util/requests';
import ContatoClienteOrdem from '../ContatoClienteOrdem';
import EquipamentoOrdem from '../../EquipamentoOrdem';

import PassoOneCliente from '../PassoOneCliente';
import ResumoFinalOrdem from '../ResumoFinalOrdem';
import "./style.css"
import { useHistory } from 'react-router';

const { RangePicker } = DatePicker;
const NewOrdemServico = () => {
  var data = new Date();
  var diautil = data.getDay();
  // console.log('hoje: '+data);
  data.setDate(data.getDate() + 2);
  diautil = data.getDay();
  // console.log(data);
  if (diautil === 6) { data.setDate(data.getDate() + 2); }
  if (diautil === 0) { data.setDate(data.getDate() + 1); }



  const [tecnicos, settecnicos] = useState<SampleDto[]>();
  const [current, setCurrent] = useState(0);
  const [ordem, setordem] = useState<Ordem>(newOrdem(data));
  const [next1, setnext1] = useState(false);
  const [next2, setnext2] = useState(false);
  const [next3, setnext3] = useState(false);


  const {
    register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid }, setValue, getValues, } = useForm();

  const history = useHistory();



  useEffect(() => {
    let params: AxiosRequestConfig = {
      method: "GET",
      url: `ordemservicos/lisalltecnicosampledto`,
    };
    requestBackend(params).then((rest) => {
      settecnicos(rest.data);
    })

    try {

      if (ordem.cliente.nome.length >= 0 && ordem.endereco.logradouro.length >= 0) {
        setnext1(true)
      }
    } catch (error) {
      setnext1(false)
    }
    try {
      if (ordem.contato.contato.length >= 0) {
        setnext2(true)
      }
    } catch (error) {
      setnext2(false)
    }
    try {
      if (ordem.equipamento.tipo.length >= 0) {
        setnext3(true)
      }
    } catch (error) {
      setnext3(false)
    }

  }, [ordem]);

  const setCliente = (sampledto) => {
    setordem({ ...ordem, cliente: sampledto });
  }
  const setEndereco = (sampledto) => {
    setordem({ ...ordem, endereco: sampledto });
  }

  const setContato = (sampledto) => {
    setordem({ ...ordem, contato: sampledto });
  }
  const setEquipamento = (equipamento) => {
    setordem({ ...ordem, equipamento: equipamento });
  }

  //
  const setDataAbertura = (sampledto) => {
    setordem({ ...ordem, dataAbertura: sampledto });
  }
  const setDataVencimento = (sampledto) => {
    setordem({ ...ordem, dataProgramada: sampledto });
  }

  const setTecnico = (sampledto) => {
    setordem({ ...ordem, tecnico: sampledto.value });
  }
  const setCanal = (equipamento) => {
    setordem({ ...ordem, canal: equipamento.value });
  }


  //
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const onSubmit = (data) => {
    console.log(data);

    setordem({ ...ordem, ...data })
    const confirm = openNotification();
  };

  const { Step } = Steps;
  const steps = [
    {
      title: 'Cliente',
      content: <PassoOneCliente controller='ordemservicos' outCliente={setCliente}
        outEndereco={setEndereco} />,
    },
    {
      title: 'Contato',
      content: <ContatoClienteOrdem id={ordem.cliente.id}
        controller='ordemservicos' outContato={setContato} />,
    },
    {
      title: 'Equipamento',
      content: <EquipamentoOrdem id={ordem.cliente.id} controller='ordemservicos' outEquipamento={setEquipamento} />,
    },
    {
      title: 'Finalizar',
      content: <>
        <ResumoFinalOrdem controller='ordemservicos' tecnicos={tecnicos} ordem={ordem} />
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row p-3">
            <div className="col-lg-3">
              <div className="form-group">
                <label className="form-label  ">Técnico</label>
                <select
                  className="form-control form-control-sm"
                  {...register("tecnico.id", {
                    required: true,

                  })}
                >
                  {tecnicos && tecnicos.map((x) => <option value={x.id} >{x.nome}</option>)}
                </select>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="form-group">
                <label className="form-label  ">Canal</label>
                <select  {...register("canal", { required: true })}
                  className="form-control form-control-sm col-lg-12"  >
                  <option value="TELEFONE">TELEFONE</option>
                  <option value="ONSITE">ONSITE</option>
                  <option value="WHATSAPP">WHATSAPP</option>
                  <option value="WEB">WEB</option>
                  <option value="OUTROS">OUTROS</option>

                </select>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="form-group">
                <label className="form-label  ">Data</label>
                <RangePicker className="form-control form-control-sm col-lg-12"
                  defaultValue={[moment(formatDate(ordem.dataAbertura), "DD/MM/YYYY HH:mm:ss a"), moment(formatDate(ordem.dataProgramada), "DD/MM/YYYY  HH:mm:ss a")]} format={"DD/MM/YYYY  HH:mm:ss a"}
                  onChange={(value) => {
                    setValue("dataAbertura", value[0].toDate());
                    setValue("dataProgramada", value[1].toDate())
                  }} showTime />


              </div>
            </div>
          </div>

          <Divider />
          {current === 3 && (
            <button type="submit" style={{ margin: '0 8px  8px' }} className="btn btn-primary btn-sm">
              Done
            </button>
          )}
          {current === 3 && (
            <Button style={{ margin: '0 8px  8px' }} onClick={() => prev()} className="ml-2">
              Previous
            </Button>
          )}
        </form>
      </>
      ,
    },
  ];


  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => {
          console.log(ordem);
          let params: AxiosRequestConfig = {
            method: "PUT",
            url: `ordemservicos/newobj`,
            data: ordem
          };
          requestBackend(params).then((rest) => {
            message.success('Ordem de Serviço criado com sucesso');
            history.push(`/ordemservico/${"" + rest.data}`)
          })
          /*let params: AxiosRequestConfig = {
            method: "POST",
            url: `${controller}/addequipamentocliente/${id}`,
            data: data,
          };
          console.log(params);
          
          requestBackend(params).then((rest) => {
            initial();

          })
          setvisible(false);*/
          notification.close(key);
        }}
      >
        Confirmar
      </Button>
    );
    notification.open({
      message: "Aviso",
      description: `Deseja Confirma nova Ordem Serviço? `,
      btn,
      key,
      onClick: close,
    });
  };
  const close = () => {

  };
  return (
    <>
      <div className="  container mt-3  ">
        <div className="card">
          <Steps current={current} className="mt-2 p-2">
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content" >{steps[current].content}</div>
          <div className="steps-action">
            {current === 0 && (
              <Button type="primary" onClick={() => next()} disabled={!next1} >
                Next
              </Button>
            )}
            {current === 1 && (
              <Button type="primary" onClick={() => next()} disabled={!next2} >
                Next
              </Button>
            )}
            {current === 2 && (
              <Button type="primary" onClick={() => next()} disabled={!next3} >
                Next
              </Button>
            )}



            {current < 3 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default NewOrdemServico;