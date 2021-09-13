import { SampleDto } from "../sampledto";

export type ItensInsOrdemDtos = {
    id?: number,
    nome?: string,
    descricao?: string,
    imagem?: string,
    extension?: string,
    imagemView?: string,
    anuncioLoja?: SampleDto,
    anuncio?: SampleDto,
    quantidade?: number,
    valorUnitario?: number,
    desconto?: number,
    valorDesconto?: number,
    valortotal?: number,
    ordem?: SampleDto
    origemProduto?: string,
}
export function newItensInsOrdemDtos(idOrdem){
    const itensInsOrdemDtos={
        nome:"",
        descricao:"",
        imagem:"",
        extension:"",
        imagemView:"",
        anuncioLoja:{} as SampleDto,
        anuncio:{} as SampleDto,
        quantidade:0,
        valorUnitario:0,
        desconto:0,
        valorDesconto:0,
        valortotal:0,
        ordem: {id:idOrdem},
        origemProduto:"",
    }
    return itensInsOrdemDtos
}