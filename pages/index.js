import React from 'react';
import Form from '../components/Form';
import styles from '../styles/Home.module.css';

const Home = () => {
    return (
        <div className={styles.container}>
            <h1>Cadastro para Sorteio</h1>
            <Form />
        </div>
    );
};

export default Home;

