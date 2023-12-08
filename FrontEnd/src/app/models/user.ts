export interface User {
    id?: string;
    login: string;
    senha: string;
    email: string;
    nome: string;
    sexo: string;
    dataNascimento: Date;
    telefone: string;
    endereco: string;
    bairro: string;
    cidade: string;
    cep: string;
    nivelAcesso: UserTypeEnum;
    unidadeId: string;
    foto: string;
    status: number;
    
}

export enum UserTypeEnum {
    colaborador = 'Colaborador',
    gerente = 'Gerente',
    diretor = 'Diretor'
}