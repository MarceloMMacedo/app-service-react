import * as Yup from 'yup';

export default Yup.object().shape({
    nome: Yup.string().min(2).required(),
    cnpj: Yup.string().min(2).required(),
});