import { DayInfo, ActivityQuestion } from "./types";

export const daysData: DayInfo[] = [
  {
    name: "monday",
    displayName: "Monday",
    deity: "Moon (Luna)",
    element: "Water",
    energy: "Receptive",
    color: "Silver",
    idealActivities: ["reflective", "spiritual", "creative"],
    description: "Monday is governed by the Moon, making it ideal for intuition, emotions, and new beginnings. It's a day for reflection and planning."
  },
  {
    name: "tuesday",
    displayName: "Tuesday",
    deity: "Mars (Tyr)",
    element: "Fire",
    energy: "Active",
    color: "Red",
    idealActivities: ["leadership", "analytical"],
    description: "Tuesday is ruled by Mars, the god of war, making it powerful for assertive action, courage, and physical energy."
  },
  {
    name: "wednesday",
    displayName: "Wednesday",
    deity: "Mercury (Woden)",
    element: "Air",
    energy: "Active",
    color: "Purple",
    idealActivities: ["communicative", "analytical"],
    description: "Wednesday is Mercury's day, perfect for communication, intellect, and travel. It's ideal for writing, teaching, and learning."
  },
  {
    name: "thursday",
    displayName: "Thursday",
    deity: "Jupiter (Thor)",
    element: "Air",
    energy: "Active",
    color: "Blue",
    idealActivities: ["leadership", "spiritual"],
    description: "Thursday is Jupiter's day, associated with expansion, abundance, and good fortune. It's excellent for growth and prosperity."
  },
  {
    name: "friday",
    displayName: "Friday",
    deity: "Venus (Freya)",
    element: "Earth/Water",
    energy: "Receptive",
    color: "Green",
    idealActivities: ["love", "creative"],
    description: "Friday belongs to Venus, goddess of love and beauty. It's perfect for relationships, art, and pleasure."
  },
  {
    name: "saturday",
    displayName: "Saturday",
    deity: "Saturn",
    element: "Earth",
    energy: "Receptive",
    color: "Black",
    idealActivities: ["reflective", "analytical"],
    description: "Saturday is Saturn's day, ideal for boundaries, discipline, and completion. It's good for cleaning, organizing, and finishing tasks."
  },
  {
    name: "sunday",
    displayName: "Sunday",
    deity: "Sun",
    element: "Fire",
    energy: "Active",
    color: "Gold",
    idealActivities: ["spiritual", "leadership", "creative"],
    description: "Sunday is ruled by the Sun, making it perfect for vitality, success, and spiritual enlightenment. It's a day of power and renewal."
  }
];

export const activityQuestions: ActivityQuestion[] = [
  {
    id: "q1",
    text: "When do you prefer to brainstorm new ideas or work on artistic projects?",
    activityType: "creative"
  },
  {
    id: "q2",
    text: "When do you feel most effective at solving complex problems or analyzing data?",
    activityType: "analytical"
  },
  {
    id: "q3",
    text: "When do you prefer to have important conversations or give presentations?",
    activityType: "communicative"
  },
  {
    id: "q4",
    text: "When do you feel most confident making decisions or leading others?",
    activityType: "leadership"
  },
  {
    id: "q5",
    text: "When do you prefer to focus on relationships or romantic activities?",
    activityType: "love"
  },
  {
    id: "q6",
    text: "When do you best connect with your inner thoughts or practice mindfulness?",
    activityType: "reflective"
  },
  {
    id: "q7",
    text: "When do you feel most connected to your spiritual practice or higher purpose?",
    activityType: "spiritual"
  },
  {
    id: "q8",
    text: "When do you feel most energized and productive for creative work?",
    activityType: "creative"
  },
  {
    id: "q9",
    text: "When do you prefer to organize your life or plan your schedule?",
    activityType: "analytical"
  },
  {
    id: "q10",
    text: "When do you feel most articulate and clear in your communication?",
    activityType: "communicative"
  }
];

export function generateEighthDayMoments(dayPreferences: string[], activityTypes: string[]): string[] {
  const moments = [
    "Those quiet moments on Monday evenings when your creativity aligns with lunar energy",
    "The brief window on Tuesday mornings when Mars empowers your analytical thinking",
    "Wednesday afternoons when Mercury heightens your communication abilities",
    "Thursday mornings when Jupiter expands your leadership potential",
    "Friday evenings when Venus enhances your connections with others",
    "Saturday mornings when Saturn focuses your reflective practice",
    "Sunday afternoons when solar energy illuminates your spiritual insights"
  ];

  const topDay = dayPreferences[0];
  const secondDay = dayPreferences[1];
  const topActivity = activityTypes[0];

  const personalizedMoments = [
    `The transition between ${topDay} and ${secondDay} when you can harness both energies`,
    `The first hour after waking on ${topDay} when your ${topActivity} abilities are heightened`,
    `The 20 minutes before sunset on ${secondDay} when cosmic energies shift in your favor`
  ];

  return [...moments.slice(0, 4), ...personalizedMoments];
}
