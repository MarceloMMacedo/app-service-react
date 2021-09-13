

import "./style.css"
interface GeralClienteProps {
  titleCleinte?: string | "",
}

function GeralCliente({ titleCleinte }: GeralClienteProps) {

  return (
    <>
<div className="col-xl-7 "> 
      <div  >
        <div className="card cardh mb-3">
          <div className="card-header bg-light">
            <div className="row flex-between-center">
              <div className="col-sm-auto">
                <h5 className="mb-2 mb-sm-0">Cliente</h5>
              </div>
            </div>
          </div>




          <div className=" scrollbar card-body">

            <div className="row">
              <div className="col-lg-6 ">

                <div className=" d-block" >
                  <span className="radio-select-content"><span> 2392 Main Avenue,<br />Pensaukee,<br />New Jersey 02139<span className="d-block mb-0 pt-2">+(856) 929-229</span></span></span>
                </div>
                <a className="fs--1" href="#!">Edit</a>
              </div>
              <div className="col-lg-6 ">
                <div className=" d-block" >
                  <span className="radio-select-content"><span> 2392 Main Avenue,<br />Pensaukee,<br />New Jersey 02139<span className="d-block mb-0 pt-2">+(856) 929-229</span></span></span>
                </div>
                <a className="fs--1" href="#!">Edit</a></div>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  );
}

export default GeralCliente;
