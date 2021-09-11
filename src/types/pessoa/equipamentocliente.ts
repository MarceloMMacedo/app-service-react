import { Medidor } from './medidor';
import { SampleDto } from '../sampledto';
import { Modelo } from '../modelo';

export type EquipamentoCliente = {

  id?: number,
  nome?: string,
  imagem?: string,
  extension?: string,
  imagemView?: string,
  tipo?: string,
  modelo?: Modelo,
  contrato?: number,
  medidorServico?: Medidor,
  cliente?: SampleDto,
  serial?: string,
  local?: string,
}

export function newEquipamentoCliente(idCliente: number) {
  let eq: EquipamentoCliente = {
    nome: "",
    imagem: "",
    extension: "",
    imagemView: "",
    tipo: "",
    modelo: {},
    cliente: { id: idCliente },
    serial: "",
    local:""
  }
  return eq;
}
