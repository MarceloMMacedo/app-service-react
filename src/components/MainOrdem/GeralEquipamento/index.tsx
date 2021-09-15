
import { Modal } from 'antd';
import { useState } from 'react';
import { Ordem } from '../../../types/ordem/ordem';
import FormContato from '../../Contato';
import EquipamentoOrdem from '../../EquipamentoOrdem';

interface GeralEquipamentoProps {
  ordem: Ordem,
  ordemId,
  controller: string,
  onSaveOrder: (obj) => void,
}

function GeralEquipamento({ ordem, controller, onSaveOrder, ordemId }: GeralEquipamentoProps) {

  const [visible, setvisible] = useState(false)
  const [equipamentolocal, setequipamentolocal] = useState( )

  const setequipamento = (equipamento) => {
   
     onSaveOrder({...ordem,equipamento:equipamento})
     console.log(ordem);
  }

  return (
    <>


      <div className="col-xl-2 order-xl-1 ps-xl-2">
        <div className="card mb-2 cardh" >
          <div className="card-header bg-light btn-reveal-trigger d-flex flex-between-center">
            <h5 className="mb-0">Equipamento</h5>
            <button className="btn btn-linl btn-sm" onClick={() => { setvisible(true) }}> <span className="fas fa-pencil-alt"></span>
            </button>
          </div>
          <div className="card-body">
            <table className="table table-borderless fs--1 mb-0">
              <tr className="border-bottom">
                <th className="ps-0">Id</th>
                <th className="pe-0 text-end">{ordem?.id} </th>
              </tr>
              <tr className="border-bottom">
                <th className="ps-0">Modelo</th>
                <th className="pe-0 text-end"> { ordem.equipamento?.modelo.nome}</th>
              </tr>

              <tr className="border-bottom">
                <th className="ps-0">Serial</th>
                <th className="pe-0 text-end">{ ordem.equipamento?.serial}</th>
              </tr>

              <tr className="border-bottom">
                <th className="ps-0">Local</th>
                <th className="pe-0 text-end">{ ordem.equipamento?.local}</th>
              </tr>
              <tr className="border-bottom">
                <th className="ps-0">Medidor A3</th>
                <th className="pe-0 text-end">{ ordem.equipamento?.medidorServico.medidorA3Final}</th>
              </tr>
              <tr className="border-bottom">
                <th className="ps-0">Medidor A4</th>
                <th className="pe-0 text-end">{ ordem.equipamento?.medidorServico.medidorA4Final}</th>
              </tr>
            </table>
          </div>
          
        </div>
      </div>

      <Modal
        title="Equipamento"
        visible={visible}
        onCancel={() => setvisible(false)}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}

      >

        <EquipamentoOrdem id={ordemId} controller={controller} outEquipamento={setequipamento} />

        <hr />
        <button onClick={() => { setvisible(false) }} className="btn btn-falcon-primary btn-sm">
          Fechar
        </button>

      </Modal>

    </>
  );
}

export default GeralEquipamento;
