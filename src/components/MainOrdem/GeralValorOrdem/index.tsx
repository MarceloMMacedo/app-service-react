import  "./style.css"
interface GeralClienteProps {
  titleValor?: string | "",
}
function GeralValorOrdem({ titleValor }: GeralClienteProps) {
  return (
    <>
      
       
      <div className="col-xl-2 order-xl-1 ps-xl-2">
          <div className="card mb-2 cardh" >
            <div className="card-header bg-light btn-reveal-trigger d-flex flex-between-center">
              <h5 className="mb-0">Total Ordem Serviços</h5>
              <span className="fas fa-pencil-alt"></span>
            </div>
            <div className="card-body">
              <table className="table table-borderless fs--1 mb-0">
              <tr className="border-bottom">
                  <th className="ps-0">Id</th>
                  <th className="pe-0 text-end">id</th>
                </tr>
                <tr className="border-bottom">
                  <th className="ps-0">Serviços</th>
                  <th className="pe-0 text-end"> 3355</th>
                </tr>
               
                <tr className="border-bottom">
                  <th className="ps-0">Vendas</th>
                  <th className="pe-0 text-end">$20</th>
                </tr>
                
                
              </table>
            </div>
            <div className="card-footer d-flex justify-content-between bg-light">
              <div className="fw-semi-bold">Payable Total</div>
              <div className="fw-bold">$3320</div>
            </div>
          </div>
        </div>

    </>
  );
}

export default GeralValorOrdem;
