export const taskPriority = ["undefined" , "low", "medium", "high"] as const

export interface TaskDetails {
  title: string;
  description: string;
  priority?: typeof taskPriority[number];
  id: string;
}