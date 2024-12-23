import { useState } from "react";
import { InputGroup } from "d:/Felix/Code/Website/!FamilienRezept/react-app/src/components/ui/input-group";
import {
  Box,
  Image,
  Stack,
  Badge,
  Text,
  Input,
  Card,
  Heading,
  createListCollection,
} from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "d:/Felix/Code/Website/!FamilienRezept/react-app/src/components/ui/select";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "d:/Felix/Code/Website/!FamilienRezept/react-app/src/components/ui/menu";
import { Button } from "d:/Felix/Code/Website/!FamilienRezept/react-app/src/components/ui/button";
import { Slider } from "d:/Felix/Code/Website/!FamilienRezept/react-app/src/components/ui/slider";

function stringTime(recipeTime: number) {
  let hours = Math.trunc(recipeTime / 60); // Calculate hours
  let minutes = recipeTime % 60; // Calculate minutes
  return (
    (hours === 0 ? "" : String(hours) + "h ") +
    (minutes === 0 ? "" : String(minutes) + "min")
  );
}

const recipeBadgesList = createListCollection({
  items: [
    { label: "Vegetarisch", value: "vegetarisch" },
    { label: "Vegan", value: "vegan" },
    { label: "Fruktosefrei", value: "fruktosefrei" },
    { label: "Laktosefrei", value: "laktosefrei" },
  ],
});

const recipeDifficultyList = createListCollection({
  items: [
    { label: "Einfach", value: "einfach" },
    { label: "Mittel", value: "mittel" },
    { label: "Schwer", value: "schwer" },
  ],
});

const recipeMealTypeList = createListCollection({
  items: [
    { label: "Vorspeise", value: "vorspeise" },
    { label: "Hauptspeise", value: "hauptspeise" },
    { label: "Beilage", value: "beilage" },
    { label: "Dessert", value: "dessert" },
    { label: "Snack", value: "snack" },
    { label: "Frühstück", value: "frühstück" },
  ],
});

import recipeOverviewList from "../assets/recipes.json";

