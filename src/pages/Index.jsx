import { Container, Text, VStack, Box, Heading } from "@chakra-ui/react";
import { useVenues } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: venues, isLoading, error } = useVenues();

  if (isLoading) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Text fontSize="4xl" fontWeight="bold">Loading...</Text>
        </VStack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Text fontSize="4xl" fontWeight="bold">Error loading venues</Text>
        </VStack>
      </Container>
    );
  }

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold">Hello World</Text>
        <Box>
          <Heading as="h2" size="lg" mb={4}>Venues</Heading>
          {venues.map((venue) => (
            <Box key={venue.id} p={4} borderWidth="1px" borderRadius="lg" mb={4}>
              <Text fontSize="xl" fontWeight="bold">{venue.name}</Text>
              <Text>Capacity: {venue.capacity}</Text>
              <Text>Type: {venue.type}</Text>
            </Box>
          ))}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;