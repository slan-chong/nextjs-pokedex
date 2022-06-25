import axios from "axios";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import Image from "next/image";
import { Radar } from "react-chartjs-2";
import Chart from "chart.js/auto";
const Pokemon = ({ pokemon }) => {
  const [pokeState, setPokeState] = useState({
    labels: ["HP", "Attack", "Defense", "Sp. Attack", "Sp. Def", "Speed"],
    datasets: [
      {
        label: pokemon.name,
        borderWidth: 1,
        borderColor: "rgba(10, 40, 95, 1)",
        backgroundColor: "rgba(0, 117, 190, 0.3)",
        pointBackgroundColor: "rgba(54, 162, 235,0.5)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(54, 162, 235,0.5)",
        pointRadius: 2,
        data: pokemon.stats.map((data) => data.base_stat),
      },
    ],
  });
  const RadarOptions = {
    scale: {
      r: {
        max: 160,
        min: 0,
        ticks: {
          stepSize: 40,
          showLabelBackdrop: false,
          backdropColor: "rgba(203, 197, 11, 1)",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
          },
          pointStyle: "rect",
          usePointStyle: true,
        },
      },
    },
    font: { family: "Segoe Ui" },
  };

  return (
    <Layout title={pokemon.name}>
      <div className="mx-8 px-20 flex flex-col justify-center items-center">
        <span className="absolute text-[100px] md:text-[250px] lg:text-[300px] opacity-30 text-white font-semibold">
          {`#${pokemon.index}`}
        </span>
        <Image
          alt={pokemon.name}
          width={400}
          height={400}
          loader={() => pokemon.image}
          unoptimized={true}
          src={pokemon.image}
        />
      </div>
      <div
        className="bg-gray-800
       rounded p-4 m-4 "
      >
        <div className="flex flex-col items-center mb-2">
          <p className="mb-1">
            <span className="font-bold text-gold-500">Height: </span>
            {pokemon.height} m
          </p>
          <p className="mb-1">
            <span className="font-bold text-gold-500">Weight: </span>
            {pokemon.weight / 10} kg
          </p>
        </div>
        <ul className="flex justify-center">
          {pokemon.types.map((type) => (
            <li
              key={type.slot}
              className="mr-2 px-2 py-1 bg-gray-600 rounded  capitalize"
            >
              {type.type.name}
            </li>
          ))}
        </ul>
        <div className="lg:w-1/2 lg:left-1/4 lg:relative">
          <Radar data={pokeState} options={RadarOptions} />
        </div>
      </div>
    </Layout>
  );
};

export default Pokemon;

export const getServerSideProps = async (context) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${context.query.name}`
    );
    const pokemon = response.data;
    pokemon.index = ("000" + pokemon.id).slice(-3);
    pokemon.name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    pokemon.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemon.index}.png`;
    return {
      props: {
        pokemon,
      },
    };
  } catch (err) {
    console.error(err);
  }
};
