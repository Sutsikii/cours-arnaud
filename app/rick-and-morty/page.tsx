import { Suspense } from 'react';
import Image from 'next/image';
import { CharactersData } from './characters-data';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

interface CharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

function CharacterList({ characters }: { characters: CharactersResponse }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {characters.results.map((character) => (
        <div
          key={character.id}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div className="relative h-64">
            <Image
              src={character.image}
              alt={character.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl text-black font-semibold mb-2">{character.name}</h2>
            <div className="flex gap-2">
              <span className={`px-2 py-1 rounded-full text-sm ${
                character.status === 'Alive' ? 'bg-green-500' : 
                character.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'
              } text-white`}>
                {character.status}
              </span>
              <span className="px-2 py-1 rounded-full text-sm bg-blue-500 text-white">
                {character.species}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RickAndMortyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Personnages de Rick and Morty</h1>
      <Suspense fallback={
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      }>
        <CharactersData>
          {(characters) => <CharacterList characters={characters} />}
        </CharactersData>
      </Suspense>
    </div>
  );
} 