"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faMapMarkerAlt,
  faUsers,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { MdSwipe } from "react-icons/md";

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

  {
    id: 8,
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
      {/* PRÓXIMOS EVENTOS */}
      <section className="mb-24">
        <div className="mb-8 px-8 flex justify-between items-end">
          <div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              Próximos Eventos
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {proximosEventos.length} eventos programados
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-black bg-lime-400 border border-lime-500 px-3 py-1.5 rounded-full">
            <MdSwipe className="w-5 h-5 text-black animate-pulse" />
            <span className="">Arraste para navegar</span>
          </div>
        </div>

        <div className="px-8">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.1} // mostra 1 card e um pedaço do próximo no mobile
            grabCursor={true}
            breakpoints={{
              // mobile first
              640: {
                slidesPerView: 2.1,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="pb-8"
          >
            {proximosEventos.map((evento) => (
              <SwiperSlide key={evento.id} className="h-auto">
                <article className="bg-[#111111] border border-gray-800/50 rounded-2xl overflow-hidden flex flex-col hover:border-gray-700 transition-colors h-full">
                  <div className="h-40 w-full relative bg-gray-900">
                    <Image
                      src={evento.imagem}
                      alt={evento.titulo}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold leading-tight mb-3">
                      {evento.titulo}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                      <div className="flex items-center gap-1.5">
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="text-lime-500 w-3.5 h-3.5"
                        />{" "}
                        {evento.data}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FontAwesomeIcon
                          icon={faClock}
                          className="text-lime-500 w-3.5 h-3.5"
                        />{" "}
                        {evento.hora}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="w-3.5 h-3.5"
                      />{" "}
                      {evento.local}
                    </div>

                    <p className="text-xs text-gray-400 line-clamp-3 mb-6 flex-grow leading-relaxed">
                      {evento.descricao}
                    </p>

                    <div className="flex justify-between items-center text-xs mt-auto pt-4 border-t border-gray-800/50">
                      <div className="flex items-center gap-1.5 text-lime-400 font-bold">
                        <FontAwesomeIcon
                          icon={faUsers}
                          className="w-3.5 h-3.5"
                        />{" "}
                        {evento.vagas} vagas
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="w-3.5 h-3.5"
                        />{" "}
                        {evento.autor}
                      </div>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* EVENTOS ANTERIORES */}
      <section className="mb-12">
        <div className="mb-8 px-8 flex justify-between items-end">
          <div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              Eventos Anteriores
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {eventosAnteriores.length} eventos realizados
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-black bg-lime-400 border border-lime-500 px-3 py-1.5 rounded-full">
            <MdSwipe className="w-5 h-5 text-black animate-pulse" />
            <span className="">Arraste para navegar</span>
          </div>
        </div>
        <div className="px-8">
          <Swiper
            spaceBetween={20}
            slidesPerView={1.1} // mostra 1 card e um pedaço do próximo no mobile
            grabCursor={true}
            breakpoints={{
              // mobile first
              640: {
                slidesPerView: 2.1,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="pb-8"
          >
            {eventosAnteriores.map((evento) => (
              <SwiperSlide key={evento.id} className="h-auto">
                <article className="bg-[#111111] border border-gray-800/50 rounded-2xl overflow-hidden flex flex-col hover:border-gray-700 transition-colors h-full">
                  <div className="absolute top-3 right-3 z-10 bg-[dark-gray]/70 backdrop-blur-md border border-gray-700 text-gray-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    Encerrado
                  </div>
                  <div className="h-40 w-full relative bg-gray-900">
                    <Image
                      src={evento.imagem}
                      alt={evento.titulo}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold leading-tight mb-3">
                      {evento.titulo}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                      <div className="flex items-center gap-1.5">
                        <FontAwesomeIcon
                          icon={faCalendar}
                          className="text-lime-500 w-3.5 h-3.5"
                        />{" "}
                        {evento.data}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FontAwesomeIcon
                          icon={faClock}
                          className="text-lime-500 w-3.5 h-3.5"
                        />{" "}
                        {evento.hora}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="w-3.5 h-3.5"
                      />{" "}
                      {evento.local}
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-3 mb-6 flex-grow leading-relaxed">
                      {evento.descricao}
                    </p>
                    <div className="flex justify-between items-center text-xs mt-auto pt-4 border-t border-gray-800/50">
                      <div className="flex items-center gap-1.5 text-lime-400 font-bold">
                        <FontAwesomeIcon
                          icon={faUsers}
                          className="w-3.5 h-3.5"
                        />{" "}
                        {evento.vagas} vagas
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="w-3.5 h-3.5"
                        />{" "}
                        {evento.autor}
                      </div>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}
