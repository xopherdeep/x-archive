"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface PlanetInfo {
  name: string;
  distanceFromSun: number; // in million km
  diameter: number; // in km
  orbitalPeriod: number; // in Earth days
  gravity: number; // in m/s²
  funFact: string;
}

const planets: PlanetInfo[] = [
  {
    name: "Mercury",
    distanceFromSun: 58,
    diameter: 4879,
    orbitalPeriod: 88,
    gravity: 3.7,
    funFact: "Mercury has no atmosphere, which means there is no wind or weather."
  },
  {
    name: "Venus",
    distanceFromSun: 108,
    diameter: 12104,
    orbitalPeriod: 225,
    gravity: 8.87,
    funFact: "Venus rotates in the opposite direction compared to most planets."
  },
  {
    name: "Earth",
    distanceFromSun: 150,
    diameter: 12742,
    orbitalPeriod: 365,
    gravity: 9.81,
    funFact: "Earth is the only planet known to have life."
  },
  {
    name: "Mars",
    distanceFromSun: 228,
    diameter: 6779,
    orbitalPeriod: 687,
    gravity: 3.72,
    funFact: "Mars has the largest volcano in the solar system, Olympus Mons."
  },
  {
    name: "Jupiter",
    distanceFromSun: 778,
    diameter: 139820,
    orbitalPeriod: 4333,
    gravity: 24.79,
    funFact: "Jupiter has the shortest day of all planets, it rotates once every 10 hours."
  },
  {
    name: "Saturn",
    distanceFromSun: 1427,
    diameter: 116460,
    orbitalPeriod: 10759,
    gravity: 10.44,
    funFact: "Saturn's rings are made mostly of ice and rock particles."
  },
  {
    name: "Uranus",
    distanceFromSun: 2871,
    diameter: 50724,
    orbitalPeriod: 30687,
    gravity: 8.69,
    funFact: "Uranus rotates sideways, like a rolling ball."
  },
  {
    name: "Neptune",
    distanceFromSun: 4497,
    diameter: 49244,
    orbitalPeriod: 60190,
    gravity: 11.15,
    funFact: "Neptune has the strongest winds in the solar system, reaching up to 2,100 km/h."
  }
];

// Spacecraft speeds in km/s
const spacecraftSpeeds = {
  "Apollo": 11, // ~40,000 km/h
  "New Horizons": 16.26, // ~58,536 km/h
  "Parker Solar Probe": 192, // ~690,000 km/h
  "Voyager 1": 17, // ~61,200 km/h
  "Juno": 10 // ~36,000 km/h
};

type Difficulty = 'easy' | 'medium' | 'hard';

