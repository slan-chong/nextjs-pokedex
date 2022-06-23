import Layout from "../components/Layout";
import Pokemon from "../components/Pokemon";
import axios from "axios";
import { useState } from "react";
export default function Home({ data }) {
  const [pokemon, setPokemon] = useState(data);
  const [offset, setOffset] = useState(0);

  const fetchPokemon = async (url, next) => {
    const response = await axios.get(url);
    const nextPokemon = response.data;

    setOffset(next ? offset + 20 : offset - 20);
    setPokemon(nextPokemon);
  };

  return (
    <div>
      <Layout title="Pokedex">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 p-4">
          {pokemon.results.map((monster, index) => {
            return (
              <Pokemon key={index} pokemon={monster} index={index + offset} />
            );
          })}
        </div>
        <div className="flex flex-col">
          <div className="flex justify-center my-2">
            <button
              disabled={!pokemon.previous}
              className="disabled:bg-gray-300 disabled:cursor-default cursor-pointer p-2 mx-2 bg-red-600 rounded-l-2xl"
              onClick={() => fetchPokemon(pokemon.previous, false)}
            >
              ◄
            </button>
            <button
              disabled={!pokemon.next}
              className="disabled:bg-gray-300 disabled:cursor-default cursor-pointer p-2 mx-2 bg-gray-150 text-gray-900 rounded-r-2xl"
              onClick={() => fetchPokemon(pokemon.next, true)}
            >
              ►
            </button>
          </div>
          <div className="flex justify-center">第{(offset + 20) / 20}頁</div>
        </div>
      </Layout>
    </div>
  );
}

export const getStaticProps = async () => {
  const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon");
  return {
    props: {
      data,
    },
  };
};
