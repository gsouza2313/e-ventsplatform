import { todosEventos as todosOsEventos } from "./dataEventos";
import { participantes } from "./dataParticipantes";

export function obterEventosAtualizados() {
    // Calculo de Vagas Disponíveis e Nome do Professor/Palestrante
  const eventosCalculados = todosOsEventos.map((evento) => {
    const inscritosNoEvento = participantes.filter((participante) =>
      participante.eventosInscritosIds.includes(evento.id)
    );

    const totalParticipantes = inscritosNoEvento.filter(
      (participante) => participante.funcao === "Participante"
    ).length;

    const responsavel = inscritosNoEvento.find(
      (participante) =>
        participante.funcao === "Professor" || participante.funcao === "Palestrante"
    );

    return {
      ...evento,
      vagasDisponiveis: evento.vagasTotais - totalParticipantes,
      nomeProfessor: responsavel ? responsavel.nome : "não cadastrado",
    };
  });

  // Separação de eventos futuros e passados
  const proximos: any[] = [];
  const anteriores: any[] = [];

  const dataDeHoje = new Date();
  dataDeHoje.setHours(0, 0, 0, 0);

  eventosCalculados.forEach((evento) => {
    const [dia, mes, ano] = evento.data.split("/");
    
    const dataDoEvento = new Date(Number(ano), Number(mes) - 1, Number(dia));

    if (dataDoEvento >= dataDeHoje) {
      proximos.push(evento);
    } else {
      anteriores.push(evento);
    }
  });

  return {
    proximos,
    anteriores,
  };
}