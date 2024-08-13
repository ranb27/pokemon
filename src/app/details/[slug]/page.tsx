"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface Pokemon {
  name: string;
  element: string;
  image: string;
  base_experience: number;
  height: number;
  weight: number;
  ability: string;
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

function page({ params }: { params: { slug: string } }) {
  console.log("params", params);

  //! State
  // Loading
  const [loading, setLoading] = useState<boolean>(false);

  // Data
  const [pokemonDetails, setPokemonDetails] = useState({
    name: "",
    element: "",
    image: "",
    base_experience: 0,
    height: 0,
    weight: 0,
    ability: "",
    hp: 0,
    attack: 0,
    defense: 0,
    special_attack: 0,
    special_defense: 0,
    speed: 0,
  });
  //! Fetch
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${params.slug}`)
      .then((res) => {
        console.log("res", res);
        const data = res.data;
        const pokemonData: Pokemon = {
          name: data.name,
          element: data.types[0].type.name,
          image: data.sprites.front_default,
          base_experience: data.base_experience,
          height: data.height,
          weight: data.weight,
          ability: data.abilities[0].ability.name,
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          special_attack: data.stats[3].base_stat,
          special_defense: data.stats[4].base_stat,
          speed: data.stats[5].base_stat,
        };
        setPokemonDetails(pokemonData);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  //! Function

  return (
    <>
      <Link href="/" className="btn btn-sm btn-neutral my-4">
        Back to Home
      </Link>

      {loading ? (
        <div className="flex justify-center h-full my-80">
          <span className="loading loading-spinner text-warning loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <h1 className="text-3xl font-bold animate-ltr">
            Details:{" "}
            <span className="text-error">{params.slug.toUpperCase()}</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade">
            <img
              src={pokemonDetails.image}
              alt={pokemonDetails.name}
              className="object-cover w-1/2 my-auto mx-auto animate-floating"
            />

            <div className="my-auto">
              <h2 className="font-bold">
                Name:{" "}
                <span className="text-warning">
                  {pokemonDetails.name.toUpperCase()}
                </span>
              </h2>
              <p className="font-bold">
                Element:{" "}
                <span className="text-warning">{pokemonDetails.element}</span>
              </p>
              <div className="divider divider-warning">Physical</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-base-100 p-4 rounded-xl font-bold">
                <p>
                  Ability:{" "}
                  <span className="text-warning">{pokemonDetails.ability}</span>
                </p>
                <p>
                  Base Experience:{" "}
                  <span className="text-warning">
                    {pokemonDetails.base_experience}
                  </span>
                </p>
                <p>
                  Height:{" "}
                  <span className="text-warning">{pokemonDetails.height}</span>
                </p>
                <p>
                  Weight:{" "}
                  <span className="text-warning">{pokemonDetails.weight}</span>
                </p>
              </div>
              <div className="divider divider-warning">Stats</div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 bg-base-100 p-4 rounded-xl font-bold">
                <p>
                  HP: <span className="text-warning">{pokemonDetails.hp}</span>
                </p>
                <p>
                  Attack:{" "}
                  <span className="text-warning">{pokemonDetails.attack}</span>
                </p>
                <p>
                  Defense:{" "}
                  <span className="text-warning">{pokemonDetails.defense}</span>
                </p>
                <p>
                  Special Attack:{" "}
                  <span className="text-warning">
                    {pokemonDetails.special_attack}
                  </span>
                </p>
                <p>
                  Special Defense:{" "}
                  <span className="text-warning">
                    {pokemonDetails.special_defense}
                  </span>
                </p>
                <p>
                  Speed:{" "}
                  <span className="text-warning">{pokemonDetails.speed}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default page;
