import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import MainOrdem from '../../components/MainOrdem';
import { requestBackend } from '../../util/requests';

import { useLocation } from "react-router-dom";
import { Ordem } from '../../types/ordem/ordem';
import { message } from 'antd';
import ItensOrdemServico from './ItensOrdemServico';
interface UrlParams {
  ordemId: string;
}

function OrdemServico() {
  const [controller, setcontroller] = useState('ordemservicos')
  const [ordem, setordem] = useState({});
  const { ordemId } = useParams<UrlParams>();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

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
  useEffect(() => {
    inicio()
  }, [ordemId])

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
      <div className=" mt-5 container">
        <MainOrdem ordemId={ordemId} controller={'ordemservicos'} />
        <ItensOrdemServico ordem={ordem} ordemId={ordemId} controller={controller} onSaveOrder={onSaveOrder}  />
      </div>
    </>
  );
}

export default OrdemServico;
