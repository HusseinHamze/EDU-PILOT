
import React from "react";

const PersonalityType = ({ topMajor }) => {
  const majorToPersonality = {
    "Computer Science": "Analytical Thinker",
    "Software Engineering": "Analytical Thinker",
    "Electrical and Mechanical Engineering": "Analytical Thinker",
    "Civil Engineering": "Analytical Thinker",
    "Mathematics": "Analytical Thinker",
    "Physics": "Analytical Thinker",
    "Chemistry": "Analytical Thinker",
    "Environmental Science": "Analytical Thinker",
    "Biotechnology": "Analytical Thinker",

    "Medicine": "Compassionate Helper",
    "Nursing": "Compassionate Helper",
    "Pharmacy": "Compassionate Helper",
    "Physical Therapy": "Compassionate Helper",
    "Public Health": "Compassionate Helper",
    "Psychology": "Compassionate Helper",

    "Business Administration": "Strategic Leader",
    "Accounting": "Strategic Leader",
    "Finance": "Strategic Leader",
    "Marketing": "Strategic Leader",
    "Economics": "Strategic Leader",
    "International Relations": "Strategic Leader",

    "Architecture": "Creative Visionary",
    "Graphic Design": "Creative Visionary",
    "Visual Arts": "Creative Visionary",
    "Literature and Linguistics": "Creative Visionary",
    "History": "Creative Visionary",
    "Political Science": "Creative Visionary",
    "Philosophy": "Creative Visionary",
    "Religious Studies": "Creative Visionary",

    "Education (General or Special Needs)": "Nurturing Educator",
    "Early Childhood Development": "Nurturing Educator",

    "Journalism": "Innovative Communicator",
    "Film and Media Studies": "Innovative Communicator",
    "Animation": "Innovative Communicator",

    "Law": "Justice Advocate",
    "Public Administration": "Justice Advocate",

    "Sports Science": "Dynamic Organizer",
    "Event Management": "Dynamic Organizer",
  };

  const personalityType = majorToPersonality[topMajor] || "Creative Problem-Solver";

  return (
    <p className="text-xl font-bold text-[#0E1C36] mb-3">
      You're a {personalityType}!
    </p>
  );
};

export default PersonalityType;
