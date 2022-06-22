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
        <h1 className="text-4xl text-center text-gold-400 py-4">
          Nextjs Pokedex
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 p-4">
          {pokemon.results.map((monster, index) => {
            return (
              <Pokemon key={index} pokemon={monster} index={index + offset} />
            );
          })}
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
