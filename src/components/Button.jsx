import { Button as ChakraButton } from "@chakra-ui/react";

export const Button = ({ onClick, buttontext }) => {
  return (
    <ChakraButton
      colorScheme="orange"
      size="md"
      shadow="md"
      transition="0.3s ease"
      onClick={onClick}
    >
      {buttontext}
    </ChakraButton>
  );
};
