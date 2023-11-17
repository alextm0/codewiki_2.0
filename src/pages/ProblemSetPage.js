import React from "react";

import { Navbar, PageDivider } from "../components";
import { useParams } from "react-router-dom";

import { ProblemSetTable } from "../components";

function ProblemSetPage( {data} ) {
  const { slug } = useParams();
  // console.log("problem", data && data.data);

  if(!data || !data.data) return;

  let problemSet;
  if(data.data)
    for(let i = 0; i < data.data.length; i++)
      if(data.data[i].attributes.topics)
        for(let j = 0; j < data.data[i].attributes.topics.length; j++)
          if(data.data[i].attributes.topics[j].slug === slug)
            problemSet = data.data[i].attributes.topics[j]

  return (
    <div className="bg-white font-poppins">
      <div className="bg-gradient-to-br from-[#102a4a] to-[#342a84] mb-16">
        <Navbar />
        <PageDivider />
      </div>

      <div className="flex justify-center">
        <div className="pb-16 pt-12 gap-10 w-[1024px]">
          <ProblemSetTable
            problemSet={problemSet && problemSet.problemSet}
          />
        </div>
      </div>
    </div>
  );
}

export default ProblemSetPage;
