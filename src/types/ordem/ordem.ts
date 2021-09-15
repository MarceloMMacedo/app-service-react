import { Contato } from './../pessoa/contato';
import { Endereco } from './../pessoa/endereco';
import { EquipamentoCliente } from './../pessoa/equipamentocliente';
import { SampleDto } from './../sampledto';
import { FinanceiroOrdem } from './financeiroordem';
import { ItensInsOrdemDtos } from './itensInsOrdemDtos';
export type Ordem = {
  id?: number,
  nome?: string,
  descricao?: string,
  imagem?: string,
  extension?: string,
  imagemView?: string,
  canal?: string,
  cliente?: SampleDto,
  dataAbertura?: Date,
  dataProgramada?: Date,
  dataConclusao?: Date,
  vendedor?: SampleDto,
  equipamento?: EquipamentoCliente,
  tecnico?: SampleDto,
  garantia?: string,
  itensInsOrdemDtos?: ItensInsOrdemDtos[],
  setorentrega?: string,
  /**
   * 
   * Aberto Concluido Aguardandoproduto
   */
  status?: string,
  endereco?: Endereco,
  contato?: Contato,
  formaEntrega?: string,
  valorEntrega?: number,
  financeiroOrdem?: FinanceiroOrdem,
  totalItensMaoObra?: number,
  totalItensMaterial?: number,
  total?: number,
  origem?: string,
}
export function newOrdem(data) {
  const ordem = {
    nome: "",
    descricao: "",
    imagem: "",
    extension: "",
    imagemView: "",
    canal: "TELEFONE",
    cliente: { nome: "" },
    dataAbertura: new Date(),
    dataProgramada: data, 
    dataConclusao: data,
    vendedor: { nome: "" },
    equipamento: {} as EquipamentoCliente,
    tecnico: { id: 1 },
    itensInsOrdemDtos: [] as ItensInsOrdemDtos[],
    setorentrega: "",
    total: 0,
    /**
     * 
     * Aberto Concluido Aguardandoproduto
     */
    status: "Aberto",
    endereco: {} as Endereco,
    contato: {} as Contato,
    formaEntrega: "",
    valorEntrega: null,
  }
  return ordem;
}