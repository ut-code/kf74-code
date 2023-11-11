import { useEffect, useState } from "react";
import { Enigma, convertString, enigmaSample, rewindScrambler } from "./lib/enigma";
import { Box, Button, Center, Divider, Flex, HStack, Spacer, Stack, Text, VStack } from "@chakra-ui/react";
import { useKey } from "rooks";
import ScramblerSelector from "./lib/scramblerSelector";
import ScramblerOrder from "./lib/ScramblerOrder";
import Scrambler from "./lib/scrambler";
import { scramblerSample1, scramblerSample2, scramblerSample3 } from "./lib/scramblerSample";

const keys = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function App() {
  const [text, setText] = useState([""]);
  const [enigma, setEnigma] = useState(enigmaSample);
  const [isBlinking, setIsBlinking] = useState(true);
  const [scramblerShift, setScramblerShift] = useState([0, 0, 0]);
  const [scramblerOrder, setScramblerOrder] = useState([0, 1, 2]);
  const eventHandler = (e: any) => {
    if (e.key === "Backspace") {
      if (text[text.length - 1].length === 0) return;
      let newText = text;
      const isSpace = newText[text.length-1].slice(-1) === " ";
      newText[text.length-1] = newText[text.length-1].slice(0, -1);
      setText(newText);
      if (!isSpace) {
        setEnigma(rewindScrambler(enigma))
      }
    } else {
      const char = e.key.toUpperCase();
      const [convertedChar, newEnigma] = convertString(char, enigma);
      let newText = text;
      newText[text.length-1] += convertedChar;
      setText(newText);
      setEnigma(newEnigma);
    }
  };
  const changeScramblerShift = (index: number) => (key: number) => {
    const newScramblerShift = [...scramblerShift];
    newScramblerShift[index] = key;
    setScramblerShift(newScramblerShift);
  }
  useKey([...keys, " ", "Backspace"], eventHandler);
  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(!isBlinking);
    }, 500);
    return () => clearInterval(interval);
  })

  return (
    <VStack w="100vw">
      <Box w="100%" textAlign="center">
        <Text fontSize="4xl">Enigma</Text>
      </Box>
      <HStack>
        <ScramblerSelector onChange={changeScramblerShift(0)}/>
        <ScramblerSelector onChange={changeScramblerShift(1)}/>
        <ScramblerSelector onChange={changeScramblerShift(2)}/>
        <ScramblerOrder onChange={(key: number[]) => setScramblerOrder(key)}/>
        <Box>
          <Button onClick={() => {
            let newScrambler = [...enigma.scrambler];
            newScrambler[scramblerOrder[0]] = new Scrambler(scramblerSample1);
            newScrambler[scramblerOrder[1]] = new Scrambler(scramblerSample2);
            newScrambler[scramblerOrder[2]] = new Scrambler(scramblerSample3);
            setEnigma({
              ...enigma,
              scrambler: newScrambler,
              scramblerShift: scramblerShift
            })
            setText([...text, ""]);
          }}>Set key and clear</Button>
        </Box>
      </HStack>
      <Box w={["100vw", "60vw"]}>
        {
          (text.map((line, index) => {
            return (
              <Box key={"box"+index}>
                <Text fontSize="3xl" key={"text"+index}>{line + (index === text.length-1 && isBlinking ? '|' : '')}</Text>
                {index !== text.length-1 && <Divider key={"divider"+index}/>}
              </Box>
            )
          }))
        }
      </Box>
    </VStack>
  );
}

export default App;
