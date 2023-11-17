import React from "react";
import Rating from "./Rating";
import Category from "./Category";

function Olimpiada({ data }) {
  let categoryArray = data ? data.data : [];

  let catgArray = categoryArray?.map((category) => (
    <Category
      key={category.id} // Assuming each category has a unique id
      category={category.attributes.category}
      categoryName={category.attributes.categoryName}
      categoryDescription={category.attributes.categoryDescription}
      topics={category.attributes.topics}
    />
  ));

  return (
    <div className="max-w-[1024px] mx-auto">
      <div className="max-w-[1024px] mx-auto">
        {catgArray}
      </div>
    </div>
  );
}

export default Olimpiada;