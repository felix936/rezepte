import Navbar from "./components/Navbar";
import RecipePanels from "./components/RecipePanels";

function App() {
  return (
    <div>
      <Navbar />{" "}
      <div
        style={{
          justifySelf: "center",
          width: "100%",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <RecipePanels />
      </div>
    </div>
  );
}

export default App;

/*
import React from "react";
import { Box, Image } from "@chakra-ui/react";

const App: React.FC = () => {
  return (
    <>
      <Box
        width="250px"
        height="250px"
        overflow="hidden" // Prevents the image from spilling outside
        position="relative" // Ensures the image is contained
      >
        <Image
          src="https://picsum.photos/200/200" // Replace with your `recipe.image`
          alt="Recipe"
          width="100%"
          height="100%"
          objectFit="cover" // Ensures the image covers the container
          transition="transform 0.3s ease" // Adds smooth hover animation
          _hover={{
            transform: "scale(1.2)", // Scales the image on hover
          }}
        />
      </Box>
    </>
  );
};

export default App; */
