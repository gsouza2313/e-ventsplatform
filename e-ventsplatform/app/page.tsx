import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faMapMarkerAlt,
  faUsers,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// --- DADOS MOCKADOS ---
const parceiros = [
  "TechCorp Brasil",
  "InovaSystems",
  "DevHub Co.",
  "StartupX",
  "CodeLab",
  "DataSync",
  "NeoCon",
  "AlphaLabs",
];

const proximosEventos = [
  {
    id: 1,
    titulo: "Workshop de React Avançado",
    data: "25/08/2026",
    hora: "14:00",
    local: "Av. Paulista, 1000 — São Paulo, SP",
    descricao:
      "Técnicas avançadas de React: hooks customizados, contexto, performance e padrões arquiteturais modernos para aplicações de grande escala.",
    vagas: 27,
    autor: "Ana Costa",
    imagem:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    titulo: "Curso de UX Design",
    data: "05/09/2026",
    hora: "09:00",
    local: "Rua da Consolação, 500 — São Paulo, SP",
    descricao:
      "Do wireframe ao protótipo de alta fidelidade: metodologias de design centrado no usuário, sistemas de design e Figma avançado.",
    vagas: 23,
    autor: "Carlos Silva",
    imagem:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    titulo: "IA no Mercado de Trabalho",
    data: "15/09/2026",
    hora: "19:00",
    local: "Teatro Tech — Online/Presencial",
    descricao:
      "Palestra sobre o impacto da inteligência artificial nas profissões, tendências emergentes e como se preparar para o futuro.",
    vagas: 77,
    autor: "Dr. Rafael Mendes",
    imagem:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    titulo: "Python para Análise de Dados",
    data: "01/10/2026",
    hora: "10:00",
    local: "Campus Universitário — Bloco C",
    descricao:
      "Python com pandas, numpy, visualização de dados e fundamentos de Machine Learning aplicados a casos reais.",
    vagas: 18,
    autor: "Lucas Pires",
    imagem:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=600&auto=format&fit=crop",
  },
];

const eventosAnteriores = [
  {
    id: 5,
    titulo: "Introdução ao DevOps",
    data: "10/07/2026",
    hora: "14:00",
    local: "Av. Brig. Faria Lima, 200 — São Paulo, SP",
    descricao:
      "Fundamentos de CI/CD, containers Docker, pipelines de automação e cultura DevOps nas organizações modernas.",
    vagas: 30,
    autor: "Marcos Ribeiro",
    imagem:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 6,
    titulo: "Workshop de Figma",
    data: "22/07/2026",
    hora: "09:00",
    local: "Rua Oscar Freire, 300 — São Paulo, SP",
    descricao:
      "Protótipos profissionais, sistemas de design e handoffs eficientes para desenvolvimento com o Figma.",
    vagas: 20,
    autor: "Juliana Santos",
    imagem:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 7,
    titulo: "Git e GitHub na Prática",
    data: "05/08/2026",
    hora: "16:00",
    local: "Hub de Inovação Tech — Sala 3",
    descricao:
      "Controle de versão avançado, branches, pull requests e fluxos de trabalho colaborativos em equipes de tecnologia.",
    vagas: 40,
    autor: "Carla Silveira",
    imagem:
      "https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?q=80&w=600&auto=format&fit=crop",
  },
];

// --- PÁGINA PRINCIPAL ---
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <main className="max-w-7xl mx-auto px-6 py-12 md:px-12"></main>
      {/* HERO  */}
      <section className="mb-20 pt-8d px-50">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-lime-900/50 bg-[#141a0b] text-lime-400 text-xs font-semibold tracking-wide mb-2">
          <span className="w-2 h-2 rounded-full bg-lime-400"></span>
          Plataforma de Eventos
        </div>

        <h1 className="font-anton text-5xl md:text-8xl font-black tracking-wider uppercase leading-none mb-6">
          Aprenda com
          <br />
          <span className="text-lime-400">Os Melhores</span>
          <br />
          Cursos
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
          Workshops, cursos e palestras para profissionais de tecnologia.
          <br />
          Expanda seus conhecimentos e conecte-se com a comunidade.
        </p>
      </section>
    </div>
  );
}
