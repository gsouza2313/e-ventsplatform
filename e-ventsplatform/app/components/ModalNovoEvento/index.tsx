import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState, type FormEvent } from "react";
import ReactLenis, { useLenis } from "lenis/react";

export interface NovoEventoData {
  id: number;
  titulo: string;
  descricao: string;
  imagem?: string;
  data: string;
  hora: string;
  local?: string;
  vagasTotais: number;
  nomeProfessor?: string;
}

export interface EventoParaEditar {
  id: number;
  titulo: string;
  descricao?: string;
  imagem?: string;
  data: string;
  hora: string;
  local?: string;
  vagasTotais: number;
  vagasDisponiveis: number;
  nomeProfessor?: string;
}

interface ModalNovoEventoProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCriar: (dados: NovoEventoData) => void;
  onEditar: (dados: NovoEventoData) => void;
  proximoId: number;
  eventoEditando?: EventoParaEditar | null;
}

function formatarDataParaBR(dataISO: string): string {
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

function formatarDataParaISO(dataBR: string): string {
  const [dia, mes, ano] = dataBR.split("/");
  return `${ano}-${mes}-${dia}`;
}

const CAMPOS_INICIAIS = {
  titulo: "",
  imagem: "",
  descricao: "",
  data: "",
  hora: "",
  local: "",
  vagasTotais: "",
  nomeProfessor: "",
};

export function ModalNovoEvento({
  isOpen,
  onOpenChange,
  onCriar,
  onEditar,
  proximoId,
  eventoEditando,
}: ModalNovoEventoProps) {
  const lenis = useLenis();
  const [campos, setCampos] = useState(CAMPOS_INICIAIS);
  const [tempId, setTempId] = useState<number>(0);
  const modoEdicao = Boolean(eventoEditando);

  // Fix do scroll no fundo
  useEffect(() => {
    if (!lenis) return;

    if (isOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      lenis.start();
    };
  }, [isOpen, lenis]);

  // Reset / preenchimento do modal
  useEffect(() => {
    if (isOpen) {
      if (eventoEditando) {
        setTempId(eventoEditando.id);
        setCampos({
          titulo: eventoEditando.titulo,
          imagem: eventoEditando.imagem || "",
          descricao: eventoEditando.descricao || "",
          data: formatarDataParaISO(eventoEditando.data),
          hora: eventoEditando.hora,
          local: eventoEditando.local || "",
          vagasTotais: String(eventoEditando.vagasTotais),
          nomeProfessor: eventoEditando.nomeProfessor || "",
        });
      } else {
        setTempId(proximoId);
        setCampos(CAMPOS_INICIAIS);
      }
    } else {
      setTempId(proximoId);
      setCampos(CAMPOS_INICIAIS);
    }
  }, [isOpen, eventoEditando, proximoId]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setCampos((atual) => ({ ...atual, [name]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const dados: NovoEventoData = {
      id: tempId,
      titulo: campos.titulo,
      descricao: campos.descricao,
      imagem: campos.imagem || undefined,
      data: formatarDataParaBR(campos.data),
      hora: campos.hora,
      local: campos.local || undefined,
      vagasTotais: Number(campos.vagasTotais),
      nomeProfessor: campos.nomeProfessor || undefined,
    };

    if (modoEdicao) {
      onEditar(dados);
    } else {
      onCriar(dados);
    }
  }

  const vagasOcupadas = eventoEditando
    ? eventoEditando.vagasTotais - eventoEditando.vagasDisponiveis
    : 0;

  const vagasDisponiveis = campos.vagasTotais
    ? Math.max(Number(campos.vagasTotais) - vagasOcupadas)
    : "-";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#111111] border-gray-800 text-white w-full sm:max-w-xl p-0 shadow-2xl max-h-[90dvh] overflow-hidden">
        <ReactLenis
          options={{ lerp: 0.1, duration: 1 }}
          className="max-h-[90dvh] overflow-y-auto scrollbar-hide px-6"
        >
          {/* CABEÇALHO */}
          <DialogHeader className="flex flex-col px-0 py-4 border-b border-gray-800/80">
            <DialogTitle className="text-lg font-anton uppercase tracking-wider text-white">
              {modoEdicao ? "Editar Evento" : "Novo Evento"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mb-6">
            {/* NOME DO EVENTO */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6">
                Nome do Evento <span className="text-lime-400">*</span>
              </label>
              <input
                type="text"
                name="titulo"
                value={campos.titulo}
                onChange={handleChange}
                required
                placeholder="Título do curso ou workshop"
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-lime-400 transition-colors"
              />
            </div>

            {/* URL DA IMAGEM */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                URL da Imagem{" "}
                <span className="text-gray-600 normal-case font-normal tracking-normal">
                  (opcional)
                </span>
              </label>
              <input
                type="text"
                name="imagem"
                value={campos.imagem}
                onChange={handleChange}
                placeholder="https://"
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-lime-400 transition-colors"
              />
            </div>

            {/* DESCRIÇÃO */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Descrição <span className="text-lime-400">*</span>
              </label>
              <textarea
                name="descricao"
                value={campos.descricao}
                onChange={handleChange}
                required
                placeholder="Descreva o conteúdo do evento"
                rows={3}
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-lime-400 transition-colors resize-none"
              ></textarea>
            </div>

            {/* DATA E HORÁRIO */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Data <span className="text-lime-400">*</span>
                </label>
                <input
                  type="date"
                  name="data"
                  value={campos.data}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-lime-400 transition-colors"
                  style={{ colorScheme: "dark" }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Horário <span className="text-lime-400">*</span>
                </label>
                <input
                  type="time"
                  name="hora"
                  value={campos.hora}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-lime-400 transition-colors"
                  style={{ colorScheme: "dark" }}
                />
              </div>
            </div>

            {/* LOCAL */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Local{" "}
                <span className="text-gray-600 normal-case font-normal tracking-normal">
                  (opcional)
                </span>
              </label>
              <input
                type="text"
                name="local"
                value={campos.local}
                onChange={handleChange}
                placeholder="Endereço físico do evento"
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-lime-400 transition-colors"
              />
            </div>

            {/* VAGAS TOTAIS E DISPONÍVEIS */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Vagas Totais <span className="text-lime-400">*</span>
                </label>
                <input
                  type="number"
                  name="vagasTotais"
                  value={campos.vagasTotais}
                  onChange={handleChange}
                  required
                  placeholder="0"
                  min="1"
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-lime-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Vagas Disponíveis
                </label>
                <input
                  type="text"
                  value={vagasDisponiveis}
                  disabled
                  className="w-full bg-[#111111]/50 border border-gray-800/50 rounded-xl px-4 py-3 text-sm text-lime-400 font-bold focus:outline-none cursor-not-allowed"
                />
              </div>
            </div>

            {/* NOME DO PROFESSOR */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Nome do Professor{" "}
                <span className="text-gray-600 normal-case font-normal tracking-normal">
                  (opcional)
                </span>
              </label>
              <input
                type="text"
                name="nomeProfessor"
                value={campos.nomeProfessor}
                onChange={handleChange}
                placeholder="Responsável ou palestrante"
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-lime-400 transition-colors"
              />
            </div>

            {/* BOTÃO DE AÇÃO */}
            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="flex-1 py-3 px-4 rounded-xl border border-gray-800 text-gray-500 hover:border-lime-800 hover:text-gray-300 transition-colors font-semibold text-sm"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-xl bg-lime-400 text-black hover:bg-lime-300 transition-colors font-bold text-sm"
              >
                {modoEdicao ? "Salvar Alterações" : "Criar Evento"}
              </button>
            </div>
          </form>
        </ReactLenis>
      </DialogContent>
    </Dialog>
  );
}
