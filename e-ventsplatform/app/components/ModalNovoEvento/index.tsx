import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import ReactLenis, { useLenis } from "lenis/react";

interface ModalNovoEventoProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ModalNovoEvento({
  isOpen,
  onOpenChange,
}: ModalNovoEventoProps) {
  const lenis = useLenis();

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
              Novo Evento
            </DialogTitle>
          </DialogHeader>

          <form className="space-y-5 mb-6">
            {/* NOME DO EVENTO */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6">
                Nome do Evento <span className="text-lime-400">*</span>
              </label>
              <input
                type="text"
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
                  value="-"
                  disabled
                  className="w-full bg-[#1a1a1a]/50 border border-gray-800/50 rounded-xl px-4 py-3 text-sm text-lime-400 font-bold focus:outline-none cursor-not-allowed"
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
                Criar Evento
              </button>
            </div>
          </form>
        </ReactLenis>
      </DialogContent>
    </Dialog>
  );
}
