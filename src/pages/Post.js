import React, { useRef } from "react";
import "../index.css";

import {
  Navbar,
  PageDivider,
  Rating,
  ProblemSetTable,
  ResourcesTable,
} from "../components";


import { useParams } from "react-router-dom";

// MARKDOWN IMPORTS
import Toc from "react-toc";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Import the remark-gfm plugin
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { useEffect } from "react";

const PUBLIC_URL = 'https://codewiki-blog.onrender.com';

export const slugify = (text) => {
  return text.toLowerCase().replace(/[^\w]+/g, '-');
};

export const extractHeadings = (markdown) => {
  const regex = /(?:^|\n)(#+) ([^\n]+)/g;
  let match;
  const headings = [];

  while ((match = regex.exec(markdown)) !== null) {
    const level = match[1].length;
    if (level === 1 || level === 2 || level === 3) {
      headings.push({
        text: match[2],
        level: level,
        id: slugify(match[2])
      });
    }
  }

  return headings;
};



function Post({ blogs }) {
  const [readPercentage, setReadPercentage] = useState(0);
  const [showRadialProgress, setShowRadialProgress] = useState(false);

  // Calculate and update read percentage as the user scrolls
  useEffect(() => {
    function handleScroll() {
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const scrolled = window.scrollY;

      const calculatedPercentage =
        (scrolled / (fullHeight - windowHeight)) * 100;
      setReadPercentage(calculatedPercentage);

      // Show the radial-progress div when scrolled to a certain percentage
      if (calculatedPercentage >= 10) {
        setShowRadialProgress(true);
      } else {
        setShowRadialProgress(false);
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Remove scroll event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { slug } = useParams();

  let blog = "";
  if (blogs.data)
    blog = blogs.data.find((blog) => blog.attributes && blog.attributes.slug === slug);

  let headings = []
  if (blog.attributes && blog.attributes.blogContent)
    headings = extractHeadings(blog.attributes.blogContent);



  const markdownRef = useRef(null);
  const headingRefs = useRef([]);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeadingClick = (id) => {
    const element = markdownRef.current.querySelector(`#${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white font-inter">
      {/* NAVBAR */}
      <div className="bg-gradient-to-br from-[#102a4a] to-[#342a84] mb-16 font-poppins">
        <Navbar />
        <PageDivider />
      </div>

      <div className="md:flex pb-16 md:pb-0 gap-10 justify-center">
        {/* CONTENT COMPONENT */}
        <div className="max-w-full md:max-w-[1024px] px-6 md:px-20  md:py-16 space-y-12 text-gray-800 flex-grow">
          {/* RATING */}
          <Rating stars={blog.attributes && blog.attributes.rating} onBlogPost={true} />

          {/* TITLE AND AUTHORS */}
          <div>
            <h1 className="text-gray-800 font-bold text-4xl w-full -mt-5 -mb-3 font-poppins">
              {blog.attributes && blog.attributes.title}
            </h1>

            <h2 className="text-gray-600 font-medium text-lg mt-5 -mb-3 font-quicksand">
              Authors: {blog.attributes && blog.attributes.authors}
            </h2>
          </div>

          {/* PAGE DIVIDER */}
          <div className="divider w-[100%]"></div>

          {/* RECENT ARTICLES - MOBILE */}
          <div className="text-[18px] md:hidden">
            <div className="text-blue-800 font-bold mb-3 text-[16px]">
              {" "}
              Recent articles{" "}
            </div>
            <div className="flex flex-col gap-1">
              {blogs.data.map((blog) => {
                if (blog.attributes && blog.attributes.slug != slug)
                  return (
                    <a
                      className="text-[#565656] hover:text-blue-600 text-[14px]"
                      href={`https://codewiki.tech/#/blog/${blog.attributes.slug}`}
                    >
                      {blog.attributes && blog.attributes.title}
                    </a>
                  );
              })}
            </div>
          </div>

          {/* TABLE OF CONTENTS - MOBILE */}
          <div className="md:hidden text-[18px]">
            <div className="toc-container flex flex-col gap-5">
              <div className="text-blue-800 font-bold text-[16px]">Table of contents</div>
              <Toc
                markdownText={blog.attributes && blog.attributes.blogContent}
                highestHeadingLevel={1}
                lowestHeadingLevel={3}
                className="toc"
              />
            </div>
          </div>

          {/* BLOG CONTENT */}
          <div className="content-container max-w-[1024px] text-gray-700">
            {/* eslint-disable-next-line  */}

            <ReactMarkdown
              children={blog.attributes && blog.attributes.blogContent}
              remarkPlugins={[remarkMath, remarkGfm]}
              rehypePlugins={[rehypeKatex, rehypeRaw]}
              className="markdown text-justify"
              // escapeHtml={true}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      codeTagProps={{
                        style: { fontSize: "15px", lineHeight: "1.4", fontFamily: "Roboto Mono" },
                      }}
                      children={String(children).replace(/\n$/, "")}
                      style={vscDarkPlus} // theme
                      language={match[1]}
                      PreTag="section" // parent tag
                      {...props}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                h1: ({ node, children }) => {
                  const id = slugify(children[0]);
                  return <h1 id={id}>{children}</h1>;
                },
                h2: ({ node, children }) => {
                  const id = slugify(children[0]);
                  return <h2 id={id}>{children}</h2>;
                },
                h3: ({ node, children }) => {
                  const id = slugify(children[0]);
                  return <h2 id={id}>{children}</h2>;
                },
              }}
            />
          </div>

          {(blog.attributes && blog.attributes.resource) ? (
            <ResourcesTable
              header={"Materiale de studiu"}
              resource={blog.attributes.resource}
            />
          ) : ""}
          {(blog.attributes && blog.attributes.problemSet) ? (
            <ProblemSetTable problemSet={blog.attributes && blog.attributes.problemSet} />
          ) : ""}
        </div>

        <div className="toc-navigation">
          <div className="toc-container hidden md:flex md:flex-col gap-3 md:mt-20">
            <div className="text-blue-800 font-bold text-[16px]">Table of contents</div>
            {/* Progress bar */}
            <div
              className={`fixed bottom-0 right-0 p-4 ${showRadialProgress ? "block" : "hidden"
                }`}
              style={{ zIndex: 9999 }}
            >
              <div className="relative h-16 w-16">
                <svg
                  className="absolute top-0 left-0 h-full w-full transform -rotate-90"
                  viewBox="0 0 16 16"
                >
                  <circle
                    className="text-orange-500 stroke-current transition-transform duration-500 ease-in-out"
                    cx="8"
                    cy="8"
                    r="7"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="43"
                    strokeDashoffset={43 - (readPercentage / 100) * 43}
                  ></circle>
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-gray-700 font-bold text-xs">
                  {Math.round(readPercentage)}%
                </span>
              </div>
            </div>

            {/* Table of Contents section */}
            {headings.map((heading, index) => (
              <div
                className="toc"
                key={index}
                onClick={() => scrollToHeading(heading.id)}
                style={{ marginLeft: heading.level === 3 ? '20px' : '0', cursor: 'pointer', color: '#565656' }}
              >
                {heading.text}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div >
  );
}

export default Post;
