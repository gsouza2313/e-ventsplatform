"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { obterEventosAtualizados } from "../utils/eventosFilter"; 
import { Trash2, Pencil, Plus } from "lucide-react";
import { ModalNovoEvento } from "../components/ModalNovoEvento";
import { useState } from "react";

export default function EventosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { proximos, anteriores } = obterEventosAtualizados();
  const listaEventos = [
    ...proximos.map(e => ({ ...e, encerrado: false })),
    ...anteriores.map(e => ({ ...e, encerrado: true }))
  ];

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
            onClick={() => setIsModalOpen(true)}
            className="bg-lime-400 hover:bg-lime-500 text-black font-bold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 text-sm"
          >
            <span>+</span> Novo Evento
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
                <th className="py-4 px-6 font-medium text-center">Disponíveis</th>
                <th className="py-4 px-6 font-medium">Professor</th>
                <th className="py-4 px-6 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-300">
              {listaEventos.map((evento, index) => (
                <tr 
                  key={evento.id} 
                  className={`border-b border-gray-800/40 hover:bg-white/[0.02] transition-colors ${
                    index === listaEventos.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  {/* Nome do Evento */}
                  <td className="py-4 px-6">
                    <p className="font-bold text-white truncate max-w-[200px]" title={evento.titulo}>
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
                    <span className="text-lime-400 font-bold">
                      {evento.vagasDisponiveis}
                    </span>
                  </td>
                  
                  {/* Professor */}
                  <td className="py-4 px-6 text-gray-600">
                    {evento.nomeProfessor}
                  </td>
                  
                  {/* Ações */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-4 text-gray-600">
                      <button className="hover:text-lime-400 transition-colors hover:bg-gray-800 rounded-md p-1.5" title="Editar Evento">
                        <Pencil size={16}/>
                      </button>
                      <button className="hover:text-red-500 transition-colors hover:bg-gray-800 rounded-md p-1.5" title="Excluir Evento">
                        <Trash2 size={16}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ModalNovoEvento 
          isOpen={isModalOpen} 
          onOpenChange={setIsModalOpen} 
        />

      </div>
    </div>
  );
}