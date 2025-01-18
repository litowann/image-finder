import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography
} from "@mui/material";
import { useAppContext } from "@/context/AppContext";
import { UnsplashService } from "@/services/UnsplashService";
import { buttonsBoxSx, containerSx, imageBoxSx } from "./styles";

enum Status {
  Loading,
  Error,
  Success
}

interface ImageSelectionPageProps {
  onAccept: () => void;
  onReject: () => void;
}

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const unsplashService = new UnsplashService(accessKey);

const ImageSelectionPage = ({
  onAccept,
  onReject
}: ImageSelectionPageProps) => {
  const { topic, customTopic, setImageUrl } = useAppContext();
  const [status, setStatus] = useState<Status>(Status.Loading);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [currentImage, setCurrentImage] = useState<string>("");

  const fetchImage = useCallback(async () => {
    setStatus(Status.Loading);
    setErrorMessage("");
    try {
      const searchTerm = topic === "Other" ? customTopic : topic;
      const image = await unsplashService.fetchRandomPhoto(searchTerm);
      setCurrentImage(image);
      setStatus(Status.Success);
    } catch (err) {
      setErrorMessage("Failed to fetch image from Unsplash");
      setStatus(Status.Error);
    }
  }, [topic, customTopic]);

  useEffect(() => {
    fetchImage();
  }, [fetchImage]);

  const handleAccept = () => {
    setImageUrl(currentImage);
    onAccept();
  };

  const handleReject = async () => {
    onReject();
    fetchImage();
  };

  return (
    <Container maxWidth="sm" sx={containerSx}>
      {status === Status.Loading && <CircularProgress />}

      {status === Status.Error && (
        <Typography color="error" gutterBottom>
          {errorMessage}
        </Typography>
      )}

      {status === Status.Success && currentImage && (
        <>
          <Box
            component="img"
            src={currentImage}
            alt="Random from Unsplash"
            sx={imageBoxSx}
          />
          <Box sx={buttonsBoxSx}>
            <Button variant="contained" color="primary" onClick={handleAccept}>
              Accept
            </Button>
            <Button variant="outlined" color="error" onClick={handleReject}>
              Reject
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default ImageSelectionPage;
