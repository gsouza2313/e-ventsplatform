import { Pencil, Plus, Trash2 } from "lucide-react";
import { todosEventos } from "../lib/dataEventos";
import { participantes } from "../lib/dataParticipantes";

const estilosStatus: Record<string, string> = {
  Confirmada: "border-lime-400/30 bg-lime-400/10 text-lime-400",
  Pendente: "border-amber-400/30 bg-amber-400/10 text-amber-400",
};

const estilosFuncao: Record<string, string> = {
  Participante: "border-gray-700 bg-gray-800/50 text-gray-400",
  Professor: "border-blue-400/30 bg-blue-400/10 text-blue-400",
  Palestrante: "border-purple-400/30 bg-purple-400/10 text-purple-400",
};

export default function ParticipantesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8 font-sans text-white md:p-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="mb-1 text-2xl font-black uppercase tracking-tight md:text-3xl">
              Gestão de Participantes
            </h1>

            <p className="text-sm text-gray-500">
              {participantes.length} participantes cadastrados
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-lime-400 px-6 py-2.5 text-sm font-bold text-black transition-colors hover:bg-lime-300"
          >
            <Plus size={16} />
            Novo Participante
          </button>
        </header>

        <div className="overflow-x-auto rounded-2xl border border-gray-800/60 bg-[#111111]">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-800/60 text-xs font-extrabold uppercase tracking-wider text-gray-600">
                <th className="px-6 py-4 font-medium">Nome</th>
                <th className="px-6 py-4 font-medium">E-mail</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Função</th>
                <th className="px-6 py-4 font-medium">Eventos</th>
                <th className="px-6 py-4 text-right font-medium">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-300">
              {participantes.map((participante, index) => (
                <tr
                  key={participante.id}
                  className={`border-b border-gray-800/40 transition-colors hover:bg-white/[0.02] ${
                    index === participantes.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <p className="max-w-[190px] truncate font-bold text-white">
                      {participante.nome}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-gray-400">
                    {participante.email}
                  </td>

                  <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                              estilosStatus[participante.status]
                            }`}
                          >
                            {participante.status}
                          </span>
                    </td> 

                  <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs ${
                            estilosFuncao[participante.funcao]
                          }`}
                        >
                          {participante.funcao}
                        </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex max-w-[270px] gap-2 overflow-hidden">
                      {participante.eventosInscritosIds.map((eventoId) => {
                        const evento = todosEventos.find(
                          (item) => item.id === eventoId,
                        );

                        if (!evento) return null;

                        return (
                          <span
                            key={evento.id}
                            title={evento.titulo}
                            className="shrink-0 truncate rounded-md border border-gray-800/80 bg-white/[0.03] px-2.5 py-1 text-xs text-gray-500"
                          >
                            {evento.titulo}
                          </span>
                        );
                      })}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-4 text-gray-600">
                      <button
                        type="button"
                        title={`Editar ${participante.nome}`}
                        className="rounded-md p-1.5 transition-colors hover:bg-gray-800 hover:text-lime-400"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        title={`Excluir ${participante.nome}`}
                        className="rounded-md p-1.5 transition-colors hover:bg-gray-800 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}