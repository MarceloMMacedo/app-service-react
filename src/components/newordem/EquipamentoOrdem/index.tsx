

import { Button, Card, Divider, notification } from 'antd';
import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useForm } from 'react-hook-form';
import { EquipamentoCliente, newEquipamentoCliente } from '../../../types/pessoa/equipamentocliente';
import { requestBackend } from '../../../util/requests';
import { Select } from 'antd';


import SortIcon from "@material-ui/icons/ArrowDownward";
import Modal from 'antd/lib/modal/Modal';
import { Modelo } from '../../../types/modelo';
import { SampleDto } from '../../../types/sampledto';
import NumberFormat from 'react-number-format';

const columns = [
  
  {
    name: 'Tipo',
    selector: 'tipo',
    sortable: true
  },
  {
    name: 'Modelo',
    selector: 'modelo.nome',
    sortable: true
  },
  {
    name: 'Serial',
    selector: 'serial',
    sortable: true
  },
  {
    name: 'Local',
    selector: 'local',
    sortable: true
  },

];

interface EquipamentoOrdemProps {
  id: any;
  controller: string;
  outEquipamento?: (equipamento) => void;
}

function EquipamentoOrdem({ id, controller, outEquipamento }: EquipamentoOrdemProps) {

  const { Option } = Select;
  const [equipamentos, setequipamentos] = useState<EquipamentoCliente[]>();
  const [equipamento, setequipamento] = useState<EquipamentoCliente>();
  const [visible, setvisible] = useState(false);
  const [mdelos, setmdelos] = useState<SampleDto[]>();
  const [tipos, settipos] = useState();
  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid },
    setValue, getValues, } = useForm();

  const initial = () => {
    let params: AxiosRequestConfig = {
      method: "GET",
      url: `${controller}/getequipamentoclient/${id}`,
    };
    requestBackend(params).then((rest) => {
      setequipamentos(rest.data);
    })
    params.url = `modelos/getallsampledto`;
    requestBackend(params).then((rest) => {
      setmdelos(rest.data);
      console.log(rest.data);

    })
  }
  useEffect(() => {
    initial();
  }, [id]);

  useEffect(() => {
    outEquipamento(equipamento);
  }, [equipamento]);

  const onSubmit = (data) => {
    setequipamento(data);
    console.log(equipamento);
    const confirm = openNotification(data);
  };

  const openNotification = (data) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => {
          let params: AxiosRequestConfig = {
            method: "POST",
            url: `${controller}/addequipamentocliente/${id}`,
            data: data,
          };
          console.log(params);
          
          requestBackend(params).then((rest) => {
            initial();

          })
          setvisible(false);
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

  const newequipamento = () => {
    setequipamento(newEquipamentoCliente(id));
    setvisible(true);
  }
  return (
    <>
      <Card size="small" title="Selecionar Equipamento" extra={<button
        className="btn btn-falcon-primary btn-sm"
        type="button" onClick={newequipamento}
      >
        Novo equipamento
      </button>} >
        <DataTable className="table table-dashboard mb-0 table-borderless fs--1 border-200"
          columns={columns}
          data={equipamentos}
          defaultSortFieldId={1}
          sortIcon={<SortIcon />}
          pagination
          selectableRows
          onRowClicked={(row) => {//console.log(row);
          }}
          selectableRowsSingle
          onSelectedRowsChange={(state) => {
            setequipamento(state.selectedRows[0]);
          }}
        />

      </Card>
      <Modal
        title="Cadastro de Equipamento"
        visible={visible}
        onCancel={() => setvisible(false)}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}

      >


        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="row">
            <div className="col-lg-6">
              <div className="form-group">
                <label className="form-label mt-2">Tipo</label>
                <select  {...register("tipo", { required: true })}
                  className="form-control form-control-sm col-lg-12"
                >
                  <option value="Copiadora">Copiadora</option>
                  <option value="Impressora">Impressora</option>
                  <option value="Multifuncional">Multifuncional</option>
                  <option value="Transformador">Transformador</option>
                  <option value="Outros">Outros</option>

                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label className="form-label mt-2">Tipo</label>
                <select {...register("modelo.id", { required: true })}
                  className="form-control form-control-sm col-lg-12">
                  {mdelos && mdelos.map((x) => <option value={x.id} >{x.nome}</option>)}
                </select>

              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group">
                <label className="form-label mt-2">Serial</label>
                <input
                  type="text"
                  id="bairro"
                  className="form-control form-control-sm"
                  {...register("serial", {
                    required: true,

                  })}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label className="form-label mt-2">Setor</label>
                <input
                  type="text"
                  id="bairro"
                  className="form-control form-control-sm"
                  {...register("local", {
                    required: true,

                  })}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="form-group">
                <label className="form-label mt-2">Medidor A3</label>
                <input 
                  className="form-control form-control-sm"  type="number"   {...register("medidorServico.medidorA3Final", {
                    required: true,

                  })}  
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <label className="form-label mt-2">Medidor A4</label>
                <input type="number"
                  className="form-control form-control-sm" {...register("medidorServico.medidorA4Final", {
                    required: true,

                  })}  
                />
              </div>
            </div>
          </div>
          <Divider />
          <button type="submit" className="btn btn-falcon-primary btn-sm">
            Salvar
          </button>
        </form>
      </Modal>

    </>
  );
  /**
   *   nome?: string,
  imagem?: string,
  extension?: string,
  imagemView?: string,
  tipo?: string,
  modelo?: SampleDto,
  contrato?: number,
  medidorServico?: Medidor,
  cliente?: SampleDto,
  serial?: string,
  local?: string,
   */
};

export default EquipamentoOrdem;
