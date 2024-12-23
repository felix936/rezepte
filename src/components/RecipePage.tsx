import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Image, Box, Heading, Tabs, Button } from "@chakra-ui/react";
import { StepperInput } from "../components/ui/stepper-input";
import { DataListItem, DataListRoot } from "../components/ui/data-list";
import {
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from "../components/ui/timeline";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

import recipeOverviewList from "../assets/recipes.json";

const RecipePage = () => {
  const { slug } = useParams();
  const recipe = recipeOverviewList.find((x) => x.slug === slug);

  const navigate = useNavigate();
  useEffect(() => {
    if (!recipe) {
      navigate("/");
    }
  }, [recipe, navigate]);
  const [selectedPortions, setSelectedPortions] = useState(
    (recipe?.portions || "").toString()
  );
  const [likedRecipes, setLikedRecipes] = useState<string[]>(() => {
    const storedRecipes = localStorage.getItem("likedRecipes");
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  });
  return (
    <>
      <Navbar></Navbar>
      <div style={{ position: "relative" }}>
        <Button
          position="absolute"
          right="1rem"
          top="1rem"
          aspectRatio="1/1"
          padding="2rem"
          borderRadius="full"
          background="rgb(127, 127, 127)"
          zIndex="10"
          onClick={(e) => {
            e.stopPropagation();
            if (likedRecipes.includes(recipe?.slug ?? "")) {
              const updatedRecipes = likedRecipes.filter(
                (recipeSlug) => recipeSlug !== (recipe?.slug ?? "")
              );
              setLikedRecipes(updatedRecipes);
              localStorage.setItem(
                "likedRecipes",
                JSON.stringify(updatedRecipes)
              );
            } else {
              const updatedRecipes = [...likedRecipes, recipe?.slug ?? ""]; // Append new recipe to the array
              setLikedRecipes(updatedRecipes); // Update the state
              localStorage.setItem(
                "likedRecipes",
                JSON.stringify(updatedRecipes)
              );
            }
          }}
          _hover={{
            background: "rgb(100, 100, 100)",
            color: "rgb(255, 150, 150)",
          }}
          color={likedRecipes.includes(recipe?.slug ?? "") ? "red" : "white"}
        >
          <i className="fa-solid fa-heart" style={{ fontSize: "2.5rem" }}></i>
        </Button>
        <Image
          src={recipe?.image}
          alt={recipe?.title}
          width="100%"
          height="min(50vh, 80vw)"
          objectFit="cover"
          roundedBottomLeft="min(8vh, 8vw)"
          roundedBottom="min(8vh, 8vw)"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Box
            width="80%"
            padding="4"
            margin="auto"
            marginTop="-2em"
            rounded="md"
            bg={{ base: "rgb(240,241,233)", _dark: "rgb(15,15,15)" }}
          >
            <Heading size="2xl">{recipe?.title}</Heading>
          </Box>

          <Tabs.Root
            variant="enclosed"
            width="80%"
            margin="auto"
            marginTop="3vh"
            fitted
            defaultValue={"zutaten"}
            transition="ttransform 0.3s ease"
          >
            <Tabs.List>
              <Tabs.Trigger value="zutaten">Zutaten</Tabs.Trigger>
              <Tabs.Trigger value="zubereitung">Zubereitung</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="zutaten">
              <Box
                width="100%"
                padding="min(5vw, 5vh)"
                margin="auto"
                marginBottom="min(10vh, 10vw)"
                rounded="md"
                bg={{ base: "rgb(240,241,233)", _dark: "rgb(15,15,15)" }}
                key="zutaten"
              >
                <Heading size="xl" marginBottom="2vh">
                  Portionen:
                </Heading>
                <StepperInput
                  defaultValue={recipe?.portions.toString()}
                  min={1}
                  max={100}
                  onValueChange={(details) => {
                    const values = details.value;
                    setSelectedPortions(values);
                    console.log(values);
                  }}
                />
                {recipe?.ingredients.map((ingredient) => (
                  <>
                    <Heading key={ingredient.title} margin="1em 0 1em 0">
                      {ingredient.title}
                    </Heading>
                    <DataListRoot
                      orientation="horizontal"
                      size="lg"
                      key={String(ingredient.title + "list")}
                    >
                      {ingredient.ingredientList.map((ingredientList) => (
                        <DataListItem
                          key={ingredientList.ingredientName}
                          label={ingredientList.ingredientName}
                          value={
                            (ingredientList.ingredientAmount
                              ? parseFloat(
                                  (
                                    (ingredientList.ingredientAmount *
                                      Number(selectedPortions)) /
                                    recipe.portions
                                  ).toFixed(2)
                                ).toString()
                              : "") +
                            " " +
                            (ingredientList.ingredientUnit
                              ? ingredientList.ingredientUnit
                              : "")
                          }
                        />
                      ))}
                    </DataListRoot>
                  </>
                ))}
              </Box>
            </Tabs.Content>
            <Tabs.Content value="zubereitung">
              <Box
                width="100%"
                padding="min(5vw, 5vh)"
                margin="auto"
                marginBottom="min(10vh, 10vw)"
                rounded="md"
                bg={{ base: "rgb(240,241,233)", _dark: "rgb(15,15,15)" }}
              >
                <TimelineRoot>
                  {recipe?.preparation?.map((preparation, index) => (
                    <TimelineItem key={preparation.title}>
                      <TimelineConnector
                        key={String(preparation.title + "connector")}
                      >
                        {index + 1}
                      </TimelineConnector>
                      <TimelineContent
                        key={String(preparation.title + "content")}
                      >
                        <TimelineTitle
                          key={String(preparation.title + "title")}
                        >
                          {preparation.title}
                        </TimelineTitle>
                        {preparation.description}
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </TimelineRoot>
              </Box>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </>
  );
};

export default RecipePage;
