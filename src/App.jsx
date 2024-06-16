import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";
import { Box, Flex, Heading, Spacer, Button, Text } from "@chakra-ui/react";
import Index from "./pages/Index.jsx";
import Login from "./pages/Login.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { SupabaseAuthProvider } from "./integrations/supabase/auth.jsx";
import { useSupabaseAuth } from "./integrations/supabase/auth.jsx";
import { Button } from "@chakra-ui/react";

function App() {
  const Navbar = () => {
    const { session, logout } = useSupabaseAuth();
    return (
      <Flex as="nav" bg="blue.500" color="white" padding="1.5rem">
        <Heading as="h1" size="lg">
          Bobo
        </Heading>
        <Spacer />
        <Box>
          <Button as={Link} to="/" variant="ghost" color="white" mr="4">
            Home
          </Button>
          {session && (
            <Button as={Link} to="/edit-profile" variant="ghost" color="white" mr="4">
              Edit Profile
            </Button>
          )}
          {session ? (
            <>
              <Text display="inline" mr="4">
                {session.user.email}
              </Text>
              <Button onClick={logout} variant="outline" color="white">
                Logout
              </Button>
            </>
          ) : (
            <Button as={Link} to="/login" variant="outline" color="white">
              Login
            </Button>
          )}
        </Box>
      </Flex>
    );
  };
  const { session, logout } = useSupabaseAuth();

  return (
    <SupabaseAuthProvider>
      <Router>
        <Navbar />
        <div>
          {session ? (
            <Button onClick={logout}>Logout</Button>
          ) : (
            <Button as="a" href="/login">Login</Button>
          )}
        </div>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
        </Routes>
      </Router>
    </SupabaseAuthProvider>
  );
}

export default App;