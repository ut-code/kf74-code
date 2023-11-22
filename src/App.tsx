import { useEffect, useState } from "react";
import { convertString, enigmaSample, rewindScrambler } from "./lib/enigma";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useKey } from "rooks";
import ScramblerSelector from "./lib/scramblerSelector";
import ScramblerOrder from "./lib/ScramblerOrder";
import Scrambler from "./lib/scrambler";
import {
  scramblerSample1,
  scramblerSample2,
  scramblerSample3,
} from "./lib/scramblerSample";
import Key from "./lib/Key";
import Keyboard from "./lib/Keyboard";

const keys = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function App() {
  const [text, setText] = useState([""]);
  const [enigma, setEnigma] = useState(enigmaSample);
  const [isBlinking, setIsBlinking] = useState(true);
  const [scramblerShift, setScramblerShift] = useState([0, 0, 0]);
  const [scramblerOrder, setScramblerOrder] = useState([0, 1, 2]);
  const [lightKey, setLightKey] = useState("");
  const eventHandler = (e: KeyboardEvent) => {
    if (e.key === "Backspace") {
      if (text[text.length - 1].length === 0) return;
      const newText = text;
      const isSpace = newText[text.length - 1].slice(-1) === " ";
      newText[text.length - 1] = newText[text.length - 1].slice(0, -1);
      setText(newText);
      if (!isSpace) {
        setEnigma(rewindScrambler(enigma));
      }
    } else {
      const char = e.key.toUpperCase();
      const [convertedChar, newEnigma] = convertString(char, enigma);
      const newText = text;
      newText[text.length - 1] += convertedChar;
      setText(newText);
      setLightKey(convertedChar);
      setEnigma(newEnigma);
    }
  };
  const changeScramblerShift = (index: number) => (key: number) => {
    const newScramblerShift = [...scramblerShift];
    newScramblerShift[index] = key;
    setScramblerShift(newScramblerShift);
  };
  useKey([...keys, " ", "Backspace"], eventHandler);
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(!isBlinking);
    }, 500);
    return () => clearInterval(interval);
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setLightKey("");
    }, 1000);
    return () => clearInterval(interval);
  }, [lightKey]);

  return (
    <VStack w="100vw">
      <Box w="100%" textAlign="center">
        <Text fontSize="4xl">Enigma</Text>
      </Box>
      <HStack>
        <ScramblerSelector onChange={changeScramblerShift(0)} />
        <ScramblerSelector onChange={changeScramblerShift(1)} />
        <ScramblerSelector onChange={changeScramblerShift(2)} />
        <ScramblerOrder onChange={(key: number[]) => setScramblerOrder(key)} />
        <Box>
          <Button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              const newScrambler = [...enigma.scrambler];
              newScrambler[scramblerOrder[0]] = new Scrambler(scramblerSample1);
              newScrambler[scramblerOrder[1]] = new Scrambler(scramblerSample2);
              newScrambler[scramblerOrder[2]] = new Scrambler(scramblerSample3);
              setEnigma({
                ...enigma,
                scrambler: newScrambler,
                scramblerShift: scramblerShift,
              });
              if (text[text.length - 1].length !== 0) setText([...text, ""]);
              e.currentTarget.blur();
            }}
          >
            Set key and newline
          </Button>
        </Box>
      </HStack>
      <Flex justifyContent="center" alignItems="center" my={4} width="100%">
        <Keyboard lightKeys={lightKey} />
      </Flex>
      <Box w={["100vw", "60vw"]}>
        {text.map((line, index) => {
          return (
            <Box key={"box" + index}>
              <Text fontSize="3xl" key={"text" + index}>
                {line + (index === text.length - 1 && isBlinking ? "|" : "")}
              </Text>
              {index !== text.length - 1 && <Divider key={"divider" + index} />}
            </Box>
          );
        })}
      </Box>
    </VStack>
  );
}

export default App;
