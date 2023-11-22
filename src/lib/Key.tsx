import { Flex } from "@chakra-ui/react";

export default function Key({
  light = false,
  children,
}: {
  light?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Flex
      w={10}
      h={10}
      bgColor={light ? "yellow.200" : "gray.200"}
      borderRadius="full"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Flex>
  );
}
