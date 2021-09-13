 
import { AxiosRequestConfig } from "axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router"; 
import { Contato } from "../../types/pessoa/contato";
import { Endereco } from "../../types/pessoa/endereco";
import { SampleDto } from "../../types/sampledto"; 
import GeralCliente from "./GeralCliente";
import GeralOrdem from "./GeralOrdem";
import GeralValorOrdem from "./GeralValorOrdem";
 type UrlParams = {
  endereco?:Endereco,
  contato?:Contato,
  cliente?:SampleDto,

}; 
 

function MainOrdem( ) {
  const [ordem, setordem] = useState({});
  //const { ordemId } = useParams<UrlParams>();

  const [isLoading, setIsLoading] = useState(false);
  /*   useEffect(() => {
 
     setIsLoading(true);
   
    let params: AxiosRequestConfig = {
       method: "GET",
       url: `ordemservicos/${ordemId}`,
     };
     requestBackend(params).then((rest) => {
       setordem(rest.data);
     }).finally(() => {
       setIsLoading(false);
     });
     
   }, [ordemId])
   */
  return (
    <>
  <div className="row g-0">
    <GeralOrdem/>
    <GeralCliente/>
    <GeralValorOrdem />
    </div>
    </>
  );
}

export default MainOrdem;
