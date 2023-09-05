import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Visualização de Estruturas de Dados</h1>
      <ul>
        <li><Link href="/array">Array (Lista Sequencial)</Link></li>
      </ul>
    </div>
  );
}


