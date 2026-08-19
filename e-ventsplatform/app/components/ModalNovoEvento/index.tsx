import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalNovoEventoProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ModalNovoEvento({
  isOpen,
  onOpenChange,
}: ModalNovoEventoProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#111111] border-gray-800 text-white sm:max-w-xl p-8 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-anton uppercase tracking-wider text-white mb-2">
            Novo Evento
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-5 mt-4">
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
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-lime-400 transition-colors"
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
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-lime-400 transition-colors resize-none"
            ></textarea>
          </div>

          {/* DATA E HORÁRIO (Lado a lado) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Data <span className="text-lime-400">*</span>
              </label>
              <input
                type="date"
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-lime-400 transition-colors"
                style={{ colorScheme: "dark" }}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Horário <span className="text-lime-400">*</span>
              </label>
              <input
                type="time"
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-300 focus:outline-none focus:border-lime-400 transition-colors"
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
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-lime-400 transition-colors"
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
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-lime-400 transition-colors"
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
                className="w-full bg-[#1a1a1a]/50 border border-gray-800/50 rounded-lg px-4 py-3 text-sm text-lime-400 font-bold focus:outline-none cursor-not-allowed"
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
              className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-lime-400 transition-colors"
            />
          </div>

          {/* BOTÃO DE AÇÃO */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-lime-400 text-black hover:bg-lime-500 transition-colors font-bold text-sm"
            >
              Criar Evento
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
