import Image from 'next/image';

interface Pokemon {
  name: string;
  url: string;
  id: string;
}

interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

async function getPokemons(): Promise<PokemonResponse> {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20', {
    next: { revalidate: 3600 } 
  });
  
  if (!res.ok) {
    throw new Error('Erreur lors du chargement des Pokémon');
  }

  return res.json();
}

export default async function PokemonPage() {
  const pokemons = await getPokemons();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Liste des Pokémon</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pokemons.results.map((pokemon) => {
          const id = pokemon.url.split('/').slice(-2)[0];
          return (
            <div
              key={pokemon.name}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow p-4"
            >
              <div className="relative h-48 w-48 mx-auto">
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={pokemon.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center mt-4">
                <h2 className="text-xl font-semibold capitalize">{pokemon.name}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 