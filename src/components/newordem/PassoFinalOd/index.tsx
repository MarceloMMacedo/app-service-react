
import { notification, Button, DatePicker } from 'antd';
import { useState } from 'hoist-non-react-statics/node_modules/@types/react';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { Ordem } from '../../../types/ordem/ordem';
import { SampleDto } from '../../../types/sampledto';
import { formatDate } from '../../../util/formatters';

interface PassoFinalOdProps {

  controller: string;
  tecnicos: SampleDto[],
  ordem: Ordem
}

function PassoFinalOd({ controller, tecnicos, ordem }: PassoFinalOdProps) {

  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid },
    setValue, getValues, } = useForm();

  const onSubmit = (data) => {

    const confirm = openNotification(data);
  };

  const openNotification = (data) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => {
 
          notification.close(key);
        }}
      >
        Confirmar
      </Button>
    );
    notification.open({
      message: "Aviso",
      description: "Deseja Adicionar Novo Equipamento?",
      btn,
      key,
      onClick: close,
    });
  };
  const close = () => {

  };

  return (
    <>       
          <div className="row p-2">
            <div className="col-lg-3">
              <div className="form-group">
                <label className="form-label  ">Técnico</label>
                <select

                  className="form-control form-control-sm"
                  {...register("tecnico", {
                    required: true,

                  })}
                >
                <option value=""></option>
                  {tecnicos && tecnicos.map((x) => <option value={x.id} >{x.nome}</option>)}
                </select>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="form-group">
                <label className="form-label  ">Canal</label>
                <select  {...register("canal", { required: true })}
                  className="form-control form-control-sm col-lg-12" >
                  <option value=""></option>
                  <option value="TELEFONE">TELEFONE</option>
                  <option value="ONSITE">ONSITE</option>
                  <option value="WHATSAPP">WHATSAPP</option>
                  <option value="WEB">WEB</option>
                  <option value="OUTROS">OUTROS</option>

                </select>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="form-group">
                <label className="form-label  ">Data Abertura</label>

                <DatePicker onChange={(value)=>{setValue("dataAbertura",value)}} 
                className="form-control form-control-sm col-lg-12" defaultValue={moment(formatDate(ordem.dataAbertura), "DD/MM/YYYY")}
                format={"DD/MM/YYYY"} />


              </div>
            </div>
            <div className="col-lg-3">
              <div className="form-group">
                <label className="form-label  ">Data Programada</label>

                <DatePicker onChange={(value)=>{setValue("dataProgramada",value)}} 
                className="form-control form-control-sm col-lg-12" defaultValue={moment(formatDate(ordem.dataProgramada), "DD/MM/YYYY")} format={"DD/MM/YYYY"} />


              </div>
            </div>
          </div> 
    </>
  );
}
/*
 nome?: string,
    descricao?: string,
    imagem?: string,
    extension?: string,
    imagemView?: string,
    canal?: string,
    cliente?: SampleDto,
    dataAbertura?: Date,
    dataProgramada?: Date,
    dataConclusao?: Date,
    vendedor?: SampleDto,
    equipamento?: EquipamentoCliente,
    ?: string,
    garantia?: SampleDto,
    itensOrdemVenda?: ItensOrdemVenda[],
    setorentrega?: string,
    total?: number,
     
     status?: string,
     endereco?: Endereco,
     contato?: Contato,
     formaEntrega?: string,
     valorEntrega?: number,
     financeiroOrdem?: FinanceiroOrdem,
     */

export default PassoFinalOd;
