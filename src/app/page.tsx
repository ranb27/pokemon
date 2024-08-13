"use client";

import Image from "next/image";
import Card from "@/app/components/Card";
import Select from "@/app/components/Select";
import axios from "axios";
import { useEffect, useState } from "react";

interface Pokemon {
  name: string;
  element: string;
  image: string;
}

export default function Home() {
  //! State
  // Loading
  const [loading, setLoading] = useState<boolean>(false);
  // Select
  const [selectedPokemon, setSelectedPokemon] = useState<string>("");
  // Options
  const [pokemonOptions, setPokemonOptions] = useState<string[]>([]); // mapping name
  // Data
  const [pokemon, setPokemon] = useState([
    {
      name: "",
      element: "",
      image: "",
    },
  ]);

  //! Fetch
  // Options
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/`)
      .then((res) => {
        const data = res.data.results;
        const names = data.map((item: { name: string }) => item.name);
        setPokemonOptions(names);
      })
      .catch((err) => console.log(err));
  }, []);

  // Data
  useEffect(() => {
    setLoading(true);
    const url = selectedPokemon
      ? `https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`
      : `https://pokeapi.co/api/v2/pokemon?limit=100`; // Fetch the first 100 Pokémon if no specific one is selected

    axios
      .get(url)
      .then(async (res) => {
        if (selectedPokemon) {
          // If a specific Pokémon is selected
          const data = res.data;
          const pokemonData: Pokemon = {
            name: data.name,
            element: data.types[0].type.name,
            image: data.sprites.front_default,
          };
          setPokemon([pokemonData]);
        } else {
          // If no specific Pokémon is selected, get a list
          const allPokemon = await Promise.all(
            res.data.results.map(
              async (poke: { name: string; url: string }) => {
                const pokeDetails = await axios.get(poke.url);
                const data = pokeDetails.data;
                return {
                  name: data.name,
                  element: data.types[0].type.name,
                  image: data.sprites.front_default,
                };
              }
            )
          );
          setPokemon(allPokemon);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [selectedPokemon]);

  //! Function

  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="grid grid-cols-1 md:flex justify-between">
        <h1 className="font-bold my-auto text-xl animate-ltr">
          Choose your <span className="text-error">Pokemon</span> !
        </h1>
        <div className="flex gap-2 animate-rtl">
          <Select
            options={pokemonOptions}
            value={selectedPokemon}
            setValue={setSelectedPokemon}
          />
          <button
            onClick={() => {
              setSelectedPokemon("");
            }}
            className="btn btn-error"
          >
            Clear
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center h-full my-40">
          <span className="loading loading-spinner text-warning loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 animate-fade">
          {pokemon.map((item, index) => (
            <Card key={index} pokemon={item} />
          ))}
        </div>
      )}
    </div>
  );
}
