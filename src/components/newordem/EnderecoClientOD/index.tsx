

import { Divider, Button, notification } from 'antd'; 
import { useEffect, useState } from "react";
import { Endereco } from "../../../types/pessoa/endereco";
import DataTable from "react-data-table-component";

import SortIcon from "@material-ui/icons/ArrowDownward";
import "@fortawesome/fontawesome-free/css/all.css";
import './style.css';
import Modal from 'antd/lib/modal/Modal';
import { useForm } from 'react-hook-form';
import EditEndereco from '../EditEndereco';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from '../../../util/requests';
type Props = {
  //enderecos?: Endereco[];
  id: number;
  controller: string,
  isselect?: boolean;
  setAddEnderecos?: (elemento) => void;
  
}


const EnderecoClientOD = ({ isselect, id, controller, setAddEnderecos }: Props) => {
  const [state, setState] = useState({ selectedRowKeys: [] }); 
  const [endereco, setendereco] = useState <Endereco>();
  const [visible, setvisible] = useState(false);
  const [_enderecos, set_enderecos] = useState<Endereco[]>()

  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid },
    setValue, getValues, } = useForm();


  //cell?: undefined;
  const columns = [
    {
      name: 'Logradouro',
      selector: 'logradouro',
      sortable: true
      //  render: (text) => <a>{text}</a>,
    },
    {
      name: 'Número',
      selector: 'numero',
      sortable: true
    },
    {
      name: 'Bairro',
      selector: 'bairro',
      sortable: true
    }, {
      name: 'Cidade',
      selector: 'localidade',
      sortable: true
    },
    {
      name: 'UF',
      selector: 'uf',
      sortable: true
    },

  ];
  useEffect(() => {
   if(id!==0) {ini();} else {
      let e: Endereco[] = [];
      set_enderecos(e);}
   
  }, [id,visible])

  const ini = () => {
    let params: AxiosRequestConfig = {
      method: "GET",
      url: `${controller}/getenderecosclient/${id}`,
    };
    requestBackend(params).then((rest) => {
      let e: Endereco[] = [];
      set_enderecos(rest.data); 
    })
  };

 

  const onSubmit = (data) => {
   
    setendereco(data);
    
    const confirm = openNotification(data);
  };
  const openNotification = (data) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() =>{    
          let params: AxiosRequestConfig = {
            method: "POST",
            url: `${controller}/addEndereco/${id}`,
            data: data,
          };
          requestBackend(params).then((rest) => {
            ini();
      
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
      description: "Deseja Adicionar Novo Endereço?",
      btn,
      key,
      onClick:   close  ,
    });
  };
  const close = () => {
   
  };
useEffect(() => {
  setAddEnderecos(endereco)
   
}, [endereco])
  const newEndereco = () => {
    var ende:any = {
      logradouro: "",
      bairro: "",
      localidade: "",
      uf: "",
      numero: "",
      complemento: "",
      cep: ""
    }
    setendereco(ende);

    setvisible(true);
  }
 
  // <Table className="overf table table-sm fs--1 mb-0 overflow-hidden"  

  return (
    <>
      <div>
        <div>
          <Divider />
          <Button type="primary" disabled={id===0} className="btn1" onClick={newEndereco}>
            <i className="far fa-address-book btn1 mr-2"></i>
            Novo Endereço
          </Button>
        </div>
        <DataTable className="table table-dashboard mb-0 table-borderless fs--1 border-200"
          columns={columns}
          data={_enderecos}
          defaultSortFieldId={1}
          sortIcon={<SortIcon />} 
          pagination
          selectableRows
          onRowClicked={(row)=>{//console.log(row);
          }}
          selectableRowsSingle
          onSelectedRowsChange={(state) => {
            setendereco(state.selectedRows[0]);
            setendereco(state.selectedRows[0]);
          }}
        />

        <Modal
          title="Cadastro de Cliente"
          visible={visible}
          onCancel={() => setvisible(false)}
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}

        >


          <form onSubmit={handleSubmit(onSubmit)}>
            <EditEndereco register={register} setValue={setValue} getValues={getValues} />
            <hr />
            <button type="submit" className="btn btn-falcon-primary btn-sm">
              Salvar
            </button>
          </form>
        </Modal>
      </div>
    </>
  );

}
export
  default EnderecoClientOD;
