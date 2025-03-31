import Image from 'next/image';

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1>NextJS template</h1>
      <div className="mt-8">
        <Image
          src="/otisma.png"
          alt="Carte Otisma"
          width={400}
          height={400}
          className="rounded-lg shadow-lg"
          priority
        />
      </div>
    </div>
  );
}
