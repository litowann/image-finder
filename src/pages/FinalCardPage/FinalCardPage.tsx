import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography
} from "@mui/material";
import { useAppContext } from "@/context/AppContext";
import { cardActionsSx, cardMediaSx, cardSx, containerSx } from "./styles";

interface FinalCardPageProps {
  onReset: () => void;
}

const FinalCardPage = ({ onReset }: FinalCardPageProps) => {
  const { name, surname, imageUrl } = useAppContext();

  return (
    <Container maxWidth="sm" sx={containerSx}>
      <Card sx={cardSx}>
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt="Selected from Unsplash"
          sx={cardMediaSx}
        />
        <CardContent>
          <Typography variant="h6">Name: {name}</Typography>
          <Typography variant="h6">Surname: {surname}</Typography>
        </CardContent>
        <CardActions sx={cardActionsSx}>
          <Button variant="outlined" onClick={onReset}>
            Start Over
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default FinalCardPage;
