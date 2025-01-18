import { FormEvent, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from "@mui/material";
import { useAppContext } from "@/context/AppContext";
import { TOPICS } from "@/helpers/constants";
import { mainBoxSx } from "./styles";

interface FormPageProps {
  onNext: () => void;
}

const FormPage = ({ onNext }: FormPageProps) => {
  const {
    name,
    surname,
    topic,
    customTopic,
    setName,
    setSurname,
    setTopic,
    setCustomTopic
  } = useAppContext();

  const [showCustom, setShowCustom] = useState(topic === "Other");

  const handleTopicChange = (e: SelectChangeEvent<string>) => {
    const selected = e.target.value;
    setTopic(selected);
    setShowCustom(selected === "Other");
    if (selected !== "Other") {
      setCustomTopic("");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={mainBoxSx}>
        <Typography variant="h5" gutterBottom>
          User Information
        </Typography>

        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <TextField
          label="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />

        <FormControl required>
          <InputLabel>Preferred Topic</InputLabel>
          <Select
            value={topic}
            onChange={handleTopicChange}
            label="Preferred Topic"
          >
            {TOPICS.map((topic) => (
              <MenuItem key={topic} value={topic}>
                {topic}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {showCustom && (
          <TextField
            label="Custom Topic"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            required
          />
        )}

        <Button type="submit" variant="contained">
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default FormPage;
