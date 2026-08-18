import { todosEventos } from "../lib/dataEventos";
import { participantes } from "../lib/dataParticipantes";

export default function ParticipantesPage() {
  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#080808] px-6 py-14 sm:px-10 lg:px-16">
      <section className="mx-auto max-w-[1540px]">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-anton text-4xl uppercase leading-none tracking-wide text-white sm:text-5xl">
              Gestão de Participantes
            </h1>

            <p className="mt-2 text-base text-zinc-500">
              {participantes.length} participantes cadastrados
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-lime-400 px-6 py-4 text-base font-bold text-black transition-colors hover:bg-lime-300"
          >
            <span className="text-2xl font-normal leading-none">+</span>
            Novo Participante
          </button>
        </div>

         <div className="overflow-x-auto rounded-3xl border border-lime-400/20 bg-[#101010]">
          <table className="min-w-[1080px] w-full border-collapse text-left">
            <thead className="border-b border-lime-400/15">
              <tr className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                <th className="px-5 py-5">Nome</th>
                <th className="px-5 py-5">E-mail</th>
                <th className="px-5 py-5">Status</th>
                <th className="px-5 py-5">Função</th>
                <th className="px-5 py-5">Eventos</th>
                <th className="px-5 py-5">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>

            <tbody>
                      {participantes.map((participante) => (
                        <tr
                          key={participante.id}
                          className="border-b border-white/5 last:border-b-0"
                        >
                          <td className="px-5 py-5 text-base font-bold text-white">
                            {participante.nome}
                          </td>

                          <td className="px-5 py-5 text-base text-zinc-500">
                            {participante.email}
                          </td>

                          <td className="px-5 py-5 text-base text-zinc-400">
                            {participante.status}
                          </td>

                          <td className="px-5 py-5 text-base text-zinc-400">
                            {participante.funcao}
                          </td>

                          <td className="px-5 py-5 text-base text-zinc-500">
                            {participante.eventosInscritosIds.length}{" "}
                            {participante.eventosInscritosIds.length === 1
                              ? "evento"
                              : "eventos"}
                          </td>

                          <td className="px-5 py-5 text-right text-zinc-600">—</td>
                        </tr>
                      ))}
             </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
