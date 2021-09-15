import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Ordem } from '../../../types/ordem/ordem';
import { requestBackend } from '../../../util/requests';

interface ItensOrdemProps {
  ordem: Ordem,
  ordemId,
  controller: string,
  onSaveOrder: (obj) => void,
}

function ItensOrdemServico({ ordem, controller, onSaveOrder, ordemId }: ItensOrdemProps) {
  const [anuncioloja, setanuncioloja] = useState();
  const [anuncioservico, setanuncioservico] = useState();
  //lista anuncio loja
  //lista mao obra

  useEffect(() => {
    let params: AxiosRequestConfig = {
      method: "GET",
      url: `anunciosloja/getallsample`,
    };
    requestBackend(params).then((rest) => {
      setanuncioloja(rest.data);
      console.log(rest.data);

    });

    params = {
      method: "GET",
      url: `anuncioservicos/getallsample`,
    };
    requestBackend(params).then((rest) => {
      setanuncioservico(rest.data);
      console.log(rest.data);
    });
  }, [ordemId])

  return (
    <>
      <h1>ItensOrdem</h1>

    </>
  );
}

export default ItensOrdemServico;
