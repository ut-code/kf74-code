import { HStack, Stack } from "@chakra-ui/react";
import Key from "./Key";

export default function Keyboard({ lightKeys = "" }: { lightKeys?: string }) {
  return (
    <Stack>
      <HStack>
        <Key light={lightKeys.includes("Q")}>Q</Key>
        <Key light={lightKeys.includes("W")}>W</Key>
        <Key light={lightKeys.includes("E")}>E</Key>
        <Key light={lightKeys.includes("R")}>R</Key>
        <Key light={lightKeys.includes("T")}>T</Key>
        <Key light={lightKeys.includes("Y")}>Y</Key>
        <Key light={lightKeys.includes("U")}>U</Key>
        <Key light={lightKeys.includes("I")}>I</Key>
        <Key light={lightKeys.includes("O")}>O</Key>
        <Key light={lightKeys.includes("P")}>P</Key>
      </HStack>
      <HStack mx={6}>
        <Key light={lightKeys.includes("A")}>A</Key>
        <Key light={lightKeys.includes("S")}>S</Key>
        <Key light={lightKeys.includes("D")}>D</Key>
        <Key light={lightKeys.includes("F")}>F</Key>
        <Key light={lightKeys.includes("G")}>G</Key>
        <Key light={lightKeys.includes("H")}>H</Key>
        <Key light={lightKeys.includes("J")}>J</Key>
        <Key light={lightKeys.includes("K")}>K</Key>
        <Key light={lightKeys.includes("L")}>L</Key>
      </HStack>
      <HStack mx={12}>
        <Key light={lightKeys.includes("Z")}>Z</Key>
        <Key light={lightKeys.includes("X")}>X</Key>
        <Key light={lightKeys.includes("C")}>C</Key>
        <Key light={lightKeys.includes("V")}>V</Key>
        <Key light={lightKeys.includes("B")}>B</Key>
        <Key light={lightKeys.includes("N")}>N</Key>
        <Key light={lightKeys.includes("M")}>M</Key>
      </HStack>
    </Stack>
  );
}
