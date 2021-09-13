import { ReactNode } from 'react';
import MainOrdem from '../../components/MainOrdem';

interface OrdemServicoProps {
  children: ReactNode;
}

function OrdemServico() {
  return (
    <>
    <MainOrdem /> 
    </>
  );
}

export default OrdemServico;
