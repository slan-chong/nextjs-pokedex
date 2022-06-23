import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Pokemon = ({ pokemon, index }) => {
  const [hover, setHover] = useState(false);
  const pokeIndex = ("000" + (index + 1)).slice(-3);
  const src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokeIndex}.png`;
  return (
    <Link href={`/pokemon/${pokemon.name}`}>
      <a>
        <div
          className="bg-gray-800 hover:bg-gray-600 rounded-xl flex flex-col justify-center items-center relative "
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <Image
            loader={() => src}
            unoptimized={true}
            src={src}
            width={150}
            height={150}
            alt={pokemon.name}
          ></Image>
          <div
            className={`opacity-50 absolute text-3xl text-white top-0 right-3 font-semibold ${
              hover && "opacity-100"
            }`}
          >
            #{pokeIndex}
          </div>
          <div className={`text-gold-400 m-2 ${hover && "text-gold-300"}`}>
            {pokemon.name}
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Pokemon;
