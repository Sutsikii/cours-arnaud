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

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function getCharacters(): Promise<CharactersResponse> {
  await sleep(3); 

  const res = await fetch('https://rickandmortyapi.com/api/character');
  
  if (!res.ok) {
    throw new Error('Erreur lors du chargement des personnages');
  }

  return res.json();
}

export async function CharactersData({ children }: { children: (characters: CharactersResponse) => React.ReactNode }) {
  const characters = await getCharacters();
  return children(characters);
} 