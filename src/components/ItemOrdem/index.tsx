import { ReactNode } from 'react';
import imservico from './../../assets/images/servico.jpeg'
import improduto from './../../assets/images/produto.png'
interface IitemOrdemProps {
  children: ReactNode;
}

function ItemOrdem({ children }: IitemOrdemProps) {
  return (
    <>
      <div className="row gx-card mx-0 align-items-center border-bottom border-200">
        <div className="col-8 py-3">
          <div className="d-flex align-items-center"><a  >
            <img className="img-fluid rounded-1 me-3 d-none d-md-block"
              src={improduto} alt="" width="60" /></a>
            <div className="flex-1">
              <h5 className="fs-0"><a className="text-900" href="../../app/e-commerce/product/product-details.html">Apple MacBook Pro 15&quot; Z0V20008N: 2.9GHz 6-core 8th-Gen Intel Core i9, 32GB RAM</a></h5>
              <div className="fs--2 fs-md--1"><a className="text-danger" href="#!">Remove</a></div>
            </div>
          </div>
        </div>
        <div className="col-4 py-3">
          <div className="row align-items-center">
            <div className="col-md-8 d-flex justify-content-end justify-content-md-center order-1 order-md-0">
              <div>
                <div className="input-group input-group-sm flex-nowrap" data-quantity="data-quantity">
                  <button className="btn btn-sm btn-outline-secondary border-300 px-2" data-type="minus">-
                  </button>
                  <input className="form-control text-center px-2 input-spin-none" type="number" min="0" value="1" aria-label="Amount (to the nearest dollar)" style={{ width: 50 }} />
                  <button className="btn btn-sm btn-outline-secondary border-300 px-2" data-type="plus">+</button></div>
              </div>
            </div>
            <div className="col-md-4 text-end ps-0 order-0 order-md-1 mb-2 mb-md-0 text-600">$1292</div>
          </div>
        </div>
      </div>

    </>
  );
}

export default ItemOrdem;
