// User types and models
export enum UserRole {
  WORKER = "worker",
  HR_MANAGER = "hr_manager"
}

export enum ShiftType {
  LOCALIZED = "localized",
  URGENT_24H = "urgent_24h",
  URGENT_12H = "urgent_12h",
  GES_SANITARY = "ges_sanitary",
  PROGRAMMED = "programmed",
  TOP_PROGRAMMED = "top_programmed",
  GROUP_1_3 = "group_1_3"
}

export enum WorkdayType {
  FULL_TIME = "full_time",
  PART_TIME = "part_time",
  REDUCED = "reduced"
}

export enum WorkGroup {
  LOCALIZED = "localized", // Quincenas Naturales
  PROGRAMMED = "programmed", // Semanas naturales + bloque de 4 días
  URGENT_24H = "urgent_24h", // Tres bloques de guardias (2/3/2) o 32 días regulables
  URGENT_12H = "urgent_12h", // Quincenas Naturales
  GES_SANITARY = "ges_sanitary", // Tres bloques (10/10/12)
  TOP_PROGRAMMED = "top_programmed", // Semanas naturales + bloque de 4 días
  GROUP_1_3 = "group_1_3" // Quincenas Naturales
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  shift: ShiftType;
  workday: WorkdayType;
  department: string;
  workGroup: WorkGroup;
  seniority: number; // Years of seniority
}

// Request types and models
export enum RequestType {
  VACATION = "vacation",
  PERSONAL_DAY = "personal_day",
  LEAVE = "leave"
}

export enum RequestStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  MORE_INFO = "more_info"
}

export interface TimeOffRequest {
  id: string;
  userId: string;
  type: RequestType;
  startDate: Date;
  endDate: Date;
  reason?: string;
  status: RequestStatus;
  documentUrl?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Balance models
export interface UserBalance {
  userId: string;
  vacationDays: number;
  personalDays: number;
  leaveDays: number;
  updatedAt: Date;
}

// HR assistant models
export interface ConflictDetection {
  type: 'overlap' | 'too_many_requests' | 'accumulation' | 'limit_warning' | 'staff_shortage';
  message: string;
  severity: 'low' | 'medium' | 'high';
  suggestions?: string[];
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: {
    id: string;
    name: string;
  };
  receiver: {
    id: string;
    name: string;
  };
  timestamp: Date;
}
