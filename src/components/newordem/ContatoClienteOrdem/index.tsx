import { Button, Card, notification } from "antd";
import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Contato } from "../../../types/pessoa/contato";
import { requestBackend } from "../../../util/requests";
import SortIcon from "@material-ui/icons/ArrowDownward"; 
import { useForm } from "react-hook-form";
import Modal from "antd/lib/modal/Modal";
import FormContato from "../../Contato";

const columns = [
  {
    name: 'Contato',
    selector: 'contato',
    sortable: true
    //  render: (text) => <a>{text}</a>,
  },
  {
    name: 'Email',
    selector: 'emailcontato',
    sortable: true
  },
  {
    name: 'Telefone',
    selector: 'telefonecontato',
    sortable: true
  },

];

interface ContatoClienteOrdemProps {
  id: any;
  controller: string;
  outContato?: (contato) => void;
}

function ContatoClienteOrdem({ id, controller, outContato }: ContatoClienteOrdemProps) {
  const [contatos, setcontatos] = useState<Contato[]>();
  const [contato, setcontato] = useState<Contato>();
  const [visible, setvisible] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid },
    setValue, getValues, } = useForm();

  const initial = () => {
    let params: AxiosRequestConfig = {
      method: "GET",
      url: `${controller}/getcontatoosclient/${id}`,
    };
    requestBackend(params).then((rest) => {
      let e: Contato[] = [];
      setcontatos(rest.data);
    })
  }
  useEffect(() => {
    initial();
  }, [id]);

  useEffect(() => {
    outContato(contato);
  }, [contato]);

  const onSubmit = (data) => {
    setcontato(data);
    const confirm = openNotification();
  };

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => {
          let params: AxiosRequestConfig = {
            method: "POST",
            url: `${controller}/addContato/${id}`,
            data: contato,
          };
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
      description: "Deseja Adicionar Novo Contato?",
      btn,
      key,
      onClick: close,
    });
  };
  const close = () => {

  };

  const newContato=()=>{
    setcontato({} as Contato);
    setvisible(true);
  }
  return (


    <>
      <Card size="small" title="Selecionar Contato" extra={<button
        className="btn btn-falcon-primary btn-sm"
        type="button" onClick={newContato}
      >
        Novo Contato
      </button>} >
        <DataTable className="table table-dashboard mb-0 table-borderless fs--1 border-200"
          columns={columns}
          data={contatos}
          defaultSortFieldId={1}
          sortIcon={<SortIcon />}
          pagination
          selectableRows
          onRowClicked={(row) => {//console.log(row);
          }}
          selectableRowsSingle
          onSelectedRowsChange={(state) => {
            setcontato(state.selectedRows[0]);
          }}
        />

      </Card>
      <Modal
          title="Cadastro de Contato"
          visible={visible}
          onCancel={() => setvisible(false)}
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}

        >


          <form onSubmit={handleSubmit(onSubmit)}>
            <FormContato register={register} setValue={setValue} contato={contato} />
            <hr />
            <button type="submit" className="btn btn-falcon-primary btn-sm">
              Salvar
            </button>
          </form>
        </Modal>

    </>
  );
}

export default ContatoClienteOrdem;
