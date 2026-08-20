"use client";

import {
  obterEventosAtualizados,
  isEventoEncerrado,
} from "../utils/eventosFilter";
import { Trash2, Pencil, Plus } from "lucide-react";
import {
  ModalNovoEvento,
  type NovoEventoData,
} from "../components/ModalNovoEvento";
import { useState } from "react";

export interface EventoTabela {
  id: number;
  titulo: string;
  descricao?: string;
  imagem?: string;
  data: string;
  hora: string;
  local: string;
  vagasTotais: number;
  vagasDisponiveis: number;
  nomeProfessor: string;
  encerrado: boolean;
}

export default function EventosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventoEditando, setEventoEditando] = useState<EventoTabela | null>(
    null,
  );
  const [eventoDeletando, setEventoDeletando] = useState<number | null>(null);

  const { proximos, anteriores } = obterEventosAtualizados();
  const eventosIniciais: EventoTabela[] = [
    ...proximos.map((e) => ({ ...e, encerrado: false })),
    ...anteriores.map((e) => ({ ...e, encerrado: true })),
  ];

  const [listaEventos, setListaEventos] =
    useState<EventoTabela[]>(eventosIniciais);

  const proximoId =
    listaEventos.length > 0
      ? Math.max(...listaEventos.map((e) => e.id)) + 1
      : 1;

  function handleCriarEvento(dadosDoForm: NovoEventoData) {
    const novoEvento: EventoTabela = {
      id: dadosDoForm.id,
      titulo: dadosDoForm.titulo,
      descricao: dadosDoForm.descricao,
      imagem: dadosDoForm.imagem,
      data: dadosDoForm.data,
      hora: dadosDoForm.hora,
      local: dadosDoForm.local || "não cadastrado",
      vagasTotais: dadosDoForm.vagasTotais,
      vagasDisponiveis: dadosDoForm.vagasTotais,
      nomeProfessor: dadosDoForm.nomeProfessor || "não cadastrado",
      encerrado: isEventoEncerrado(dadosDoForm.data),
    };

    setListaEventos((atual) => [novoEvento, ...atual]);
    setIsModalOpen(false);
  }

  function handleAbrirNovoEvento() {
    setEventoEditando(null);
    setIsModalOpen(true);
  }

  function handleAbrirEdicao(evento: EventoTabela) {
    setEventoEditando(evento);
    setIsModalOpen(true);
  }

  function handleFecharModal(open: boolean) {
    setIsModalOpen(open);
    if (!open) {
      setEventoEditando(null);
    }
  }

  function handleEditarEvento(dadosDoForm: NovoEventoData) {
    setListaEventos((atual) =>
      atual.map((evento) => {
        if (evento.id !== dadosDoForm.id) return evento;

        const vagasOcupadas = evento.vagasTotais - evento.vagasDisponiveis;
        const vagasDisponiveis = Math.max(
          dadosDoForm.vagasTotais - vagasOcupadas,
        );

        return {
          ...evento,
          titulo: dadosDoForm.titulo,
          descricao: dadosDoForm.descricao,
          imagem: dadosDoForm.imagem,
          data: dadosDoForm.data,
          hora: dadosDoForm.hora,
          local: dadosDoForm.local || "não cadastrado",
          vagasTotais: dadosDoForm.vagasTotais,
          vagasDisponiveis,
          nomeProfessor: dadosDoForm.nomeProfessor || "não cadastrado",
          encerrado: isEventoEncerrado(dadosDoForm.data),
        };
      }),
    );

    setIsModalOpen(false);
    setEventoEditando(null);
  }

  function handleExcluirEvento(id: number) {
    setListaEventos((atual) => atual.filter((evento) => evento.id !== id));
    setEventoDeletando(null);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* CABEÇALHO */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-1">
              Gestão de Eventos
            </h1>
            <p className="text-gray-500 text-sm">
              {listaEventos.length} eventos cadastrados
            </p>
          </div>
          <button
            onClick={handleAbrirNovoEvento}
            className="bg-lime-400 hover:bg-lime-300 text-black font-bold py-2.5 px-6 rounded-xl transition-colors flex items-center gap-2 text-sm"
          >
            <span>
              <Plus size={16} />
            </span>{" "}
            Novo Evento
          </button>
        </header>

        {/* TABELA */}
        <div className="bg-[#111111] border border-gray-800/60 rounded-2xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-800/60 text-gray-600 font-extrabold text-xs uppercase tracking-wider">
                <th className="py-4 px-6 font-medium">Nome</th>
                <th className="py-4 px-6 font-medium">Data</th>
                <th className="py-4 px-6 font-medium">Horário</th>
                <th className="py-4 px-6 font-medium">Local</th>
                <th className="py-4 px-6 font-medium text-center">Total</th>
                <th className="py-4 px-6 font-medium text-center">
                  Disponíveis
                </th>
                <th className="py-4 px-6 font-medium">Professor</th>
                <th className="py-4 px-6 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-300">
              {listaEventos.map((evento, index) => (
                <tr
                  key={evento.id}
                  className={`border-b border-gray-800/40 hover:bg-white/[0.02] transition-colors ${
                    index === listaEventos.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  {/* Nome do Evento */}
                  <td className="py-4 px-6">
                    <p
                      className="font-bold text-white truncate max-w-[200px]"
                      title={evento.titulo}
                    >
                      {evento.titulo}
                    </p>
                    {evento.encerrado && (
                      <span className="text-[10px] text-gray-600 tracking-wider font-semibold mt-0.5 block">
                        Encerrado
                      </span>
                    )}
                  </td>

                  {/* Data */}
                  <td className="py-4 px-6 text-gray-400">{evento.data}</td>

                  {/* Horário */}
                  <td className="py-4 px-6 text-gray-400">{evento.hora}</td>

                  {/* Local */}
                  <td className="py-4 px-6 text-gray-600">
                    <p className="truncate max-w-[150px]" title={evento.local}>
                      {evento.local}
                    </p>
                  </td>

                  {/* Total de Vagas */}
                  <td className="py-4 px-6 text-center text-gray-400">
                    {evento.vagasTotais}
                  </td>

                  {/* Vagas Disponíveis */}
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`${
                        evento.vagasDisponiveis > 0
                          ? "text-lime-400"
                          : "text-red-500"
                      } font-bold`}
                    >
                      {evento.vagasDisponiveis > 0
                        ? evento.vagasDisponiveis
                        : 0}
                    </span>
                  </td>

                  {/* Professor */}
                  <td className="py-4 px-6 text-gray-600">
                    {evento.nomeProfessor}
                  </td>

                  {/* Ações */}
                  <td className="py-4 px-6 text-right">
                    {eventoDeletando === evento.id ? (
                      /* CONFIRMAÇÃO */
                      <div className="flex items-center justify-end gap-3 text-sm font-medium">
                        <span className="text-red-500">Excluir?</span>
                        <button
                          onClick={() => handleExcluirEvento(evento.id)}
                          className="text-red-500 rounded px-2 py-0.5 hover:text-red-400 transition-colors"
                        >
                          Sim
                        </button>
                        <button
                          onClick={() => setEventoDeletando(null)}
                          className="text-gray-400 hover:text-gray-200 transition-colors"
                        >
                          Não
                        </button>
                      </div>
                    ) : (
                      /* ÍCONES */
                      <div className="flex items-center justify-end gap-4 text-gray-600">
                        <button
                          onClick={() => handleAbrirEdicao(evento)}
                          className="hover:text-lime-400 transition-colors hover:bg-gray-800 rounded-md p-1.5"
                          title="Editar Evento"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => setEventoDeletando(evento.id)}
                          className="hover:text-red-500 transition-colors hover:bg-gray-800 rounded-md p-1.5"
                          title="Excluir Evento"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ModalNovoEvento
          isOpen={isModalOpen}
          onOpenChange={handleFecharModal}
          onCriar={handleCriarEvento}
          onEditar={handleEditarEvento}
          proximoId={proximoId}
          eventoEditando={eventoEditando}
        />
      </div>
    </div>
  );
}
