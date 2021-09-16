
import { Divider } from 'antd';
import { AxiosRequestConfig } from 'axios';
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { AnuncioDto } from '../../types/anuncio-dto';
import { SpringPage } from '../../types/vendor/spring';
import { formatPrice } from '../../util/formatters';
import Paginationn from '../Pagination';

import './style.css';
interface ProdutosListProps {
  anunciolojas: SpringPage<AnuncioDto>,
  listAnunciosLoja: (pageNumber: number, nome: string) => void
}

function ProdutosList({ anunciolojas, listAnunciosLoja }: ProdutosListProps) {
  const [produtos, setprodutos] = useState();
  const [nome, setnome] = useState("");
  const [pagenumber, setpagenumber] = useState(0);

  const [userQuery, setUserQuery] = useState("");
  const updateQuery = () => { 
    setnome(userQuery);
    listAnunciosLoja(pagenumber, userQuery);

  };

  const delayedQuery = useCallback(debounce(updateQuery, 700), [userQuery]);

  const onChangefilter = (e: any) => {
    setUserQuery(e.target.value);
  };

  useEffect(() => {
    delayedQuery();

    return delayedQuery.cancel;
  }, [userQuery, delayedQuery]);

  const getProducts = (pagenumber1) => {
    listAnunciosLoja(pagenumber1, nome);
    setpagenumber(pagenumber1)
  }

  function item(anuncioloja: AnuncioDto) {
    return (
      <div className="col-12 p-card">
        <div className="row">
          <div className="col-sm-5 col-md-4">
            <div className="position-relative h-sm-100">
              <a className="d-block h-100"  >
                <img className="  fit-cover  rounded-1 absolute-sm-centered imageh"
                  src={anuncioloja.imagemView} alt="" /></a>

            </div>
          </div>
          <div className="col-sm-7 col-md-8">
            <div className="row">
              <div className="col-lg-8">
                <h5 className="mt-3 mt-sm-0">
                  <a className="text-dark fs-0 fs-lg-1"  >{anuncioloja.nome}</a></h5>
                <p className="fs--1 mb-2 mb-md-3"><a className="text-500" href="#!">{anuncioloja.descricao} </a></p>
                <ul className="list-unstyled d-none d-lg-block">
                  {anuncioloja.descricoes.map(x => <li><span className="fas fa-circle m-2" data-fa-transform="shrink-12"></span><span>{x.titulo}: {x.descricao}</span></li>)}

                </ul>
              </div>
              <div className="col-lg-4 d-flex justify-content-between flex-column">
                <div>
                  <h3 className="fs-1 fs-md-2 text-warning mb-0"><strong>{formatPrice(anuncioloja.valorFinal)} </strong> </h3>

                  <p className="fs--1 mb-1">Disponibilidade: <strong>{anuncioloja.saldoDisponivel} </strong></p>
                  <p className="fs--1 mb-1">Stock: <strong className="text-success">{anuncioloja.status === 'Ativo' || anuncioloja.saldoDisponivel > 0 ? "Disponível" : "Indisponível"} </strong></p>
                </div>
              </div>
              <div className="mt-2">
                <button disabled={anuncioloja.status !== 'Ativo' || anuncioloja.saldoDisponivel <= 0}
                  className="btn btn-sm btn-primary d-lg-block mt-lg-2" ><span className="fas fa-cart-plus">
                  </span><span className="ms-2 d-none d-md-inline-block">Add to Cart</span></button></div>
            </div>
          </div>
        </div>
      </div>


    );
  }

  return (
    <>
      <div className=" search-box m-4  " data-bs-toggle="search" data-bs-display="static">
        <input className="form-control search-input fuzzy-search" type="search" placeholder="Search..." aria-label="Search" onChange={(e) => { setUserQuery(e.target.value) }} />
        <span className="fas fa-search search-box-icon"></span>
      </div>
     
      <div className="card">
        <div className="card-body p-0 overflow-hidden">
          <div className="row g-0">
          </div>
          {anunciolojas && anunciolojas.content.map((x) => item(x))}

        </div>
      </div>
      <div className="card-footer border-top d-flex justify-content-center">
        <Paginationn
          pageCount={anunciolojas ? anunciolojas.totalPages : 0}
          range={3}
          onChange={getProducts}
        /></div>

    </>
  );
}

export default ProdutosList;
