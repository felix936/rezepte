import { ColorModeButton } from "./ui/color-mode";
import { Box, LinkBox, LinkOverlay } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <>
      <header>
        <nav>
          <Box width="100%" padding="4" display="flex" flexDirection="row">
            <h1
              style={{
                width: "100%",
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <LinkBox
                bg={{ base: "rgb(240,241,233)", _dark: "rgb(15,15,15)" }}
                rounded="md"
                padding="min(1vh, 1vw) min(2vh, 2vw) min(1vh, 1vw) min(2vh, 2vw)"
              >
                <LinkOverlay href="/" fontSize={"2rem"}>
                  Rezepte &nbsp;
                  <i
                    style={{ color: "#65A603" }}
                    className="fa-solid fa-utensils"
                  ></i>
                </LinkOverlay>
              </LinkBox>
              <ColorModeButton></ColorModeButton>
            </h1>
          </Box>
        </nav>
      </header>
      <hr />
    </>
  );
};

export default Navbar;
