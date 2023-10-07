import React from "react";

import Rating from "./Rating";
import Category from "./Category";

function Olimpiada() {
  return (
    <div className="max-w-[1024px] mx-auto">
      <div className="max-w-[1024px] mx-auto">
        <Category
          category={"olimpiada"}

          categoryName={"Algoritmi elementari"}
          categoryDescription={"Clasa IX"}
          topics={[
            {
              name: "Divizibilitate",
              slug: "divizibilitate",
              description: "",
              stars: 4,
            },
            {
              name: "Ridicare la putere in timp logaritmic",
              slug: "ridicare-la-putere",
              description: "",
              stars: 4,
            },
            {
              name: "Siruri recurente. Sirul lui Fibonacci",
              slug: "siruri",
              description: "",
              stars: 2,
            },
            {
              name: "Ciurul lui Eratostene",
              slug: "ciur",
              description: "",
              stars: 4,
            },
            {
              name: "Baze de numeratie. Operatii pe biti",
              slug: "ciur",
              description: "",
              stars: 3,
            },
          ]}
        />

        <Category
          category={"olimpiada"}
          categoryName={"Vectori"}
          categoryDescription={"Clasa IX"}
          topics={[
            {
              name: "Operatii elementare",
              slug: "operatii-vectori",
              description: "",
              stars: 3,
            },
            {
              name: "Interclasarea vectorilor",
              slug: "interclasare",
              description: "",
              stars: 3,
            },
            {
              name: "Vectori caracteristici, frecventa",
              slug: "vectori-caracteristici-frecventa",
              description: "",
              stars: 4,
            },
            {
              name: "Determinarea elementului majoritar",
              slug: "element-majoritar",
              description: "",
              stars: 2,
            },
            {
              name: "Sume partiale. Smenul lui mars",
              slug: "sume-partiale",
              description: "",
              stars: 4,
            },
            {
              name: "Probleme cu secvente. Tehnica two-pointers",
              slug: "two-pointers",
              description: "",
              stars: 4,
            },
          ]}
        />

        <Category
          category={"olimpiada"}
          categoryName={"Matrici"}
          categoryDescription={"Clasa IX"}
          topics={[
            {
              name: "Operatii elementare cu linii si coloane",
              slug: "operatii-matrice",
              description: "",
              stars: 4,
            },
            {
              name: "Sume partiale pe 2D",
              slug: "mars",
              description: "",
              stars: 4,
            },
            {
              name: "Tehnica two-pointers pe 2D",
              slug: "mars",
              description: "",
              stars: 4,
            }
          ]}
        />

        <Category
          category={"olimpiada"}
          categoryName={"Cautare binara"}
          categoryDescription={"Clasa IX"}
          topics={[
            {
              name: "Cautare binara intr-un set de numere",
              slug: "cautare-binara-set",
              description: "",
              stars: 4,
            },
            {
              name: "Cautare binara pe raspuns",
              slug: "cautare-binara-raspuns",
              description: "",
              stars: 4,
            }
          ]}
        />

        <Category
          category={"olimpiada"}
          categoryName={"Probleme adhoc"}
          categoryDescription={"Clasa IX"}
          topics={[
            {
              name: "Set de sfaturi pentru abordarea problemelor adhoc",
              slug: "sfaturi-rezolvare-probleme-adhoc",
              description: "",
              stars: 4,
            },
            {
              name: "Set probleme adhoc",
              slug: "set-probleme-adhoc",
              description: "",
              stars: 4,
            }
          ]}
        />
      </div>
    </div>
  );
}

export default Olimpiada;
