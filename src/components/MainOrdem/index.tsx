
import { message } from "antd";
import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { Ordem } from "../../types/ordem/ordem";
import { SampleDto } from "../../types/sampledto";
import { requestBackend } from "../../util/requests";
import GeralCliente from "./GeralCliente";
import GeralEquipamento from "./GeralEquipamento";
import GeralOrdem from "./GeralOrdem";
import GeralValorOrdem from "./GeralValorOrdem";
type OrdemParams = {

  ordemId: string;
  controller: string
};


function MainOrdem({ ordemId, controller }: OrdemParams) {
  const [tecnicos, settecnicos] = useState<SampleDto[]>();
  const [ordem, setordem] = useState<Ordem>({});
  useEffect(() => {
    let params: AxiosRequestConfig = {
      method: "GET",
      url: `ordemservicos/lisalltecnicosampledto`,
    };
    requestBackend(params).then((rest) => {
      settecnicos(rest.data);
    })
    inicio()

  }, [ordemId])
  const inicio = () => {
    let params: AxiosRequestConfig = {
      method: "GET",
      url: `ordemservicos/ordem/${ordemId}`,
    };
    requestBackend(params).then((rest) => {
      setordem(rest.data);
      console.log(rest.data);

    }).finally(() => {
    });
  }
 
  function onSaveOrder(obj) {
    let params: AxiosRequestConfig = {
      method: "POST",
      url: `${controller}/saveobj/${ordemId}`,
      data: obj
    };
    requestBackend(params).then((rest) => {
      message.success('Data atualizao com sucesso');
      inicio();
    }).finally(() => {
    });
    console.log(ordem);
  }
  return (
    <>
      <div className="row g-0">
        <GeralOrdem ordemId={ordemId} controller={controller} onSaveOrder={onSaveOrder} ordem={ordem} tecnicos={tecnicos}/>
        <GeralCliente  ordemId={ordemId} controller={controller} onSaveOrder={onSaveOrder} ordem={ordem}  />
        <GeralEquipamento ordem={ordem}
         ordemId={ordemId} controller={controller} onSaveOrder={onSaveOrder} />
      </div>
    </>
  );
}

export default MainOrdem;
