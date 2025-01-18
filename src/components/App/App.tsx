import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppProvider } from "@/context/AppContext";
import { FormPage } from "@/pages/FormPage";
import { ImageSelectionPage } from "@/pages/ImageSelectionPage";
import { FinalCardPage } from "@/pages/FinalCardPage";

const theme = createTheme();

function App() {
  const [step, setStep] = useState(0);

  const handleNextFromForm = () => setStep(1);
  const handleAcceptImage = () => setStep(2);
  const handleRejectImage = () => {};
  const handleReset = () => setStep(0);

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        {step === 0 && <FormPage onNext={handleNextFromForm} />}
        {step === 1 && (
          <ImageSelectionPage
            onAccept={handleAcceptImage}
            onReject={handleRejectImage}
          />
        )}
        {step === 2 && <FinalCardPage onReset={handleReset} />}
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
