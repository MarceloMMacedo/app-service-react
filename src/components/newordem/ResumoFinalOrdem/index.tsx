
import { Divider, notification, Button, DatePicker } from 'antd';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { Ordem } from '../../../types/ordem/ordem';
import { SampleDto } from '../../../types/sampledto';
import { formatDate } from '../../../util/formatters';
import FormContato from '../../Contato';
import FormEndereco from '../../Endereco';

interface ResumoFinalOrdemProps {
  ordem: Ordem,
  tecnicos: SampleDto[],
  controller
}

function ResumoFinalOrdem({ ordem, tecnicos, controller }: ResumoFinalOrdemProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty, isValid },
    setValue, getValues, } = useForm();
  
  return (
    <>
      <div className="p-3">
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <label className="form-label mt-2">Cliente</label>
              <label className="form-control form-control-sm col-lg-12">{ordem.cliente.nome} </label>
            </div>
          </div>
        </div>
        <Divider />
      
          <div className="row p-0">
            <div className="col-lg-6">
              <FormEndereco endereco={ordem.endereco}
                register={register}
                setValue={setValue}
                getValues={getValues} />

            </div>
            <div className="col-lg-6">
              <FormContato
                contato={ordem.contato}
                register={register}
                setValue={setValue} />
            </div>
          </div>
          <Divider />
          <h6>Equipamento</h6>
          <div className="row p-0">
            <div className="col-lg-3">
              <label className="form-control form-control-sm col-lg-12 mt-2">Tipo: {ordem.equipamento.tipo}</label>
            </div>
            <div className="col-lg-3">
              <label className="form-control form-control-sm col-lg-12 mt-2">Serial: {ordem.equipamento.serial}</label></div>
            <div className="col-lg-3">
              <label className="form-control form-control-sm col-lg-12 mt-2">Modelo: {ordem.equipamento.modelo.nome}</label></div>
            <div className="col-lg-3">
              <label className="form-control form-control-sm col-lg-12 mt-2">Setor: {ordem.equipamento.local}</label></div>
          </div>
          
      
      </div>
    </>
  );
}

export default ResumoFinalOrdem;
