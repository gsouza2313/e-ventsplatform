import Link from "next/link";

export function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] border-t border-gray-800/60 pt-16 pb-8 font-sans mt-auto">
      <div className="w-full px-5 md:px-48">
        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-4">
            <div className="text-2xl font-black uppercase tracking-wider font-anton">
              <span className="text-lime-400">E-vents</span>{" "}
            </div>
            <p className="mt-4 text-sm text-gray-600 max-w-sm leading-relaxed">
              Plataforma de gestão de cursos e workshops para profissionais e
              estudantes de tecnologia.
            </p>
          </div>

          {/* NAVEGAÇÃO */}
          <div className="md:col-span-3 md:col-start-5">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-5">
              Navegação
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link
                  href="/"
                  className="hover:text-lime-400 transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/eventos"
                  className="hover:text-lime-400 transition-colors"
                >
                  Gestão de Eventos
                </Link>
              </li>
              <li>
                <Link
                  href="/participantes"
                  className="hover:text-lime-400 transition-colors"
                >
                  Gestão de Participantes
                </Link>
              </li>
            </ul>
          </div>

          {/* DESENVOLVIDO POR */}
          <div className="md:col-span-3 md:col-start-9">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-5">
              Desenvolvido Por
            </h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>Equipe de Desenvolvimento</li>
              <li>
                <span className="text-gray-700">contato@e-vents.dev</span>
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-16 pt-8 border-t border-gray-800/60 flex items-center justify-center">
          <p className="text-xs text-gray-700">
            &copy; {anoAtual} E-vents. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
