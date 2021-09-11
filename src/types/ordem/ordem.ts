import { Contato } from './../pessoa/contato';
import { Endereco } from './../pessoa/endereco';
import { ItensOrdemVenda } from './itensrdemvenda';
import { EquipamentoCliente } from './../pessoa/equipamentocliente';
import { SampleDto } from './../sampledto';
import { FinanceiroOrdem } from './financeiroordem';
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
    tecnico?: string,
    garantia?: SampleDto,
    itensOrdemVenda?: ItensOrdemVenda[],
    setorentrega?: string,
    total?: number,
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
}
export function  newOrdem(data){
  const  ordem={ 
        nome: "",
        descricao: "",
        imagem: "",
        extension: "",
        imagemView: "",
        canal: "",
        cliente: {nome:""},
        dataAbertura: new Date(),
        dataProgramada: data, 
        vendedor: {nome:""},
        equipamento:{} as  EquipamentoCliente,
        tecnico: "", 
        itensOrdemVenda:[] as ItensOrdemVenda[],
        setorentrega: "",
        total: null,
        /**
         * 
         * Aberto Concluido Aguardandoproduto
         */
        status: "Aberto",
        endereco:{} as Endereco,
        contato: {} as Contato,
        formaEntrega: "",
        valorEntrega: null,
      }
 return ordem;
}