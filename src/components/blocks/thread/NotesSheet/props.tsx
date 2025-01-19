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
  iconColor?: string;
}

export const noteTile: NoteTile[] = [
  {
    id: "view-profile",
    icon: User2,
    label: "View profile Elo cwelo 23123 asd as",
    description: "Check your personal information and settings",
    iconColor: "#B8C1EC"
  },
  {
    id: "track-disease",
    icon: Stethoscope,
    label: "Track disease",
    description: "Monitor and track your health conditions",
    iconColor: "#FFB3B3"
  },
  {
    id: "go-doctors",
    icon: Activity,
    label: "Go doctors",
    description: "Find and connect with healthcare professionals",
    iconColor: "#95E1D3"
  },
  {
    id: "appointment",
    icon: Calendar,
    label: "Appointment",
    description: "Schedule and manage your medical appointments",
    iconColor: "#F4D03F"
  },
  {
    id: "learning",
    icon: ScrollText,
    label: "Learning",
    description: "Access educational resources and materials",
    iconColor: "#A8E6CF"
  },
  {
    id: "quiz",
    icon: ScrollText,
    label: "Quiz",
    description: "Test your knowledge and understanding",
    iconColor: "#DCD6F7"
  },
  {
    id: "messages",
    icon: MessageSquare,
    label: "Messages",
    description: "Communicate with your healthcare team",
    iconColor: "#FFB5E8"
  },
  {
    id: "faq",
    icon: FileQuestion,
    label: "FAQ",
    description: "Find answers to common questions",
    iconColor: "#BFCBA8"
  },
  {
    id: "view-profile-2",
    icon: User2,
    label: "View profile",
    description: "Check your personal information and settings",
    iconColor: "#B8C1EC"
  },
  {
    id: "track-disease-2",
    icon: Stethoscope,
    label: "Track disease",
    description: "Monitor and track your health conditions",
    iconColor: "#FFB3B3"
  },
  {
    id: "go-doctors-2",
    icon: Activity,
    label: "Go doctors",
    description: "Find and connect with healthcare professionals",
    iconColor: "#95E1D3"
  },
  {
    id: "appointment-2",
    icon: Calendar,
    label: "Appointment",
    description: "Schedule and manage your medical appointments",
    iconColor: "#F4D03F"
  },
  {
    id: "learning-2",
    icon: ScrollText,
    label: "Learning",
    description: "Access educational resources and materials",
    iconColor: "#A8E6CF"
  },
  {
    id: "quiz-2",
    icon: ScrollText,
    label: "Quiz",
    description: "Test your knowledge and understanding",
    iconColor: "#DCD6F7"
  },
  {
    id: "messages-2",
    icon: MessageSquare,
    label: "Messages",
    description: "Communicate with your healthcare team",
    iconColor: "#FFB5E8"
  },
  {
    id: "faq-2",
    icon: FileQuestion,
    label: "FAQ",
    description: "Find answers to common questions",
    iconColor: "#BFCBA8"
  },
  {
    id: "view-profile-3",
    icon: User2,
    label: "View profile",
    description: "Check your personal information and settings",
    iconColor: "#B8C1EC"
  },
  {
    id: "track-disease-3",
    icon: Stethoscope,
    label: "Track disease",
    description: "Monitor and track your health conditions",
    iconColor: "#FFB3B3"
  },
];
