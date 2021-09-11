import { AutoComplete, Button, Card, Input } from "antd";

import { useCallback } from "react";
import React, { useEffect, useState, useRef } from "react";
import { debounce, throttle } from "lodash";
import { Ordem } from "../../../types/ordem/ordem";
import { BaseListAutocomplet } from "../../../types/sampledto"; 
import ModalNewCliente from "../ModalNewCliente";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../../../util/requests"; 
import { Select } from "antd";
import { Pessoa } from "../../../types/pessoa/pessoa";
import { Endereco } from "../../../types/pessoa/endereco";
import EnderecoClientOD from "../EnderecoClientOD"; 
const { Option } = Select;

type Props = {
  controller: string;
  outCliente:(sampledto)=> void;
  outEndereco:(sampledto)=> void;
};
const PassoOneCliente = ({ controller,outCliente,outEndereco }: Props) => {
  const [clientes, setClientes] = useState<BaseListAutocomplet[]>([]);
  const [_cliente, set_cliente] = useState<Pessoa>();
  const [enderecos, setEnderecos] = useState<Endereco[]>();
  const [_enderecos, set_Enderecos] = useState<Endereco[]>();
  const [isselect, setisselect] = useState(false);
  const [id, setid] = useState(0) ;

  const [visible, setVisible] = useState(false);

  const filterItems = (query: string) => {
    return clientes.filter(
      (el) => el.value.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };
  //focus

  const [userQuery, setUserQuery] = useState("");

  //filtrar axion
  const updateQuery = () => {
    setisselect(false);
    set_Enderecos([]);
    const option={
      value:0, children:""
    }
    onChange(0,{option})
    setClientes([]);
    setid(0); 
    outCliente({});
    outEndereco({});
    let params: AxiosRequestConfig = {
      method: "GET",
      url: `/${controller}/getnamesclientes/${userQuery}`,
    };
    if (userQuery !== "") {
      requestBackend(params).then((rest) => {
        setClientes(rest.data);
      });

      //console.log(userQuery);
    } else setClientes([]);
  };

  const delayedQuery = useCallback(debounce(updateQuery, 700), [userQuery]);

  const onChangefilter = (e: any) => {
    setUserQuery(e.target.value);
  };

  useEffect(() => {
    delayedQuery();

    // Cancel the debounce on useEffect cleanup.
    return delayedQuery.cancel;
  }, [userQuery, delayedQuery]);

  const onSearch = (searchText?) => {
    setUserQuery(searchText);
  };

  const onSelect = (option?) => {
    console.log(option);
  };
  //filtra clientes
  const onChange = async (value,option) => {    
     
    try {
     setid(value);
    setisselect(true);
    outCliente({id:option.value,nome:option.children}) ;
    } catch (error) {
      setid(0);
    setisselect(false);
    const option={
      value:0, children:""
    }
    onChange(0,{option});
    outEndereco({});
    }
  };
  useEffect(() => { 
    setEnderecos(_enderecos)
  }, [_enderecos])
  const openNewClient = () => {
    setVisible(true);
  };
  const setStatus = (status: boolean, basename: BaseListAutocomplet) => {
    if (status === false) {
      setVisible(false);
    } else {
      setVisible(false);
      console.log(basename.value);
      if (filterItems(basename.value).length === 0) {
        setClientes((names) => [...names, basename]);
      } else {
        console.log("já existe");
      }
      // clientes.push(newcliente);
    }
  }; 
const addendereco=(elemento:Endereco)=>{
   console.log(elemento);
   
  outEndereco(elemento);
 
}

  return (
    <>
    <div>
     <Card size="small" title="Selecionar Cliente" extra={ <button
                    className="btn btn-falcon-primary btn-sm"
                    type="button"
                    onClick={openNewClient}
                  >
                    Novo Cliente
                  </button>} >
                  <Select className="  col-12"
                      showSearch 
                      allowClear
                      placeholder="Select a person"
                      optionFilterProp="children"
                      onSearch={onSearch}
                      onChange={onChange}

                      onSelect={onChange}                    >
                      {clientes.map((c) => {
                        return (
                          <Option key={c.option} value={c.option}>
                            {c.value}
                          </Option>
                        );
                      })}
                    </Select>
                    <EnderecoClientOD  controller={controller}  setAddEnderecos={addendereco} id={id} 
                     isselect={isselect}></EnderecoClientOD>
    </Card>
    
      <ModalNewCliente
        visible={visible}
        setStatus={setStatus}
        controller={controller}
      />
      </div>
    </>
  );
};

export default PassoOneCliente; 
