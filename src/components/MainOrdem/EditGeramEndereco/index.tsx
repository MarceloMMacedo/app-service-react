import { SearchOutlined } from "@material-ui/icons";
import { Button } from "antd";
import InputMask from "react-input-mask";
import { Endereco } from "../../../types/pessoa/endereco";
type Props = {
  endereco: Endereco,
  register,
  setValue,
  getValues
};
const FormEndereco = ({ endereco, register, setValue, getValues }: Props) => {

  setValue("endereco", endereco);

  const findendereco = () => {
    const cep = getValues("endereco.cep").replace(/[^0-9]/g, "");

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setValue("endereco.logradouro", data.logradouro);
        setValue("endereco.bairro", data.bairro);
        setValue("endereco.localidade", data.localidade);
        setValue("endereco.uf", data.uf);
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-8">
          <div className="form-group">
            <label className="form-label mt-2">Logradouro</label>
            <input
              type="text"
              id="bairro"
              className="form-control form-control-sm"
              {...register("endereco.logradouro", {
                

              })}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-group">
            <label className="form-label mt-2">Número</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="numero"
              {...register("endereco.numero", {
                

              })}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <div className="form-group">
            <label className="form-label mt-2">CEP</label>
            <div className="input-group ">
              <InputMask
                mask="99.999-999"
                className="form-control form-control-sm"
                {...register("endereco.cep", {

                })}
              />

              <Button icon={<SearchOutlined />} onClick={findendereco} />
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="form-group">
            <label className="form-label mt-2">Bairro</label>
            <input
              type="text"
              className="form-control form-control-sm"
              id="bairro"
              {...register("endereco.bairro", {

              })}
            />
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group">
            <label className="form-label mt-2">UF</label>
            <input
              type="text"
              id="uf"
              className="form-control form-control-sm"
              {...register("endereco.uf", { maxLength: 10 })}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="form-group">
            <label className="form-label mt-2">Cidade</label>
            <input
              type="text"
              id="localidade"
              className="form-control form-control-sm"
              {...register("endereco.localidade", {


              })}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label mt-2">Complemento</label>
            <input
              type="text"
              id="complemento"
              className="form-control form-control-sm"
              {...register("endereco.complemento", {

              })}
            />
          </div>
        </div>
      </div>
    </>
  );
};
/* 
   
</div>
<div className="row">
    <div className="col-md-6">
        <div className="form-group">
            <label nzFor="logradouro" nzRequired>Endereço</label>
            <nz-form-control nzErrorTip="Insira logradouro">
                <input  type="text" id="logradouro"   {...register("endereco.logradouro", {  maxLength: 10 })} />
            </nz-form-control>
        </div>
    </div>
   
    */
export default FormEndereco;
