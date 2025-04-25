import { useState } from 'react';
import NavBar from "../Multi-Use/NavBar";
import Stepper from "./Stepper";
import Result from "./Result";

export default function Assessment() {
    const [showResults, setShowResults] = useState(false);

    const handleAssessmentComplete = () => {
        setShowResults(true);
    };

    return (
        <>
            <NavBar />
            {!showResults ? (
                <Stepper onComplete={handleAssessmentComplete} />
            ) : (
                <Result />
            )}
        </>
    );
}