export default function SpaceMathPage() {
  const [selectedPlanets, setSelectedPlanets] = useState<string[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [score, setScore] = useState<{correct: number, total: number}>({correct: 0, total: 0});
  const [activeSection, setActiveSection] = useState<'distances' | 'sizes' | 'mission'>('distances');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [missionFuel, setMissionFuel] = useState<number>(1000);
  const [missionDistance, setMissionDistance] = useState<number>(0);
  const [explanation, setExplanation] = useState<string>("");

  useEffect(() => {
    generateQuestion();
  }, [activeSection, difficulty]);

  const generateQuestion = () => {
    setUserAnswer("");
    setShowFeedback(false);
    
    if (activeSection === 'distances') {
      generateDistanceQuestion();
    } else if (activeSection === 'sizes') {
      generateSizeQuestion();
    } else {
      generateMissionQuestion();
    }
  };

  const generateDistanceQuestion = () => {
    // Randomly select planets based on difficulty
    const availablePlanets = [...planets];
    const planet1Index = Math.floor(Math.random() * availablePlanets.length);
    const planet1 = availablePlanets[planet1Index];
    availablePlanets.splice(planet1Index, 1);
    
    const planet2Index = Math.floor(Math.random() * availablePlanets.length);
    const planet2 = availablePlanets[planet2Index];
    
    setSelectedPlanets([planet1.name, planet2.name]);
    
    // Calculate the distance between planets (simplified as difference in distance from Sun)
    const distance = Math.abs(planet1.distanceFromSun - planet2.distanceFromSun);
    
    if (difficulty === 'easy') {
      // Simple distance calculation
      setAnswer(distance);
      setQuestion(`How many million kilometers is ${planet1.name} from ${planet2.name}?`);
      setExplanation(`To find the distance between planets, calculate the absolute difference between their distances from the Sun: |${planet1.distanceFromSun} - ${planet2.distanceFromSun}| = ${distance} million km.`);
    } 
    else if (difficulty === 'medium') {
      // Add time calculations
      const spacecraft = Object.keys(spacecraftSpeeds)[Math.floor(Math.random() * Object.keys(spacecraftSpeeds).length)];
      const speedKmS = spacecraftSpeeds[spacecraft as keyof typeof spacecraftSpeeds];
      
      // Convert distance to km and speed to km/h
      const distanceKm = distance * 1000000;
      const speedKmH = speedKmS * 3600;
      
      // Calculate travel time in hours
      const timeHours = Math.round(distanceKm / speedKmH);
      setAnswer(timeHours);
      
      setQuestion(`If a ${spacecraft} spacecraft traveling at ${speedKmH.toLocaleString()} km/h wants to travel from ${planet1.name} to ${planet2.name} (${distance} million km), approximately how many hours would the journey take?`);
      setExplanation(`First, convert the distance to kilometers: ${distance} million km = ${distance.toLocaleString()} × 1,000,000 = ${distanceKm.toLocaleString()} km. Then divide by the speed: ${distanceKm.toLocaleString()} km ÷ ${speedKmH.toLocaleString()} km/h = ${timeHours.toLocaleString()} hours.`);
    }
    else {
      // Hard: Complex multi-step problem
      const spacecraft = Object.keys(spacecraftSpeeds)[Math.floor(Math.random() * Object.keys(spacecraftSpeeds).length)];
      const speedKmS = spacecraftSpeeds[spacecraft as keyof typeof spacecraftSpeeds];
      
      // Convert distance to km and speed to km/day
      const distanceKm = distance * 1000000;
      const speedKmDay = speedKmS * 3600 * 24;
      
      // Calculate travel time in days
      const timeDays = Math.round(distanceKm / speedKmDay);
      
      // Calculate the position of the target planet after the journey
      // Based on orbital period
      const degreesPerDay = 360 / planet2.orbitalPeriod;
      const newPosition = Math.round(degreesPerDay * timeDays) % 360;
      
      setAnswer(newPosition);
      
      setQuestion(`A ${spacecraft} spacecraft leaves Earth to travel to ${planet2.name}, which is ${distance} million km away. The spacecraft travels at ${(speedKmS * 3600).toLocaleString()} km/h. ${planet2.name} orbits the Sun every ${planet2.orbitalPeriod} Earth days. If ${planet2.name} is at 0° in its orbit when the spacecraft launches, at approximately what degree position (0-359°) will ${planet2.name} be when the spacecraft arrives?`);
      setExplanation(`Step 1: Calculate travel time in days. Distance = ${distance} million km = ${distanceKm.toLocaleString()} km. Speed = ${(speedKmS * 3600).toLocaleString()} km/h = ${speedKmDay.toLocaleString()} km/day. Travel time = ${distanceKm.toLocaleString()} km ÷ ${speedKmDay.toLocaleString()} km/day = ${timeDays} days.
      
Step 2: Calculate how many degrees ${planet2.name} moves per day: 360° ÷ ${planet2.orbitalPeriod} days = ${degreesPerDay.toFixed(4)}° per day.

Step 3: Calculate total movement during journey: ${degreesPerDay.toFixed(4)}° per day × ${timeDays} days = ${(degreesPerDay * timeDays).toFixed(1)}°.

Step 4: Find the final position (0-359°): ${(degreesPerDay * timeDays).toFixed(1)}° % 360° = ${newPosition}°.`);
    }
  };
  
  const generateSizeQuestion = () => {
    // Get two random planets to compare
    const availablePlanets = [...planets];
    const planet1Index = Math.floor(Math.random() * availablePlanets.length);
    const planet1 = availablePlanets[planet1Index];
    availablePlanets.splice(planet1Index, 1);
    
    const planet2Index = Math.floor(Math.random() * availablePlanets.length);
    const planet2 = availablePlanets[planet2Index];
    
    setSelectedPlanets([planet1.name, planet2.name]);
    
    if (difficulty === 'easy') {
      // Calculate the difference in diameters
      const largerPlanet = planet1.diameter > planet2.diameter ? planet1 : planet2;
      const smallerPlanet = planet1.diameter > planet2.diameter ? planet2 : planet1;
      const diameterDifference = largerPlanet.diameter - smallerPlanet.diameter;
      
      setAnswer(diameterDifference);
      
      setQuestion(`How many kilometers larger is the diameter of ${largerPlanet.name} compared to ${smallerPlanet.name}?`);
      
      setExplanation(`To find the difference in diameter, subtract the smaller diameter from the larger one:
${largerPlanet.name}'s diameter: ${largerPlanet.diameter.toLocaleString()} km
${smallerPlanet.name}'s diameter: ${smallerPlanet.diameter.toLocaleString()} km

${largerPlanet.diameter.toLocaleString()} km - ${smallerPlanet.diameter.toLocaleString()} km = ${diameterDifference.toLocaleString()} km`);
    } 
    else if (difficulty === 'medium') {
      // Calculate how many times one planet's diameter fits into another
      const largerPlanet = planet1.diameter > planet2.diameter ? planet1 : planet2;
      const smallerPlanet = planet1.diameter > planet2.diameter ? planet2 : planet1;
      
      // Calculate the ratio of diameters (rounded to nearest whole number)
      const diameterRatio = Math.round(largerPlanet.diameter / smallerPlanet.diameter);
      
      setAnswer(diameterRatio);
      
      setQuestion(`Approximately how many times larger is the diameter of ${largerPlanet.name} compared to ${smallerPlanet.name}? (Round to the nearest whole number)`);
      
      setExplanation(`To find how many times larger one planet is than another, divide their diameters:
${largerPlanet.name}'s diameter: ${largerPlanet.diameter.toLocaleString()} km
${smallerPlanet.name}'s diameter: ${smallerPlanet.diameter.toLocaleString()} km

${largerPlanet.diameter.toLocaleString()} km ÷ ${smallerPlanet.diameter.toLocaleString()} km = ${(largerPlanet.diameter / smallerPlanet.diameter).toFixed(2)}

Rounded to the nearest whole number: ${diameterRatio}`);
    }
    else {
      // Hard: Volume comparison
      const volume1 = (4/3) * Math.PI * Math.pow(planet1.diameter / 2, 3);
      const volume2 = (4/3) * Math.PI * Math.pow(planet2.diameter / 2, 3);
      
      // Always make planet1 the larger one for this calculation
      let largerPlanet, smallerPlanet, largerVolume, smallerVolume;
      if (volume1 > volume2) {
        largerPlanet = planet1;
        smallerPlanet = planet2;
        largerVolume = volume1;
        smallerVolume = volume2;
      } else {
        largerPlanet = planet2;
        smallerPlanet = planet1;
        largerVolume = volume2;
        smallerVolume = volume1;
      }
      
      // Volume ratio (approximate number of smaller planets that fit in larger)
      const volumeRatio = Math.round(largerVolume / smallerVolume);
      setAnswer(volumeRatio);
      
      setQuestion(`Approximately how many ${smallerPlanet.name}s could fit inside ${largerPlanet.name} by volume? (Round to the nearest whole number)`);
      
      setExplanation(`To find how many of one planet can fit inside another, we need to compare their volumes.

Step 1: Calculate the volume of each planet using the formula V = (4/3)πr³, where r is the radius (diameter ÷ 2).
${largerPlanet.name}'s radius = ${(largerPlanet.diameter / 2).toLocaleString()} km
${smallerPlanet.name}'s radius = ${(smallerPlanet.diameter / 2).toLocaleString()} km

Step 2: Calculate each planet's volume:
${largerPlanet.name}'s volume = (4/3)π × ${(largerPlanet.diameter / 2).toLocaleString()}³ = ${Math.round(largerVolume).toLocaleString()} km³
${smallerPlanet.name}'s volume = (4/3)π × ${(smallerPlanet.diameter / 2).toLocaleString()}³ = ${Math.round(smallerVolume).toLocaleString()} km³

Step 3: Divide the larger volume by the smaller volume:
${Math.round(largerVolume).toLocaleString()} km³ ÷ ${Math.round(smallerVolume).toLocaleString()} km³ ≈ ${volumeRatio.toLocaleString()}

Therefore, about ${volumeRatio.toLocaleString()} ${smallerPlanet.name}s could fit inside ${largerPlanet.name}.`);
    }
  };

  const generateMissionQuestion = () => {
    // Select a random planet as the destination
    const planet = planets[Math.floor(Math.random() * planets.length)];
    const spacecraft = Object.keys(spacecraftSpeeds)[Math.floor(Math.random() * Object.keys(spacecraftSpeeds).length)];
    const speedKmS = spacecraftSpeeds[spacecraft as keyof typeof spacecraftSpeeds];
    
    // Set Earth and the selected planet as the two planets for this question
    setSelectedPlanets(["Earth", planet.name]);
    
    if (difficulty === 'easy') {
      // Basic fuel consumption calculation
      const distance = Math.abs(planet.distanceFromSun - 150); // Earth is 150 million km from Sun
      const fuelPerMillion = Math.floor(Math.random() * 50) + 100; // 100-150 units of fuel per million km
      const totalFuel = distance * fuelPerMillion;
      
      setAnswer(totalFuel);
      
      setQuestion(`A ${spacecraft} spacecraft uses ${fuelPerMillion} units of fuel for every million kilometers traveled. How much total fuel is needed to travel from Earth to ${planet.name}, which is ${distance} million kilometers away?`);
      setExplanation(`To calculate the total fuel needed: fuel per million km × distance = ${fuelPerMillion} × ${distance} million km = ${totalFuel} units of fuel.`);
    } 
    else if (difficulty === 'medium') {
      // Fuel consumption with variable rates
      const distance = Math.abs(planet.distanceFromSun - 150); // Earth is 150 million km from Sun
      const initialFuelRate = Math.floor(Math.random() * 30) + 120; // 120-150 units per million km initially
      const midJourneyRate = Math.floor(Math.random() * 20) + 70; // 70-90 units per million km in middle
      
      // Calculate fuel for different parts of the journey
      const firstHalf = Math.ceil(distance / 2);
      const secondHalf = distance - firstHalf;
      
      const totalFuel = (firstHalf * initialFuelRate) + (secondHalf * midJourneyRate);
      setAnswer(totalFuel);
      
      setQuestion(`A ${spacecraft} mission to ${planet.name} (${distance} million km from Earth) uses ${initialFuelRate} units of fuel per million kilometers for the first half of the journey, then ${midJourneyRate} units per million kilometers for the second half due to reduced payload. How much total fuel is needed?`);
      setExplanation(`First half distance = ${firstHalf} million km
Fuel for first half = ${firstHalf} million km × ${initialFuelRate} units/million km = ${firstHalf * initialFuelRate} units
      
Second half distance = ${secondHalf} million km
Fuel for second half = ${secondHalf} million km × ${midJourneyRate} units/million km = ${secondHalf * midJourneyRate} units
      
Total fuel = ${firstHalf * initialFuelRate} + ${secondHalf * midJourneyRate} = ${totalFuel} units`);
    }
    else {
      // Hard: Complex fuel, time and resource calculation with constraints
      const distance = Math.abs(planet.distanceFromSun - 150); // Earth is 150 million km from Sun
      const distanceKm = distance * 1000000;
      const speedKmH = speedKmS * 3600;
      
      // Calculate travel time in days
      const timeHours = Math.round(distanceKm / speedKmH);
      const timeDays = Math.ceil(timeHours / 24);
      
      // Calculate resources needed per astronaut
      const crew = Math.floor(Math.random() * 4) + 2; // 2-5 crew members
      const waterPerDay = 3; // 3 liters per person per day
      const oxygenPerDay = 0.84; // 0.84 kg per person per day
      const foodPerDay = 1.8; // 1.8 kg per person per day
      
      // Calculate total required resources
      const totalWater = Math.ceil(crew * waterPerDay * timeDays);
      const totalOxygen = Math.ceil(crew * oxygenPerDay * timeDays);
      const totalFood = Math.ceil(crew * foodPerDay * timeDays);
      
      // Calculate fuel needed based on payload (resources + spacecraft weight)
      const spacecraftWeight = Math.floor(Math.random() * 5000) + 10000; // 10-15 tons
      const resourceWeight = totalWater + totalOxygen + totalFood;
      const fuelFactor = 0.7; // 0.7 units of fuel per kg per million km
      
      const totalFuel = Math.round((spacecraftWeight + resourceWeight) * fuelFactor * distance);
      setAnswer(totalFuel);
      
      setQuestion(`A ${spacecraft} mission to ${planet.name} carries ${crew} astronauts and takes approximately ${timeDays} days. Each astronaut needs ${waterPerDay} liters of water, ${oxygenPerDay} kg of oxygen, and ${foodPerDay} kg of food per day. The empty spacecraft weighs ${spacecraftWeight.toLocaleString()} kg, and the mission uses ${fuelFactor} units of fuel per kg of payload per million kilometers traveled. How many total units of fuel are required?`);
      setExplanation(`Step 1: Calculate total resources needed:
Water: ${crew} crew × ${waterPerDay} liters/day × ${timeDays} days = ${totalWater} liters
Oxygen: ${crew} crew × ${oxygenPerDay} kg/day × ${timeDays} days = ${totalOxygen} kg
Food: ${crew} crew × ${foodPerDay} kg/day × ${timeDays} days = ${totalFood} kg
Total resources weight = ${totalWater} + ${totalOxygen} + ${totalFood} = ${resourceWeight} kg

Step 2: Calculate total weight:
Total payload = Spacecraft (${spacecraftWeight.toLocaleString()} kg) + Resources (${resourceWeight} kg) = ${(spacecraftWeight + resourceWeight).toLocaleString()} kg

Step 3: Calculate fuel:
Fuel = Payload (${(spacecraftWeight + resourceWeight).toLocaleString()} kg) × Fuel factor (${fuelFactor}) × Distance (${distance} million km) = ${totalFuel.toLocaleString()} units`);
    }
  };
  
  const checkAnswer = () => {
    if (!userAnswer) return;
    
    const numericAnswer = parseInt(userAnswer);
    const isCorrect = answer === numericAnswer;
    
    setFeedback(isCorrect 
      ? `Correct! ${explanation}`
      : `Not quite. The answer is ${answer}. ${explanation}`
    );
    
    setShowFeedback(true);
    setScore({
      correct: isCorrect ? score.correct + 1 : score.correct,
      total: score.total + 1
    });
    
    // Clear input after a short delay for feedback
    setTimeout(() => {
      setUserAnswer("");
    }, 1500);
  };
  
  return (
    <div className="p-8">
      <header className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg p-6 border border-blue-200 dark:border-blue-800/60">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center mr-4 text-white text-2xl">
              🚀
            </div>
            <div>
              <h1 className="text-3xl font-bold text-indigo-800 dark:text-indigo-300">Space Math Adventure</h1>
              <p className="text-gray-700 dark:text-gray-300">
                Explore the solar system while practicing your math skills!
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <button 
          onClick={() => setActiveSection('distances')}
          className={`rounded-lg p-6 transition-all ${
            activeSection === 'distances' 
              ? 'bg-blue-600 text-white shadow-lg scale-105 transform' 
              : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700'
          }`}
        >
          <div className="flex items-center mb-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              activeSection === 'distances' ? 'bg-white text-blue-600' : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
            }`}>
              📏
            </div>
            <h2 className="text-xl font-bold">Planet Distances</h2>
          </div>
          <p className={activeSection === 'distances' ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}>
            Calculate how far planets are from each other
          </p>
        </button>

        <button 
          onClick={() => setActiveSection('sizes')}
          className={`rounded-lg p-6 transition-all ${
            activeSection === 'sizes' 
              ? 'bg-purple-600 text-white shadow-lg scale-105 transform' 
              : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-gray-700'
          }`}
        >
          <div className="flex items-center mb-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              activeSection === 'sizes' ? 'bg-white text-purple-600' : 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'
            }`}>
              ⚖️
            </div>
            <h2 className="text-xl font-bold">Planet Sizes</h2>
          </div>
          <p className={activeSection === 'sizes' ? 'text-purple-100' : 'text-gray-600 dark:text-gray-400'}>
            Compare planet sizes using multiplication
          </p>
        </button>

        <button 
          onClick={() => setActiveSection('mission')}
          className={`rounded-lg p-6 transition-all ${
            activeSection === 'mission' 
              ? 'bg-green-600 text-white shadow-lg scale-105 transform' 
              : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-gray-700'
          }`}
        >
          <div className="flex items-center mb-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              activeSection === 'mission' ? 'bg-white text-green-600' : 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
            }`}>
              🔋
            </div>
            <h2 className="text-xl font-bold">Mission Planning</h2>
          </div>
          <p className={activeSection === 'mission' ? 'text-green-100' : 'text-gray-600 dark:text-gray-400'}>
            Calculate fuel needed for space missions
          </p>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {activeSection === 'distances' && 'Planet Distance Challenge'}
            {activeSection === 'sizes' && 'Planet Size Comparison'}
            {activeSection === 'mission' && 'Space Mission Calculator'}
          </h2>
          <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
            Score: {score.correct}/{score.total}
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg p-6 mb-6">
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">{question}</p>
          
          {/* Show planet images or visuals based on selected planets */}
          <div className="flex flex-wrap gap-4 justify-center my-4">
            {selectedPlanets.map((planet, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-2xl mb-2">
                  {planet.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{planet}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center mb-6">
          <input
            type="number"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Enter your answer"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && userAnswer && checkAnswer()}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-4 py-2 rounded-r-md font-medium disabled:opacity-50"
            onClick={checkAnswer}
            disabled={!userAnswer}
          >
            Check Answer
          </button>
        </div>

        {showFeedback && (
          <div className={`p-4 rounded-md ${feedback.includes("Correct") ? "bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200" : "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200"}`}>
            {feedback}
          </div>
        )}

        <div className="mt-4 text-center">
          <button
            className="bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/40 dark:hover:bg-indigo-800/40 text-indigo-800 dark:text-indigo-200 px-4 py-2 rounded-md font-medium"
            onClick={generateQuestion}
          >
            New Question
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Space Facts</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          As you explore space with math, here are some amazing facts about our solar system:
        </p>
        <ul className="space-y-3">
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span className="text-gray-700 dark:text-gray-300">Light from the Sun takes about 8 minutes to reach Earth, traveling at 299,792 kilometers per second.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span className="text-gray-700 dark:text-gray-300">You could fit about 1.3 million Earths inside the Sun!</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span className="text-gray-700 dark:text-gray-300">The Great Red Spot on Jupiter is a massive storm that has been raging for at least 400 years.</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span className="text-gray-700 dark:text-gray-300">Scientists use mathematics every day to calculate spacecraft trajectories, predict planet movements, and understand the universe.</span>
          </li>
        </ul>
      </div>

      <div className="mt-8 text-center">
        <Link 
          href="/education/stem-connections" 
          className="inline-block bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md transition-colors"
        >
          Back to STEM Connections
        </Link>
      </div>
    </div>
  );
}