import { Columns } from "../../types/columns";
import { ColOsOpen, MockOpenOs } from "./../../types/main";
import { formatDate } from "./../../util/formatters";
import Pagination from "../../components/Pagination";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { useCallback } from "react";
import { debounce, throttle } from "lodash";
import { useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.css";

import { ButtonGroup, Dropdown, Button, Table } from "react-bootstrap";
import { Radio } from "antd";
const Main = () => {
  const page = 0;
  const data = MockOpenOs;
  const columns: Columns[] = ColOsOpen;

  const [userQuery, setUserQuery] = useState("");

  const updateQuery = () => {
    // A search query api call.
    console.log(userQuery);
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

  const getPage = (pageNumber: number) => {
    console.log(pageNumber);

    const editar = (tipo: string, id: number) => {
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
  return (
    <>
      <Navbar /> 
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
                      <button className="btn  btn-sm btn-link" type="button">
                        <span className="fas fa-plus p-2"></span>
                        Novo Serviço
                      </button>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      <button className="btn  btn-sm btn-link" type="button">
                        <span className="fas fa-plus p-2"></span>
                        Nova Venda
                      </button>
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
            <Table
              responsive
              className="table table-sm fs--1 mb-0 overflow-hidden"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>#</th>
                  {columns.map((value, index) => (
                    <th>{value.name}</th>
                  ))}
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
                {data.map((value, index) => (
                  <tr key={index}>
                  <td><Radio></Radio> </td>
                    <td>{index}</td>
                    <td>{value.cliente?.nome}</td>
                    <td>
                      {" "}
                      {value.dataabertura && formatDate(value.dataabertura)}
                    </td>
                    <td> {value.datafim && formatDate(value.datafim)}</td>
                    <td> {value.tipo}</td>
                    <td> {value.status}</td>
                    <td>
                      {" "}
                      <button className="btn btn-sm btn-link">
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="row">
              <Pagination pageCount={8} range={1} onChange={getPage} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;
