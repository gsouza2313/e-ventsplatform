"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faMapMarkerAlt,
  faUsers,
  faUser,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGoogle,
  faGithub,
  faReact,
  faNodeJs,
  faAws,
  faFigma,
  faSpotify,
  faMicrosoft,
} from "@fortawesome/free-brands-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { MdSwipe } from "react-icons/md";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { IconByron } from "./components/icon/IconByron";

gsap.registerPlugin(ScrollTrigger);

// --- DADOS MOCKADOS ---
const parceiros = [
  { id: 1, icon: faGoogle },
  { id: 2, icon: faGithub },
  { id: 3, icon: faReact },
  { id: 4, icon: faNodeJs },
  { id: 6, icon: IconByron },
  { id: 6, icon: faFigma },
  { id: 7, icon: faSpotify },
  { id: 8, icon: faMicrosoft },
  { id: 9, icon: faAws },
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
  const container = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollPartners = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const cardWidth = 200; // largura do card + gap
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

    carouselRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  useGSAP(
    () => {
      // 1. animacao hero
      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          ".hero-desc",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.6"
        );

      // 2. animacao empresas parceiras
      gsap.fromTo(
        ".parceiro-tag",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".parceiros-section",
            start: "top 85%",
          },
        }
      );

      // 3. animacao cards
      const eventCards = gsap.utils.toArray(".evento-card");
      eventCards.forEach((card: any) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const carousel = carouselRef.current;
      if (!carousel) return;

      // Busca os cards apenas dentro do carrossel
      const items = gsap.utils.toArray<HTMLElement>(".parceiro-card", carousel);
      if (items.length === 0) return;

      const updateActiveCard = () => {
        const carouselRect = carousel.getBoundingClientRect();
        const centerX = carouselRect.left + carouselRect.width / 2;

        items.forEach((item) => {
          const rect = item.getBoundingClientRect();
          const itemCenterX = rect.left + rect.width / 2;
          const distance = Math.abs(centerX - itemCenterX);

          if (distance < 80) {
            item.classList.add("active-glow");
          } else {
            item.classList.remove("active-glow");
          }
        });
      };

      const centerCarousel = () => {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        carousel.scrollLeft = maxScroll / 2;
        updateActiveCard();
      };

      // Espera 100ms para garantir que o React renderizou os tamanhos reais antes de centralizar
      setTimeout(centerCarousel, 100);

      carousel.addEventListener("scroll", updateActiveCard, { passive: true });
      window.addEventListener("resize", centerCarousel);

      return () => {
        carousel.removeEventListener("scroll", updateActiveCard);
        window.removeEventListener("resize", centerCarousel);
      };
    },

    { scope: container }
  );
  return (
    <div ref={container} className="min-h-screen bg-[#0a0a0a] text-white">
      <main className="max-w-7xl mx-auto px-6 py-12 md:px-12"></main>
      {/* HERO  */}
      <section className="mb-20 pt-8d px-5 md:px-48">
        <div className="hero-badge inline-flex items-center gap-2 px-5 py-2 rounded-full border border-lime-900/50 bg-[#141a0b] text-lime-400 text-xs font-semibold tracking-wide mb-2">
          <span className="w-2 h-2 rounded-full bg-lime-400"></span>
          Plataforma de Eventos
        </div>

        <h1 className="hero-title font-anton text-7xl md:text-8xl lg:text-9xl font-black tracking-wider uppercase leading-none mb-6">
          Aprenda com
          <br />
          <span className="text-lime-400 [text-shadow:_0_0_10px_rgba(163,230,53,0.2),_0_0_25px_rgba(163,230,53,0.2),_0_0_40px_rgba(163,230,53,0.2)] drop-shadow-[0_0_15px_rgba(163,230,53,0.2)]">
            Os Melhores
          </span>
          <br />
          Cursos
        </h1>

        <p className="hero-desc text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
          Workshops, cursos e palestras para profissionais de tecnologia.
          <br />
          Expanda seus conhecimentos e conecte-se com a comunidade.
        </p>
      </section>
      {/* EMPRESAS PARCEIRAS */}
      <section className="parceiros-section border-t border-gray-800/60 pt-10 mb-24 px-8">
        <p className="text-xs font-bold text-gray-500 tracking-[0.2em] uppercase mb-6">
          Empresas Parceiras
        </p>
        <div className="relative w-full">
          {/* seta Esquerda */}
          <button
            onClick={() => scrollPartners("left")}
            aria-label="Rolar para esquerda"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 border border-lime-400/40 text-lime-400/80 backdrop-blur-md flex items-center justify-center hover:bg-lime-400 hover:text-black hover:scale-110 hover:border-lime-300 hover:shadow-[0_0_15px_rgba(163,230,53,0.5)] transition-all duration-300 active:scale-95"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
          </button>

          {/* seta Direita */}
          <button
            onClick={() => scrollPartners("right")}
            aria-label="Rolar para direita"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 border border-lime-400/40 text-lime-400/80 backdrop-blur-md flex items-center justify-center hover:bg-lime-400 hover:text-black hover:scale-110 hover:border-lime-300 hover:shadow-[0_0_15px_rgba(163,230,53,0.5)] transition-all duration-300 active:scale-95"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
          </button>

          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent z-10 pointer-events-none" />

          <div
            ref={carouselRef}
            className="parceiros-scroll flex items-center gap-6 overflow-x-auto snap-x snap-mandatory py-14 px-[35vw] md:px-[42vw] hide-scrollbar scroll-smooth"
          >
            {parceiros.map((parceiro) => (
              <div
                key={parceiro.id}
                className="parceiro-card snap-center shrink-0 w-44 h-24 rounded-2xl bg-[#111111] border border-gray-800 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 transform select-none"
              >
                {typeof parceiro.icon === "function" ? (
                  <parceiro.icon className="w-8 h-8 transition-colors duration-300 icon-glow" />
                ) : (
                  <FontAwesomeIcon
                    icon={parceiro.icon as any}
                    className="text-2xl transition-colors duration-300 icon-glow"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
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

        <div className="px-8 evento-card">
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
        <div className="px-8 evento-card">
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
