import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { Ordem } from '../../../types/ordem/ordem';
import { requestBackend } from '../../../util/requests';
import { Card, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import ItemOrdem from '../../../components/ItemOrdem';
import ProdutosList from '../../../components/ProdutosList';
import { AnuncioDto } from '../../../types/anuncio-dto';
import {SpringPage} from './../../../types/vendor/spring'
interface ItensOrdemProps {
  ordem: Ordem,
  ordemId,
  controller: string,
  onSaveOrder: (obj) => void,
}

function ItensOrdemServico({ ordem, controller, onSaveOrder, ordemId }: ItensOrdemProps) {
  const [anuncioloja, setanuncioloja] = useState<SpringPage<AnuncioDto>>();
  const [anuncioservico, setanuncioservico] = useState();
  const [visible, setvisible] = useState(false);

  //lista anuncio loja
  //lista mao obra
  const listAnunciosLoja = (pageNumber: number,nome:string) => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url:  `anunciosloja/anuncios`,
      params: {
        nome:nome,
        page: pageNumber,
        size: 5,
      },
    };
    requestBackend(params)
    .then((response) => {
      setanuncioloja(response.data);
    })
    .finally(() => { 
    });
  }
  useEffect(() => {
    listAnunciosLoja(0,"");
    let params: AxiosRequestConfig = {
      method: "GET",
      url: `anunciosloja/anuncios`,
    };
     
    params = {
      method: "GET",
      url: `anuncioservicos/getallsample`,
    };
    requestBackend(params).then((rest) => {
      setanuncioservico(rest.data);
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
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="https://www.antgroup.com">Produto</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <a href="https://www.aliyun.com">Mão de Obra</a>
      </Menu.Item>

    </Menu>
  );
  return (
    <>
    <ProdutosList anunciolojas={anuncioloja} listAnunciosLoja={listAnunciosLoja} ></ProdutosList>
      <div className="card h-lg-100 overflow-hidden">
        <div className="card-body p-0">
          <div className="table-responsive scrollbar">
            <Card
              type="inner"
              title="Produtos/Serviços"
              extra={
                <Dropdown overlay={menu} trigger={['click']}>
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    Adicionar<DownOutlined />
                  </a>
                </Dropdown>}
            >
              <div className="card-body p-0">
                <div className="row gx-card mx-0 bg-200 text-900 fs--1 fw-semi-bold">
                  <div className="col-9 col-md-8 py-2">Descrição</div>
                  <div className="col-3 col-md-4">
                    <div className="row">
                      <div className="col-md-8 py-2 d-none d-md-block text-center">Quantidade</div>
                      <div className="col-12 col-md-4 text-end py-2">Preço</div>
                    </div>
                  </div>
                </div>


                  {ordem && ordem.itensInsOrdemDtos}
                  <ItemOrdem children={''} />

                <div className="row fw-bold gx-card mx-0">
                  <div className="col-9 col-md-8 py-2 text-end text-900">Total</div>
                  <div className="col px-0">
                    <div className="row gx-card mx-0">
                      <div className="col-md-8 py-2 d-none d-md-block text-center">7 (items)</div>
                      <div className="col-12 col-md-4 text-end py-2">$8516</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer bg-light d-flex justify-content-end">
                <form className="me-3">
                  <div className="input-group input-group-sm"><input className="form-control" type="text" placeholder="Promocode" /><button className="btn btn-outline-secondary border-300 btn-sm" type="submit">Apply</button></div>
                </form><a className="btn btn-sm btn-primary" href="../../app/e-commerce/checkout.html">Checkout</a>
              </div>
            </Card>
          </div>
        </div>
      </div>

    </>
  );
}

export default ItensOrdemServico;
