export interface Estoque {
    produto: string;
    unidadeId: string;
    total: number;
    vlTotal: string;
}

export interface HistoricoEstoque {
    data: Date;
    quantidade: number;
    vlUnitario: number;
}
