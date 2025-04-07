export type DayName = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export type ActivityType = 
  | 'creative' 
  | 'analytical' 
  | 'communicative' 
  | 'leadership' 
  | 'love' 
  | 'reflective' 
  | 'spiritual';

export type DayInfo = {
  name: DayName;
  displayName: string;
  deity: string;
  element: string;
  energy: string;
  color: string;
  idealActivities: ActivityType[];
  description: string;
};

export type ActivityQuestion = {
  id: string;
  text: string;
  activityType: ActivityType;
};

export type DayPreference = {
  day: DayName;
  score: number;
};

export type ActivityPreference = {
  type: ActivityType;
  score: number;
};

export type SurveyResults = {
  dayPreferences: DayPreference[];
  activityPreferences: ActivityPreference[];
  eighthDayMoments: string[];
};

export type SurveyFormData = {
  [key: string]: DayName;
};
