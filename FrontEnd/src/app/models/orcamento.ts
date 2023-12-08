export interface Orcamento {
    id?: string;
    data: Date;
    unidadeId: string;
    clienteId: string;
    statusPedido: string;
    condicaoPagamento: string;
    prazoPagamento: number;
    observacao: string;
    status: number;
    total: number;
    vlTotal: string;
    createAt: Date;
    userCreated: string;
}

export interface Produto {
    id?: string;
    produto: string;
    volume: number;
    vlUnitario: string;
}
