import { SearchOutlined } from "@material-ui/icons";
import { Button } from "antd"; 
import InputMask from "react-input-mask";

interface EditEnderecoProps { 
  register,
  formState?,
  setValue,
  getValues
}

function EditEndereco({  register, formState, setValue, getValues }: EditEnderecoProps) {
  

  const findendereco = () => {
    const cep = getValues("cep").replace(/[^0-9]/g, "");

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setValue("logradouro", data.logradouro);
        setValue("bairro", data.bairro);
        setValue("localidade", data.localidade);
        setValue("uf", data.uf);
        setValue( "ibge", null);
        setValue( "gia",null);
        setValue( "ddd", null);
        setValue(  "siafi", null);
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
              {...register("logradouro", {
                required: true,
               
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
              {...register("numero", {
                required: true,
               
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
                {...register("cep", { 
                 
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
              {...register("bairro", { 
               
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
              {...register("uf", {  maxLength: 10 })}
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
              {...register("localidade", {
                 
               
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
              {...register("complemento", {
                
              })}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default EditEndereco;
