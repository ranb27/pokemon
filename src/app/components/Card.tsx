import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Pokemon {
  name: string;
  element: string;
  image: string;
}

export default function Card({ pokemon }: { pokemon: Pokemon }) {
  console.log(pokemon);

  return (
    <>
      <div className="card bg-base-100 shadow-xl hover:scale-105 duration-200">
        <figure className="p-4">
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={200} // Set an appropriate width for the image
            height={150} // Set an appropriate height for the image
            className="object-cover"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{pokemon.name.toUpperCase()}</h2>
          <p>{pokemon.element}</p>
          <div className="card-actions">
            <Link
              href={`/details/${pokemon.name}`}
              className="btn btn-warning btn-sm"
            >
              More info
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
