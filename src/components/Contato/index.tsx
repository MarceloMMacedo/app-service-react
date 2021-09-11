import { result } from "lodash";
import { useForm } from "react-hook-form";

import InputMask from "react-input-mask";
import { Contato } from "../../types/pessoa/contato";

type Props = {
  contato: Contato
  register; 
    setValue,
  
};
const FormContato = ({ contato, register,   
  setValue,}: Props) => {

  setValue("contato", contato);
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label mt-2">Contato</label>
            <input
              className="form-control form-control-sm"
              type="text"
              id="telefone"
              {...register("contato.contato", {
                required: true,
              })}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label mt-2">Telefone</label>
            <InputMask
              className="form-control form-control-sm"
              type="text"
              id="@Tag"
              mask="(99)9999-9999"
              {...register("contato.telefonecontato", {
                
              })}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label mt-2">Email Contato</label>
            <input
              id="email"
              className="form-control form-control-sm"
              type="email"
              {...register("contato.emailcontato", {
                required: true,
              })}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label mt-2">Setor</label>
            <input
              className="form-control form-control-sm"
              type="text"
              id="site"
              {...register("contato.setorcontato", {
                
              })}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default FormContato;
