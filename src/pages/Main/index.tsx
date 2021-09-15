
import { useState } from "react";
import { useCallback } from "react";
import { debounce } from "lodash";
import { useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.css";

import { ButtonGroup, Dropdown, Button, } from "react-bootstrap";
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../../util/requests";
import { formatDate } from "../../util/formatters";
import DataTable from "react-data-table-component";
import { Ordem } from "../../types/ordem/ordem";
import { useHistory } from "react-router";
import {Link} from 'react-router-dom'
 import NewOrdemServico from "../../components/newordem/NewOrdemServico";
import { number } from "yup/lib/locale";
import OrdemServico from "../OrdemServico";
const Main = () => {

  const [userQuery, setUserQuery] = useState("");
  const [ordens, setordens] = useState<Ordem[]>()
  const [orden, setorden] = useState<Ordem>()

  const selectOrder = useCallback(
    row => async () => {
      console.log(row.id, row.origem, row);
     // history.push(`/ordemservico/${"" + row.id}`);
      let ordemto=`/ordemservico/${"" + row.id}`;
      return <Link to={ordemto}>
        <OrdemServico />
      </Link>
/*<button className="btn btn-sm btn-link" onClick={selectOrder(row)}  >
        <i className="fas fa-pencil-alt"></i>
      </button>
*/
    }, []
  );
  //cell?: undefined;
  const columns = [
    {
      name: 'Cliente',
      selector: 'cliente.nome',
      sortable: true
      //  render: (text) => <a>{text}</a>,
    },
    {
      name: 'Abertura',
      selector: 'dataAbertura',
      sortable: true
    },
    {
      name: 'Programação',
      selector: 'dataProgramada',
      sortable: true
    }, {
      name: 'Técnico',
      selector: 'tecnico.nome',
      sortable: true
    },
    {
      name: 'Origem',
      selector: 'origem',
      sortable: true
    },
    {
      name: "editar",
      button: true,
      cell: row => (<Link to={`/ordemservico/${row.id}` }>
        
      <button className="btn btn-sm btn-link"    >
        <i className="fas fa-pencil-alt"></i>
      </button>
      </Link>),
    }
  ];

  const updateQuery = () => {
    console.log(userQuery);

    let params: AxiosRequestConfig = {
      method: "GET",
      url: `/mainorder/all?nome=${userQuery}`,
    };
    requestBackend(params).then((rest) => {
      var dados = rest.data;

      console.log(dados);
      dados.forEach(el => {
        var data1 = new Date(el.dataAbertura);
        var data2 = new Date(el.dataProgramada);
        el.dataAbertura = formatDate(data1);
        el.dataProgramada = formatDate(data2);
      });

      console.log(dados);

      setordens(dados);
    })

  };

  const delayedQuery = useCallback(debounce(updateQuery, 700), [userQuery]);

  const onChangefilter = (e: any) => {
    setUserQuery(e.target.value);
  };

  useEffect(() => {
    delayedQuery();

    return delayedQuery.cancel;
  }, [userQuery, delayedQuery]);

  const getPage = (pageNumber: number) => {
    console.log(pageNumber);

    const editar = (tipo: string, id: number) => {
      history.push(`/ordemservico/${id}`)
      console.log(tipo + id);
    };
    /*const params: AxiosRequestConfig = {
            method: 'GET',
          url: '/products',
          params: {
            page: pageNumber,
          size: 12,
      },*/
  };
  const history = useHistory();
  return (
    <>

      <div className="  container mt-3 card">
        <div className="card-header">
          <div className="row">
            <div className="col-12  ">
              <h5 className="">
                Ordem de Serviços Abertas
              </h5>
            </div>
          </div>
          <div className="row  ">
            <div className="col-4  ">
              <div >
                <Dropdown as={ButtonGroup}>
                  <Button className="btn btn-falcon-default btn-sm">
                    Nova
                  </Button>

                  <Dropdown.Toggle
                    split
                    className=" btn-falcon-default "
                    id="dropdown-split-basic"
                  />

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">

                      <a className="btn  btn-sm btn-link" href='/newordemservico' >
                        <span className="fas fa-plus p-2"></span>
                        Novo Serviço
                      </a>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      <a className="btn  btn-sm btn-link" href='/newordemservico' >
                        <span className="fas fa-plus p-2"></span>
                        Nova Venda
                      </a>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      <button className="btn  btn-sm btn-link" type="button">
                        <span className="fas fa-plus p-2"></span>
                        Novo Serviço Contrato
                      </button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="col-8 ">
              <input
                className="form-control search-input fuzzy-search col-lg-12 "
                type="search"
                onChange={onChangefilter}
                placeholder="Search..."
                aria-label="Search"
              />
            </div>
          </div>
        </div>
        <div className="card-body px-0 py-0">
          <div className="table-responsive scrollbar">
            <DataTable title="Ordem de Serviços Abertas" columns={columns} data={ordens ? ordens : []} pagination />
          </div>
        </div>
      </div>
    </>
  );
  /*
 
          */
};
export default Main;
