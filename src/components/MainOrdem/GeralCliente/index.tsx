

import { Modal, Button, notification } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Ordem } from "../../../types/ordem/ordem";
import FormContato from "../../Contato";
import InputMask from "react-input-mask";
import "./style.css"
import { SearchOutlined } from "@material-ui/icons";
import FormEndereco from "../EditGeramEndereco";
interface GeralClienteProps {
  ordem: Ordem,
  ordemId,
  controller: string,
  onSaveOrder: (obj) => void,
}

function GeralCliente({ ordem, controller, onSaveOrder, ordemId }: GeralClienteProps) {

  const [visibelendereco, setvisibelendereco] = useState(false);
  const [visibecontato, setvisibecontato] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid },
    setValue, getValues, } = useForm();


  const onSubmit = (contato) => {
    console.log(contato.contato);
    let c=contato.contato;
    
     const confirm = openNotification({...ordem,c});


  };

  const onSubmitendereco = (endereco) => {
    console.log(endereco);
    let e=endereco.endereco;
       const confirm = openNotification( {...ordem,e});
   // onSaveOrder({ ...ordem, endereco: data });

  };

  const openNotification = (data) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => {
          console.log(data);

          onSaveOrder(data);
          setvisibecontato(false);
          setvisibelendereco(false);
          notification.close(key);
        }}
      >
        Confirmar
      </Button>
    ); notification.open({
      message: "Aviso",
      description: "Deseja Salvar dados?",
      btn,
      key,
      onClick: close,
    });
  };
  const close = () => {

  };
  const findendereco = () => {
    const cep = getValues("cep").replace(/[^0-9]/g, "");

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setValue("logradouro", data.logradouro);
        setValue("bairro", data.bairro);
        setValue("localidade", data.localidade);
        setValue("uf", data.uf);
      });
  };
  return (
    <>
      <div className="col-xl-7 ">
        <div  >
          <div className="card cardh mb-3">
            <div className="card-header bg-light">
              <div className="row flex-between-center">
                <div className="col-sm-auto">
                  <h5 className="mb-2 mb-sm-0">{ordem?.cliente?.nome} </h5>
                </div>
              </div>
            </div>




            <div className=" scrollbar card-body">

              <div className="row">
                <div className="col-lg-6 ">

                  <div className=" d-block" >
                    <span className="radio-select-content"><span>
                      <address>
                        <strong>{ordem?.endereco?.logradouro}, {ordem.endereco?.numero} </strong><br />
                        {ordem?.endereco?.bairro} , {ordem?.endereco?.cep} <br /> {ordem?.endereco?.localidade},{ordem?.endereco?.uf}<br />
                        <abbr title="Phone">Complemento:</abbr>  {ordem?.endereco?.complemento}

                      </address>
                    </span></span>

                  </div>
                  <a className="fs--1" onClick={() => { setvisibelendereco(true) }}>Edit</a>
                </div>
                <div className="col-lg-6 ">
                  <div className=" d-block" >
                    <span className="radio-select-content"><span>
                      <address>
                        <strong>{ordem?.contato?.contato}  </strong><br />
                        <abbr title="Phone">Telefone:</abbr>   {ordem?.contato?.telefonecontato} ,  <br />
                        <abbr title="Phone">Setor:</abbr>  {ordem?.contato?.setorcontato} <br />
                        <abbr title="Phone">Email:</abbr>  {ordem?.contato?.emailcontato}

                      </address>
                    </span></span>
                  </div>
                  <a className="fs--1" onClick={() => { setvisibecontato(true) }}  >Edit</a></div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <Modal
        title="Cadastro de Contato"
        visible={visibecontato}
        onCancel={() => setvisibecontato(false)}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}

      >


        <form onSubmit={handleSubmit(onSubmit)}>
          <FormContato register={register} setValue={setValue} contato={ordem.contato} />
          <hr />
          <button type="submit" className="btn btn-falcon-primary btn-sm">
            Salvar
          </button>
        </form>
      </Modal>

      <Modal
        title="Cadastro de Endereço"
        visible={visibelendereco}
        onCancel={() => setvisibelendereco(false)}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}

      >


        <form onSubmit={handleSubmit(onSubmitendereco)}>
          <FormEndereco  register={register} setValue={setValue} getValues={getValues} endereco={ordem.endereco}  />
         <hr />
          <button type="submit" className="btn btn-falcon-primary btn-sm">
            Salvar
          </button>
        </form>
      </Modal>
    </>
  );
}

export default GeralCliente;
