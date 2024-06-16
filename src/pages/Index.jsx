import { Container, Text, VStack, Box, Heading } from "@chakra-ui/react";
import { useVenues, useUpdateVenue } from "../integrations/supabase/index.js";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from "react";
import 'leaflet/dist/leaflet.css';

const Index = () => {
  const { data: venues, isLoading, error } = useVenues();
  const updateVenue = useUpdateVenue();
  const [draggingVenue, setDraggingVenue] = useState(null);

  const handleDragStart = (venue) => {
    setDraggingVenue(venue);
  };

  const handleDrop = async (event) => {
    if (!draggingVenue) return;

    const { lat, lng } = event.latlng;

    try {
      await updateVenue.mutateAsync({
        id: draggingVenue.id,
        latitude: lat,
        longitude: lng,
      });
      setDraggingVenue(null);
    } catch (error) {
      console.error("Error updating venue location:", error);
    }
  };

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
            <Box
              key={venue.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              mb={4}
              draggable
              onDragStart={() => handleDragStart(venue)}
            >
              <Text fontSize="xl" fontWeight="bold">{venue.name}</Text>
              <Text>Capacity: {venue.capacity}</Text>
              <Text>Type: {venue.type}</Text>
            </Box>
          ))}
        </Box>
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "400px", width: "100%" }} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {venues.map((venue) => (
            <Marker key={venue.id} position={[venue.latitude, venue.longitude]}>
              <Popup>
                {venue.name}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </VStack>
    </Container>
  );
};

export default Index;