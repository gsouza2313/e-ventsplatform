"use client";

import { type FormEvent, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { todosEventos } from "../lib/dataEventos";
import { participantes as participantesIniciais } from "../lib/dataParticipantes";

type Participante = (typeof participantesIniciais)[number];

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
  const [modalAberto, setModalAberto] = useState(false);
  const [listaParticipantes, setListaParticipantes] =
    useState(participantesIniciais);

  function cadastrarParticipante(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formulario = event.currentTarget;
    const dados = new FormData(formulario);

    const novoParticipante: Participante = {
      id: Math.max(0, ...listaParticipantes.map((participante) => participante.id)) + 1,
      nome: String(dados.get("nome")).trim(),
      email: String(dados.get("email")).trim(),
      status: String(dados.get("status")),
      funcao: String(dados.get("funcao")),
      eventosInscritosIds: dados.getAll("eventos").map(Number),
    };

    setListaParticipantes((participantesAtuais) => [
      ...participantesAtuais,
      novoParticipante,
    ]);

    formulario.reset();
    setModalAberto(false);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8 font-sans text-white md:p-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="mb-1 text-2xl font-black uppercase tracking-tight md:text-3xl">
              Gestão de Participantes
            </h1>

            <p className="text-sm text-gray-500">
              {listaParticipantes.length} participantes cadastrados
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalAberto(true)}
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
              {listaParticipantes.map((participante, index) => (
                <tr
                  key={participante.id}
                  className={`border-b border-gray-800/40 transition-colors hover:bg-white/[0.02] ${
                    index === listaParticipantes.length - 1
                      ? "border-b-0"
                      : ""
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

      {modalAberto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-modal-participante"
        >
          <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-lime-400/20 bg-[#111111] shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800/60 px-6 py-5">
              <h2
                id="titulo-modal-participante"
                className="text-xl font-black uppercase"
              >
                Novo Participante
              </h2>

              <button
                type="button"
                onClick={() => setModalAberto(false)}
                className="rounded-md p-1 text-gray-500 transition-colors hover:bg-gray-800 hover:text-white"
                aria-label="Fechar modal"
              >
                <X size={22} />
              </button>
            </div>

            <form className="space-y-5 p-6" onSubmit={cadastrarParticipante}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500"
                >
                  E-mail *
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="email@exemplo.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-gray-800 bg-[#181818] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition-colors focus:border-lime-400/60"
                />
              </div>

              <div>
                <label
                  htmlFor="nome"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500"
                >
                  Nome *
                </label>

                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  placeholder="Nome completo"
                  autoComplete="name"
                  className="w-full rounded-xl border border-gray-800 bg-[#181818] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition-colors focus:border-lime-400/60"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="status"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500"
                  >
                    Status de inscrição *
                  </label>

                  <select
                    id="status"
                    name="status"
                    defaultValue="Pendente"
                    className="w-full rounded-xl border border-gray-800 bg-[#181818] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-lime-400/60"
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Confirmada">Confirmada</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="funcao"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500"
                  >
                    Função *
                  </label>

                  <select
                    id="funcao"
                    name="funcao"
                    defaultValue="Participante"
                    className="w-full rounded-xl border border-gray-800 bg-[#181818] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-lime-400/60"
                  >
                    <option value="Participante">Participante</option>
                    <option value="Professor">Professor</option>
                    <option value="Palestrante">Palestrante</option>
                  </select>
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Eventos inscritos
                </p>

                <div className="hide-scrollbar max-h-[260px] overflow-y-auto overscroll-contain rounded-xl border border-gray-800">
                  {todosEventos.map((evento) => (
                    <label
                      key={evento.id}
                      className="flex cursor-pointer items-center justify-between gap-4 border-b border-gray-800 px-4 py-3 last:border-b-0 hover:bg-white/[0.02]"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        <input
                          type="checkbox"
                          name="eventos"
                          value={evento.id}
                          className="h-4 w-4 shrink-0 accent-lime-400"
                        />

                        <span className="truncate text-sm text-gray-300">
                          {evento.titulo}
                        </span>
                      </span>

                      <span className="shrink-0 text-xs text-gray-600">
                        {evento.data}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => setModalAberto(false)}
                  className="rounded-xl border border-gray-800 px-4 py-3 text-sm font-semibold text-gray-400 transition-colors hover:border-gray-700 hover:bg-gray-800 hover:text-white"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-lime-400 px-4 py-3 text-sm font-bold text-black transition-colors hover:bg-lime-300"
                >
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}