const RecipePanels = () => {
  const [likedRecipes, setLikedRecipes] = useState<string[]>(() => {
    const storedRecipes = localStorage.getItem("likedRecipes");
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    []
  );
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState(100);
  const [selectedLiked, setSelectedLiked] = useState(false);

  const filteredRecipes = recipeOverviewList.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (recipe.difficulty.toLowerCase().includes(selectedDifficulties[0]) ||
        recipe.difficulty.toLowerCase().includes(selectedDifficulties[1]) ||
        recipe.difficulty.toLowerCase().includes(selectedDifficulties[2]) ||
        selectedDifficulties.length === 0) &&
      (selectedBadges.every((badge) => recipe.badges.includes(badge)) ||
        selectedBadges.length == 0) &&
      (selectedMealTypes.every((mealType) =>
        recipe.mealType.includes(mealType)
      ) ||
        selectedMealTypes.length == 0) &&
      (selectedTime == 100 ||
        (selectedTime == 75 && recipe.time <= 120) ||
        (selectedTime == 50 && recipe.time <= 60) ||
        (selectedTime == 25 && recipe.time <= 30) ||
        (selectedTime == 0 && recipe.time <= 15)) &&
      ((selectedLiked == true && likedRecipes.includes(recipe.slug)) ||
        selectedLiked == false)
  );

  return (
    <>
      <Box
        padding="20px 0 20px 0"
        display="flex"
        textAlign="center"
        width="90%"
        justifyItems={"center"}
        alignItems={"center"}
      >
        <InputGroup
          flex="1"
          width="100%"
          startElement={<i className="fa-solid fa-magnifying-glass"></i>}
          endElement={
            <i
              className="fa-solid fa-xmark"
              onClick={() => setSearchTerm("")}
            ></i>
          }
        >
          <Input
            id="SearchBar"
            placeholder="Nach Rezept suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </Box>
      <Box
        display="flex"
        flexWrap={"wrap"}
        textAlign="center"
        width="90%"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <SelectRoot
          multiple
          collection={recipeDifficultyList}
          size="sm"
          width="max(150px, 15vw)"
          margin={"10px"}
          onValueChange={(details) => {
            const values = details.value;
            setSelectedDifficulties(values);
            console.log(values);
          }}
        >
          <SelectTrigger clearable>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              width="100%"
              color="rgb(127, 127, 127)"
            >
              <i
                className="fa-solid fa-signal"
                style={{ marginRight: "8px" }}
              ></i>
              <SelectValueText placeholder="Schwierigkeit" />
            </Box>
          </SelectTrigger>

          <SelectContent>
            {recipeDifficultyList.items.map((difficulty) => (
              <SelectItem item={difficulty} key={difficulty.value}>
                {difficulty.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>

        <SelectRoot
          multiple
          collection={recipeBadgesList}
          size="sm"
          width="max(150px, 15vw)"
          margin={"10px"}
          onValueChange={(details) => {
            const values = details.value;
            setSelectedBadges(values);
            console.log(values);
          }}
        >
          <SelectTrigger clearable>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              width="100%"
              color="rgb(127, 127, 127)"
            >
              <i
                className="fa-solid fa-leaf"
                style={{ marginRight: "8px" }}
              ></i>
              <SelectValueText placeholder="Ernährung" />
            </Box>
          </SelectTrigger>

          <SelectContent>
            {recipeBadgesList.items.length === 0
              ? null
              : recipeBadgesList.items.map((badge) => (
                  <SelectItem item={badge} key={badge.value}>
                    {badge.label}
                  </SelectItem>
                ))}
          </SelectContent>
        </SelectRoot>

        <SelectRoot
          multiple
          collection={recipeMealTypeList}
          size="sm"
          width="max(150px, 15vw)"
          margin={"10px"}
          onValueChange={(details) => {
            const values = details.value;
            setSelectedMealTypes(values);
            console.log(values);
          }}
        >
          <SelectTrigger clearable>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              width="100%"
              color="rgb(127, 127, 127)"
            >
              <i
                className="fa-solid fa-bowl-food"
                style={{ marginRight: "8px" }}
              ></i>
              <SelectValueText placeholder="Mahlzeit" />
            </Box>
          </SelectTrigger>

          <SelectContent>
            {recipeMealTypeList.items.map((mealType) => (
              <SelectItem item={mealType} key={mealType.value}>
                {mealType.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>

        <MenuRoot>
          <MenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              width="max(150px, 15vw)"
              margin="10px"
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                width="100%"
                color="rgb(127, 127, 127)"
              >
                <i
                  className="fa-solid fa-clock"
                  style={{ marginRight: "8px" }}
                ></i>{" "}
                Arbeitszeit
              </Box>
            </Button>
          </MenuTrigger>
          <MenuContent>
            <MenuItem value="slider" flexDirection={"column"}>
              Arbeitszeit in Minuten
              <Slider
                width="200px"
                defaultValue={[100]}
                step={25}
                marks={[
                  { value: 0, label: "15" },
                  { value: 25, label: "30" },
                  { value: 50, label: "60" },
                  { value: 75, label: "120" },
                  { value: 100, label: "Alle" },
                ]}
                onChange={(selectedValue: any) => {
                  console.log(selectedValue.target.value);
                  setSelectedTime(selectedValue.target.value);
                }}
              />
              <br style={{ height: "0" }} />
            </MenuItem>
          </MenuContent>
        </MenuRoot>
        <Button
          variant="outline"
          size="sm"
          width="max(150px, 15vw)"
          margin="10px"
          onClick={() => {
            setSelectedLiked(selectedLiked === false ? true : false);
            console.log(likedRecipes);
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            width="100%"
            color="rgb(127, 127, 127)"
          >
            <i
              className="fa-solid fa-heart"
              style={{
                marginRight: "8px",
                color: selectedLiked ? "red" : "rgb(127, 127, 127)",
              }}
            ></i>{" "}
            Gespeichert
          </Box>
        </Button>
      </Box>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          padding: "20px",
          width: "100%",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Heading size="3xl">
          {searchTerm === ""
            ? null
            : `${filteredRecipes.length} Ergebnisse gefunden für '${searchTerm}'`}
        </Heading>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
            width: "90%",
            margin: "auto",
          }}
        >
          {filteredRecipes.map((recipe) => (
            <Card.Root
              key={recipe.id}
              maxW="sm"
              overflow="hidden"
              margin={"10px"}
              width={"320px"}
              onClick={() => window.location.assign(recipe.slug)}
              _hover={{
                cursor: "pointer",

                "& img": {
                  transform: "scale(1.2)",
                },
              }}
              bg={{ base: "rgb(240,241,233)", _dark: "rgb(15,15,15)" }}
            >
              <Card.Body gap="2" padding={"0 0 1em 0"}>
                <Box
                  position="relative"
                  overflow="hidden"
                  height="250px"
                  width="100%"
                >
                  <Button
                    position="absolute"
                    right="0.5rem"
                    top="0.5rem"
                    padding="0.2rem"
                    borderRadius="full"
                    background="rgb(127, 127, 127)"
                    zIndex="10"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (likedRecipes.includes(recipe.slug)) {
                        const updatedRecipes = likedRecipes.filter(
                          (recipeSlug) => recipeSlug !== recipe.slug
                        );
                        setLikedRecipes(updatedRecipes);
                        localStorage.setItem(
                          "likedRecipes",
                          JSON.stringify(updatedRecipes)
                        );
                      } else {
                        const updatedRecipes = [...likedRecipes, recipe.slug]; // Append new recipe to the array
                        setLikedRecipes(updatedRecipes); // Update the state
                        localStorage.setItem(
                          "likedRecipes",
                          JSON.stringify(updatedRecipes)
                        );
                      }
                    }}
                    _hover={{
                      background: "rgb(100, 100, 100)",
                      color: likedRecipes.includes(recipe.slug)
                        ? "red"
                        : "rgb(255, 150, 150)",
                    }}
                    color={likedRecipes.includes(recipe.slug) ? "red" : "white"}
                  >
                    <i
                      className="fa-solid fa-heart"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </Button>
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    height="250px"
                    width="100%"
                    objectFit="cover"
                    transition="transform 0.3s ease"
                  />
                </Box>
              </Card.Body>
              <Card.Title marginLeft={"1em"}>{recipe.title}</Card.Title>
              <br />
              {recipe.badges.length === 0 ? <Stack></Stack> : null}
              <Stack marginLeft={"1em"} direction="row">
                {recipe.badges.map((recipeBadge, index) => (
                  <Badge
                    key={`${recipe.id}-badge-${index}`}
                    colorPalette="green"
                  >
                    {recipeBadge}
                  </Badge>
                ))}
              </Stack>
              <br />
              <Card.Footer gap="2">
                <Text display={"flex"} alignItems={"center"}>
                  <i className="fa-regular fa-clock"></i>&nbsp;&nbsp;
                  {stringTime(recipe.time)} | &nbsp;
                  {recipe.difficulty === "Einfach" ? (
                    <>
                      <svg width={"24px"} height={"24px"}>
                        <path
                          d="M20.5 4C21.0523 4 21.5 4.44772 21.5 5V19C21.5 19.5523 21.0523 20 20.5 20H17C16.4477 20 16 19.5523 16 19V5C16 4.44772 16.4477 4 17 4H20.5ZM20 5.5H17.5V18.5H20V5.5Z"
                          fill="#363636"
                        ></path>
                        <path
                          d="M14.5 9C14.5 8.44772 14.0523 8 13.5 8H10C9.44772 8 9 8.44772 9 9V19C9 19.5523 9.44772 20 10 20H13.5C14.0523 20 14.5 19.5523 14.5 19V9ZM10.5 9.5H13V18.5H10.5V9.5Z"
                          fill="#363636"
                        ></path>
                        <path
                          d="M2 13C2 12.4477 2.44772 12 3 12H6.5C7.05228 12 7.5 12.4477 7.5 13V19C7.5 19.5523 7.05228 20 6.5 20H3C2.44772 20 2 19.5523 2 19V13Z"
                          fill="#363636"
                        ></path>
                      </svg>
                      &nbsp; Einfach
                    </>
                  ) : recipe["difficulty"] === "Mittel" ? (
                    <>
                      <svg width={"24px"} height={"24px"}>
                        <path
                          d="M20.5 4C21.0523 4 21.5 4.44772 21.5 5V19C21.5 19.5523 21.0523 20 20.5 20H17C16.4477 20 16 19.5523 16 19V5C16 4.44772 16.4477 4 17 4H20.5ZM20 5.5H17.5V18.5H20V5.5Z"
                          fill="#363636"
                        ></path>
                        <path
                          d="M9 9C9 8.44771 9.44772 8 10 8H13.5C14.0523 8 14.5 8.44772 14.5 9V19C14.5 19.5523 14.0523 20 13.5 20H10C9.44772 20 9 19.5523 9 19V9Z"
                          fill="#363636"
                        ></path>
                        <path
                          d="M2 13C2 12.4477 2.44772 12 3 12H6.5C7.05228 12 7.5 12.4477 7.5 13V19C7.5 19.5523 7.05228 20 6.5 20H3C2.44772 20 2 19.5523 2 19V13Z"
                          fill="#363636"
                        ></path>
                      </svg>
                      &nbsp; Mittel
                    </>
                  ) : recipe["difficulty"] === "Schwer" ? (
                    <>
                      <svg width={"24px"} height={"24px"}>
                        <path
                          d="M17 4C16.4477 4 16 4.44772 16 5V19C16 19.5523 16.4477 20 17 20H20.5C21.0523 20 21.5 19.5523 21.5 19V5C21.5 4.44772 21.0523 4 20.5 4H17Z"
                          fill="#363636"
                        ></path>
                        <path
                          d="M9 9C9 8.44771 9.44772 8 10 8H13.5C14.0523 8 14.5 8.44772 14.5 9V19C14.5 19.5523 14.0523 20 13.5 20H10C9.44772 20 9 19.5523 9 19V9Z"
                          fill="#363636"
                        ></path>
                        <path
                          d="M2 13C2 12.4477 2.44772 12 3 12H6.5C7.05228 12 7.5 12.4477 7.5 13V19C7.5 19.5523 7.05228 20 6.5 20H3C2.44772 20 2 19.5523 2 19V13Z"
                          fill="#363636"
                        ></path>
                      </svg>
                      &nbsp; Schwer
                    </>
                  ) : null}
                </Text>
              </Card.Footer>
            </Card.Root>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecipePanels;
