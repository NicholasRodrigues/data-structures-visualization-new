import Link from 'next/link';
import React from 'react';
import styles from './styles.module.css';

export default function Home() {
  
  return (
   
    <div className={styles.main}>
      
      <header>
      <img src="Images/ufpb_png.png" alt="UFPB" className={styles.ufpb}/>   
      <h1 className={styles.title}>PROJETO ESTRUTURA DE DADOS</h1>
      <p className={styles.subtitle}>Projeto da disciplina de Estrutura de Dados do professor Tiago Maritan, cuja proposta foi desenvolver uma representação visual do
      funcionamento do processo de inserção, remoção e consulta nas Listas Sequenciais, Listas Simplesmente Encadeadas (LSE) e Listas Duplamente Encadeadas (LDE). </p>
      </header>
          
        <h2 className = {styles.participants}>PARTICIPANTES</h2>
        <div className={styles.images}>
        <img src="Images/felipe.jpeg" alt="Profile Picture" className={styles.felipe_pic}/>
        <img src="Images/nicholas.jpeg" alt="Profile Picture" className={styles.nicholas_pic}/>
        <img src="Images/tiago.jpeg" alt="Profile Picture" className={styles.tiago_pic}/>
        </div>
        <div className={styles.team_names}>
          <p className={styles.felipe_name}>Felipe Duarte</p>
          <p className={styles.nicholas_name}>Nicholas Rodrigues</p>
          <p className={styles.tiago_name}>Tiago Trindade</p>            
        </div>

        <div className={styles.lists}>
          <h2 className = {styles.content}>CONTEÚDO</h2>
          <p><Link href="/array" className ={styles.lista_sequencial}>Listas Sequenciais</Link></p>
          <p><Link href="/arraysimp" className ={styles.lista_simples}>Listas Simplesmente Encadeadas</Link></p>
          <p><Link href="/arraydup" className ={styles.lista_dupla}>Listas Duplamente Encadeadas</Link></p>        
        </div>

        <div className={styles.blockedlists}>
          <p><a className ={styles.pilha}>Pilhas</a></p>
          <p><a className ={styles.fila}>Filas</a></p>
          <p><a className ={styles.arvore}>Árvores Binárias</a></p>
        </div>



      <footer className={styles.footer}> 
        <p className={styles.pe}>&copy; {new Date().getFullYear()} Projeto Estrutura de Dados</p>
      </footer>
     
    </div>
  );
}


