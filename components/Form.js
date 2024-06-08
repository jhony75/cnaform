import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { supabase } from '../utils/supabaseClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/Home.module.css';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    phone: Yup.string().required('Celular/Whatsapp é obrigatório'),
    interest_unit: Yup.string().required('Unidade de interesse é obrigatória'),
});

const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {
        const { error } = await supabase
            .from('prospect')
            .insert([{ ...data }]);

        if (error) {
            toast.error(`Erro: ${error.message}`);
        } else {
            toast.success('Cadastro realizado com sucesso!');
        }
    };

    return (
        <div className={styles.formContainer}>
            <ToastContainer />
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Nome:</label>
                    <input className={styles.input} type="text" {...register('name')} />
                    <p className={styles.error}>{errors.name?.message}</p>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Email:</label>
                    <input className={styles.input} type="email" {...register('email')} />
                    <p className={styles.error}>{errors.email?.message}</p>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Celular/Whatsapp:</label>
                    <input className={styles.input} type="text" {...register('phone')} />
                    <p className={styles.error}>{errors.phone?.message}</p>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Unidade de Interesse:</label>
                    <select className={styles.select} {...register('interest_unit')}>
                        <option value="Colégio Santa Edwiges">Colégio Santa Edwiges</option>
                        <option value="CNA Sócrates">CNA Sócrates</option>
                        <option value="CNA Pinheiros">CNA Pinheiros</option>
                    </select>
                    <p className={styles.error}>{errors.interest_unit?.message}</p>
                </div>
                <div className={styles.lgpdNotice}>
                    <p>
                        Ao se cadastrar para participar do sorteio, você aceita ser comunicado por essas unidades da CNA para comunicação de promoções e eventos. Você pode a qualquer momento pedir o encerramento das comunicações e exclusão de seus dados.
                    </p>
                </div>
                <button className={styles.button} type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default Form;

