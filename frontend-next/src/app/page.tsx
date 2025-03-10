import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-Red grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-bg-primary">
        <div className="bg-brand-red text-white p-4">Hello Tailwind</div>
        <div className="bg-dim-yellow text-dark p-4">Custom Colors</div>
        <div className="bg-vim-dark text-vim-milk p-4">Neovim Theme</div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
