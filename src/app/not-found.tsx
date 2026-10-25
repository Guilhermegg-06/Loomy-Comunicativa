import Link from "next/link";

export default function NotFound() {
  return <main className="not-found shell"><p>Esse caminho ainda não virou ideia.</p><h1>Página não encontrada.</h1><Link href="/" className="button button-lime">Voltar ao início</Link></main>;
}
