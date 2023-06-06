import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import manyDogs from "../images/manyDogs.webp";
// import DogQuiz from "../components/DogQuiz/quiz"

const Home = ({ handlePageChange }) => {
  const [currentPath, setCurrentPath] = useState("");
  // runs when a component renderes in the browser
  useEffect(() => {
    console.log(currentPath);
    setCurrentPath(window.location.pathname);
  }, []);

  return (
    <main>
      <p className="homeTitle h1 mt-5 fw-bolder text-center">
        What We Are All About!
      </p>
      <p className="homeText mt-1 fs-4 fw-bold text-center">
        We can help you find the right dog for you! Simply take our online quiz!
        Do you have a dog in-mind already? Simply use our search box to find-out
        everything about that dog!
      </p>
      <p className="homeTitle h1 mt-5 fw-bolder text-center">
        Member Benefits!
      </p>
      <p className="homeText mt-1 mb-5 fs-4 fw-bold text-center">
        If you are a member, you can save your favorites, search for a nearby
        shelter, and donate!
      </p>
      <div className="img-fluid col mt-7">
        <img
          src={manyDogs}
          className="manyDogs"
          alt="Many dogs all around a Ani."
        />
        {/* <DogSearch/> */}
      </div>
    </main>
  );
};

export default Home;
