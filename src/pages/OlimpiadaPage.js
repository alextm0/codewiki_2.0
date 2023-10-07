import React from "react";

import { Navbar, PageDivider, Olimpiada } from "../components";

function OlimpiadaPage( {data} ) {
  return (
    <div className="bg-white font-poppins">
      <div className="bg-gradient-to-br from-[#102a4a] to-[#342a84] mb-16">
        <Navbar />
        <PageDivider />
      </div>
      <Olimpiada data={data ? data : ""} />
    </div>
  );
}

export default OlimpiadaPage;
