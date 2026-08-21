import { todosEventos as todosOsEventos } from "../lib/dataEventos";
import { participantes } from "../lib/dataParticipantes";

// Filtro de eventos futuros e passados
export function isEventoEncerrado(dataBR: string): boolean {
  const [dia, mes, ano] = dataBR.split("/");
  const dataDoEvento = new Date(Number(ano), Number(mes) - 1, Number(dia));
 
  const dataDeHoje = new Date();
  dataDeHoje.setHours(0, 0, 0, 0);
 
  return dataDoEvento < dataDeHoje;
}

// Função para obter participantes inscritos em um evento específico
function inscritosNoEvento(eventoId: number) {
  return participantes.filter((participante) =>
    participante.eventosInscritosIds.includes(eventoId)
  );
}

// Função para obter vagas disponíveis
export function obterVagasDisponiveis(eventoId: number): number {
  const inscritos = inscritosNoEvento(eventoId);
  const totalParticipantes = inscritos.filter(
      (participante) => participante.funcao === "Participante"
    ).length;
    
  return todosOsEventos.find((evento) => evento.id === eventoId)?.vagasTotais! - totalParticipantes;
}

// Função para obter nome do professor 
export function obterNomeProfessor(eventoId: number): string {
  const inscritos = inscritosNoEvento(eventoId);
  const responsavel = inscritos.find(
    (participante) =>
      participante.funcao === "Professor" ||
      participante.funcao === "Palestrante"
  );

  return responsavel ? responsavel.nome : "não cadastrado";
}

export function obterEventosAtualizados() {
  // Calculo de Vagas Disponíveis e Nome do Professor/Palestrante
  const eventosCalculados = todosOsEventos.map((evento) => {
    const vagasDisponiveis = obterVagasDisponiveis(evento.id);
    const responsavel = obterNomeProfessor(evento.id);
 
    return {
      ...evento,
      vagasDisponiveis: vagasDisponiveis,
      nomeProfessor: responsavel,
    };
  });
 
  // Separação de eventos futuros e passados
  const proximos: any[] = [];
  const anteriores: any[] = [];
 
  eventosCalculados.forEach((evento) => {
    if (isEventoEncerrado(evento.data)) {
      anteriores.push(evento);
    } else {
      proximos.push(evento);
    }
  });
 
  return {
    proximos,
    anteriores,
  };
}