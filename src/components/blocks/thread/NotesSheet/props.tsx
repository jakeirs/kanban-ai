import {
  Activity,
  Calendar,
  FileQuestion,
  MessageSquare,
  ScrollText,
  Stethoscope,
  User2,
  LucideIcon,
} from "lucide-react";

interface NoteTile {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
}

export const noteTile: NoteTile[] = [
  {
    id: "view-profile",
    icon: User2,
    label: "View profile",
    description: "Check your personal information and settings",
  },
  {
    id: "track-disease",
    icon: Stethoscope,
    label: "Track disease",
    description: "Monitor and track your health conditions",
  },
  {
    id: "go-doctors",
    icon: Activity,
    label: "Go doctors",
    description: "Find and connect with healthcare professionals",
  },
  {
    id: "appointment",
    icon: Calendar,
    label: "Appointment",
    description: "Schedule and manage your medical appointments",
  },
  {
    id: "learning",
    icon: ScrollText,
    label: "Learning",
    description: "Access educational resources and materials",
  },
  {
    id: "quiz",
    icon: ScrollText,
    label: "Quiz",
    description: "Test your knowledge and understanding",
  },
  {
    id: "messages",
    icon: MessageSquare,
    label: "Messages",
    description: "Communicate with your healthcare team",
  },
  {
    id: "faq",
    icon: FileQuestion,
    label: "FAQ",
    description: "Find answers to common questions",
  },
  {
    id: "view-profile-2",
    icon: User2,
    label: "View profile",
    description: "Check your personal information and settings",
  },
  {
    id: "track-disease-2",
    icon: Stethoscope,
    label: "Track disease",
    description: "Monitor and track your health conditions",
  },
  {
    id: "go-doctors-2",
    icon: Activity,
    label: "Go doctors",
    description: "Find and connect with healthcare professionals",
  },
  {
    id: "appointment-2",
    icon: Calendar,
    label: "Appointment",
    description: "Schedule and manage your medical appointments",
  },
  {
    id: "learning-2",
    icon: ScrollText,
    label: "Learning",
    description: "Access educational resources and materials",
  },
  {
    id: "quiz-2",
    icon: ScrollText,
    label: "Quiz",
    description: "Test your knowledge and understanding",
  },
  {
    id: "messages-2",
    icon: MessageSquare,
    label: "Messages",
    description: "Communicate with your healthcare team",
  },
  {
    id: "faq-2",
    icon: FileQuestion,
    label: "FAQ",
    description: "Find answers to common questions",
  },
  {
    id: "view-profile-3",
    icon: User2,
    label: "View profile",
    description: "Check your personal information and settings",
  },
  {
    id: "track-disease-3",
    icon: Stethoscope,
    label: "Track disease",
    description: "Monitor and track your health conditions",
  },
];
