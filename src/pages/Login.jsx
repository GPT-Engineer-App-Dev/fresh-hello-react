import { Container, VStack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SupabaseAuthUI, useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const Login = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold">Login</Text>
        <SupabaseAuthUI />
      </VStack>
    </Container>
  );
};

export default Login;