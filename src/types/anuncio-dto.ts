import { SampleDto } from "./sampledto";

export type AnuncioDto = {

  id?: number,
  nome?: string,
  descricao?: string,
  grupopreco?: SampleDto,
  dataVencimento?: Date,
  saldo?: number,
  saldoMinimo?: number,
  saldoReserva?: number,
  saldoMaximo?: number,
  status?: string,
  // valorInterno?: number,
  saldoReposicao?: number,
  valorFinal?: number,
  peso?: number,
  largura?: number,
  comprimento?: number,
  altura?: number,
  unidade?: string,
  itensProduto?: ItemProdutoAnuncio[],
  descricoes?: DescricaoAnuncio[],
  imagens?: ListaImagens[],
  imagem?: string,
  imagemView: string,
  extension?: string,
  desconto?: number,
  isPrecificado?: string,
  valorInterno?: number,
  tocontrato?: SampleDto,
  saldoDisponivel?: number,
  valorPredefinido?: number,
}

export interface ItemProdutoAnuncio {
  produto?: SampleDto;
  quantidade?: number;
  valor?: number;
  subtotal?: number;
  descricao?: string;
}
export interface DescricaoAnuncio {
  titulo?: string;
  descricao?: string;
}
export interface ListaImagens {
  imagem?: string;
  extension?: string;
  srcImagem?: string;
}
