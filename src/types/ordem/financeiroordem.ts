import { SampleDto } from './../sampledto';
export type FinanceiroOrdem = {
    banco?: SampleDto,
    centroCusto?: SampleDto,
    faturavel?: string;
    parcelas?: number;
    datavencimento?: Date

}