import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, VStack, Input, Button, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { useSupabaseAuth } from '../integrations/supabase/auth.jsx';
import { useProfile, useUpdateProfile } from '../integrations/supabase/index.js';

const EditProfile = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const { data: profile, isLoading } = useProfile(session?.user?.id);
  const updateProfile = useUpdateProfile();

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [website, setWebsite] = useState('');

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || '');
      setFullName(profile.full_name || '');
      setAvatarUrl(profile.avatar_url || '');
      setWebsite(profile.website || '');
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile.mutateAsync({
        id: session.user.id,
        username,
        full_name: fullName,
        avatar_url: avatarUrl,
        website,
      });
      toast({
        title: "Profile updated.",
        description: "Your profile information has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error updating profile.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>
        <FormControl id="full_name">
          <FormLabel>Full Name</FormLabel>
          <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </FormControl>
        <FormControl id="avatar_url">
          <FormLabel>Avatar URL</FormLabel>
          <Input type="text" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
        </FormControl>
        <FormControl id="website">
          <FormLabel>Website</FormLabel>
          <Input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="blue" isLoading={updateProfile.isLoading}>Update Profile</Button>
      </VStack>
    </Container>
  );
};

export default EditProfile;