export type ItensOrdemVenda = {
    idProduto?: number,
    quantidade?: number,
    valorUnitario?: number,
    desconto?: number,
    valorDesconto?: number,
    valortotal?: number,
    produto?: string,
    /**
     * 
     * 0-AnuncioWeb 1-AnuncioLoja 2-AnuncioContrato
     */
    origemProduto?: string,

}