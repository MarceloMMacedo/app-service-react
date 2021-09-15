import { SearchOutlined } from "@material-ui/icons";
import { Button, Form, Input, Modal, notification, Popconfirm } from "antd";
import { useRef, useState } from "react";
import { Pessoa } from "../../../types/pessoa/pessoa";
import { BaseListAutocomplet } from "../../../types/sampledto";
import NumberFormat from "react-number-format";
import { mask } from "../../../util/formatters";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../../../util/requests";
import schema from "./schema"; 
import { Controller, useForm } from "react-hook-form";
import { identity } from "lodash";
import FormEndereco from "../../Endereco";
import FormContato from "../../Contato";

type Props = {
  visible: boolean;
  controller: string;
  setStatus?: (status: boolean, basename: BaseListAutocomplet) => void;
};
const ModalNewCliente = ({ setStatus, visible, controller }: Props) => {
  const [isdisable, setIsdisable] = useState(true);
  const [endereco, setendereco] = useState({});
  const [state, setstate] = useState(false);
  const [_cliente, set_cliente] = useState<Pessoa>({});
  const init = (cliente: Pessoa) => {
    {
      setValue("atividade_principal", cliente.atividade_principal);
      setValue("atividades_secundarias", cliente.atividades_secundarias); // [],
      setValue("cnpj", cliente.cnpj);
      setValue("contato", cliente.contato);
      setValue("contatos", cliente.contatos);
      setValue("descricao", cliente.descricao);
      setValue("email", cliente.email);
      setValue("endereco", cliente.endereco);
      setValue("enderecos", cliente.enderecos);
      setValue("equipamentos", cliente.equipamentos);
      setValue("extension", cliente.extension);
      setValue("fantasia", cliente.fantasia);

      setValue("ie", cliente.ie);
      setValue("imagem", cliente.imagem);
      setValue("motivo_situacao", cliente.motivo_situacao);
      setValue("natureza_juridica", cliente.natureza_juridica);
      setValue("nome", cliente.nome);
      setValue("porte", cliente.porte);
      setValue("telefone", cliente.telefone);
      setValue("tipo", cliente.tipo);
      setendereco(cliente.endereco);
    }
  };

  const outStatus = (status: any) => {
    //filtro cliente existe cnpj ou nome exist

    let basename: BaseListAutocomplet;
    setStatus(status, basename);
  };

  const findcnpj = () => {
    const cnpj = getValues("cnpj").replace(/[^0-9]/g, "");

    const params: AxiosRequestConfig = {
      method: "GET",
      url: `/${controller}/cnpj/${cnpj}`,
    };
    requestBackend(params).then((rest) => {
      let p: Pessoa = rest.data as Pessoa;
      p.cnpj = cnpj;
      init(p);
    });
  };

  const maskcpf = (e) => {
    return mask(e);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    setValue,
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    setstate(false);
    // console.log(JSON.stringify(data));
    let c: Pessoa = data as Pessoa;
    set_cliente(c);
    // console.log(_cliente);

    const confirm = openNotification();
  };
  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => notification.close(key)}
      >
        Confirmar
      </Button>
    );
    notification.open({
      message: "Aviso",
      description: "Deseja Adicionar Novo Cliente",
      btn,
      key,
      onClick: close,
    });
  };
  const close = () => {
    const params: AxiosRequestConfig = {
      method: "PUT",
      url: `/clientes/newobj`,
      data: _cliente,
    };
    requestBackend(params).then((rest) => {
      set_cliente({ ..._cliente, "id": rest.data });
      let basename: BaseListAutocomplet = { value: _cliente.nome, option: _cliente.id };
      setStatus(true, basename);
    });
  };
  return (
    <>
      <Modal
        title="Cadastro de Cliente"
        visible={visible}
        onCancel={() => outStatus(false)}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
      >
        <div className="App">
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="form-label mt-2">CNPJ</label>
                <div className="input-group ">
                  <NumberFormat
                    className="form-control form-control-sm"
                    name="cnpj"
                    format={maskcpf}
                    maxLength={18}
                    {...register("cnpj", { required: true })}
                    onChange={(e) => {
                      setValue("cnpj", e.target.value);
                      if (e.target.value.length < 18) {
                        setIsdisable(true);
                      } else {
                        setIsdisable(false);
                      }
                    }}
                  />

                  <Button
                    icon={<SearchOutlined />}
                    disabled={isdisable}
                    onClick={findcnpj}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label mt-2">Nome</label>
                <input
                  className="form-control form-control-sm"
                  {...register("nome", { required: true })}
                ></input>
              </div>
              <div className="form-group">
                <label className="form-label mt-2">Email</label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  {...register("email", { required: true })}
                ></input>
              </div>
              <FormEndereco endereco={endereco}
                register={register}
                setValue={setValue}
                getValues={getValues} />

              <FormContato
                contato={getValues("contato")}
                register={register}
                setValue={setValue}
              />
              <hr />
              <button type="submit" className="btn btn-falcon-primary btn-sm">
                Enviar
              </button>
            </form>
          </>
        </div>
      </Modal>
    </>
  );
};
/*
 <Form form={form} name="control-ref" onFinish={onSubmit}>
            <Form.Item
              name="cnpj"
              label="CPF/CNPJ"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <div className="input-group ">
                <NumberFormat
                  className="form-control form-control-sm"
                  format={maskcpf}
                  maxLength={18}
                  onBlur={findcnpj}
                />
                <Button icon={<SearchOutlined />} onClick={findcnpj} />
              </div>
            </Form.Item>
            <input
              value={cliente.endereco.logradouro || null}
              className="form-control"
            />
            <input
              value={cliente.nome || null}
              className="form-control"
              onChange={(e) => {
                setCliente({ ...cliente, nome: e.target.value });
              }}
            />
            <Form.Item
              name="nome"
              label="Nome"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <div>
                <input className="form-control" />
              </div>
            </Form.Item>

            <hr />
            <div className="row">
              <div className="col-lg-3">
                <Form.Item shouldUpdate>
                  <Button onClick={() => (outStatus ? outStatus(false) : {})}>
                    Cancelar
                  </Button>
                </Form.Item>
              </div>
              <div className="col-lg-3">
                <Form.Item shouldUpdate>
                  {() => (
                    <Button
                      key="submit"
                      type="primary"
                      htmlType="submit"
                      form="control-ref"
                      disabled={
                        !form.isFieldsTouched(true) ||
                        !!form
                          .getFieldsError()
                          .filter(({ errors }) => errors.length).length
                      }
                    >
                      Confirmar
                    </Button>
                  )}
                </Form.Item>
              </div>
            </div>
          </Form>
       
*/
export default ModalNewCliente;
