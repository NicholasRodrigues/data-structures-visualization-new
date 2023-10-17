import Link from 'next/link';
import React from 'react';
import styles from './styles.module.css';
import {useFadeInOnScroll} from "@/hooks/useFadeInOnScroll";

export default function Home() {
    const addToRefs = useFadeInOnScroll();
  return (
   
    <div className={styles.main}>
      
      <header>
      <img src="Images/ufpb_png.png" alt="UFPB" className={styles.ufpb}/>   
      <h1 className={styles.head}>PROJETO ESTRUTURA DE DADOS</h1>
      <p className={styles.subtitle}>Projeto da disciplina de Estrutura de Dados do professor Tiago Maritan, cuja proposta foi desenvolver uma representação visual do
      funcionamento do processo de inserção, remoção e consulta nas Listas Sequenciais, Listas Simplesmente Encadeadas (LSE) e Listas Duplamente Encadeadas (LDE). </p>
      </header>

        <h2 className = {styles.members}>PARTICIPANTES</h2>
        <div className={styles.images}  ref={addToRefs}>
        <img src="Images/felipe.jpeg" alt="Profile Picture" className={styles.felipe_pic}/>
        <img src="Images/nicholas.jpeg" alt="Profile Picture" className={styles.nicholas_pic}/>
        <img src="Images/tiago.jpeg" alt="Profile Picture" className={styles.tiago_pic}/>
        </div>
        <div className={styles.team_names} ref={addToRefs}>
          <p className={styles.felipe_name}>Felipe Duarte</p>
          <p className={styles.nicholas_name}>Nicholas Rodrigues</p>
          <p className={styles.tiago_name}>Tiago Trindade</p>            
        </div>

        <div className={styles.lists} ref={addToRefs}>
          <h2 className = {styles.content}>CONTEÚDO</h2>
          <p><Link href="/array" className ={styles.lista_sequencial}>Listas Sequenciais</Link></p>
          <p><Link href="/linkedList" className ={styles.lista_simples}>Listas Simplesmente Encadeadas</Link></p>
          <p><Link href="/doublyLinkedList" className ={styles.lista_dupla}>Listas Duplamente Encadeadas</Link></p>
        </div>

        <div className={styles.blockedlists} ref={addToRefs}>
          <p><Link href="/queue" className ={styles.pilha}>Pilhas</Link></p>
          <p><Link href="/stack" className ={styles.fila}>Filas</Link></p>
          <p><a className ={styles.arvore}>Árvores Binárias</a></p>
        </div>



      <footer className={styles.footer}> 
        <p className={styles.pe}>&copy; {new Date().getFullYear()} Projeto Estrutura de Dados</p>
      </footer>
     
    </div>
  );
}


