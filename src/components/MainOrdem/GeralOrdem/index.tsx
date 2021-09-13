 

import  "./style.css"
interface GeralOrdemProps {
 titleGeral?: string | "",
}

function GeralOrdem({ titleGeral }: GeralOrdemProps) {
  return (
    <>
     <div className="col-xl-3  pe-xl-2">
          <div className="card mb-3 cardh">
            <div className="card-header bg-light btn-reveal-trigger d-flex flex-between-center">
              <h5 className="mb-0">{titleGeral}</h5>
              <span className="fas fa-pencil-alt"></span>
            </div>
            <div className="card-body">
              <table className="table table-borderless fs--1 mb-0">
                <tr className="border-bottom">
                  <th className="ps-0">Id. Ordem</th>
                  <th className="pe-0 text-end">1200</th>
                </tr>
                <tr className="border-bottom">
                  <th className="ps-0">Abertura</th>
                  <th className="pe-0 text-end">Abertura</th>
                </tr>
                <tr className="border-bottom">
                  <th className="ps-0">Previsão</th>
                  <th className="pe-0 text-end">data Previsão</th>
                </tr>
                <tr className="border-bottom">
                  <th className="ps-0">Conclusão</th>
                  <th className="pe-0 text-end">dataConclusão</th>
                </tr>
                <tr className="border-bottom">
                  <th className="ps-0">Técnico</th>
                  <th className="pe-0 text-end ">Técnico</th>
                </tr>
                <tr className="border-bottom">
                  <th className="ps-0">Origem Chamado</th>
                  <th className="pe-0 text-end ">Origem Chamado</th>
                </tr>
              </table>
            </div>

          </div>
        </div>

    </>
  );
}

export default GeralOrdem;
