export default function ParticipantesPage() {
  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#080808] px-6 py-14 sm:px-10 lg:px-16">
      <section className="mx-auto max-w-[1540px]">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h1 className="font-anton text-4xl uppercase leading-none tracking-wide text-white sm:text-5xl">
              Gestão de Participantes
            </h1>

            <p className="mt-2 text-base text-zinc-500">
              7 participantes cadastrados
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-lime-400 px-6 py-4 text-base font-bold text-black transition-colors hover:bg-lime-300"
          >
            <span className="text-2xl font-normal leading-none">+</span>
            Novo Participante
          </button>
        </div>
      </section>
    </main>
  );
}
