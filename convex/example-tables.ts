// interface User {
//   _id: Id<"users">;
//   email: string;
//   name: string;
//   avatar?: string;
//   createdAt: number;
//   lastLogin: number;
// }

// // Szczegółowe dane osobiste
// interface UserProfile {
//   userId: Id<"users">;
//   firstName?: string;
//   lastName?: string;
//   phoneNumber?: string;
//   timezone?: string;
//   language?: string;
//   organization?: string;
//   position?: string;
//   bio?: string;
//   socialLinks?: {
//     linkedin?: string;
//     github?: string;
//     twitter?: string;
//   };
// }

// // Preferencje użytkownika
// interface UserPreferences {
//   userId: Id<"users">;
//   theme: "light" | "dark" | "system";
//   notifications: {
//     email: boolean;
//     push: boolean;
//     desktop: boolean;
//   };
//   kanbanPreferences: {
//     defaultView: "board" | "list";
//     compactView: boolean;
//     showLabels: boolean;
//     showDates: boolean;
//   };
//   accessibility: {
//     fontSize: number;
//     highContrast: boolean;
//     reduceMotion: boolean;
//   };
// }

// // Kanban Boardy użytkownika
// interface KanbanBoard {
//   userId: Id<"users">;
//   name: string;
//   description?: string;
//   isPrivate: boolean;
//   columns: Array<{
//     id: string;
//     name: string;
//     items: Array<{
//       id: string;
//       title: string;
//       labels: string[];
//       hasDescription: boolean;
//       dueDate?: number;
//       priority?: "low" | "medium" | "high";
//     }>;
//   }>;
//   sharedWith?: Id<"users">[];
//   createdAt: number;
//   updatedAt: number;
// }

// // Opisy itemów
// interface ItemDescriptions {
//   itemId: string;
//   boardId: Id<"kanbanBoards">;
//   description: string;
//   attachments?: string[];
//   comments?: Array<{
//     userId: Id<"users">;
//     content: string;
//     createdAt: number;
//   }>;
// }

// // Notatki użytkownika
// interface UserNotes {
//   userId: Id<"users">;
//   notes: Array<{
//     id: string;
//     title: string;
//     content: string;
//     tags?: string[];
//     createdAt: number;
//     updatedAt: number;
//   }>;
// }

// // Workspace (dla przyszłej rozbudowy)
// interface Workspace {
//   name: string;
//   ownerId: Id<"users">;
//   members: Array<{
//     userId: Id<"users">;
//     role: "admin" | "member" | "viewer";
//   }>;
//   boards: Id<"kanbanBoards">[];
//   settings: {
//     allowGuestAccess: boolean;
//     defaultPermissions: string;
//   };
// }

// // Aktywność użytkownika
// interface UserActivity {
//   userId: Id<"users">;
//   activities: Array<{
//     type: "board_created" | "item_moved" | "comment_added";
//     timestamp: number;
//     details: any;
//   }>;
// }

// // Integracje użytkownika
// interface UserIntegrations {
//   userId: Id<"users">;
//   integrations: {
//     github?: {
//       token: string;
//       repositories: string[];
//     };
//     slack?: {
//       workspaceId: string;
//       channels: string[];
//     };
//   };
// }

// // Płatności
// interface Payment {
//   _id: Id<"payments">;
//   userId: Id<"users">;
//   amount: number;
//   currency: string;
//   status: "pending" | "completed" | "failed";
//   provider: "stripe" | "paypal";
//   subscriptionId?: string;
//   createdAt: number;
//   metadata: {
//     paymentMethod: string;
//     receiptUrl?: string;
//   };
// }

// // Subskrypcje
// interface Subscription {
//   _id: Id<"subscriptions">;
//   userId: Id<"users">;
//   plan: "free" | "pro" | "enterprise";
//   status: "active" | "cancelled" | "expired";
//   startDate: number;
//   endDate: number;
//   autoRenew: boolean;
//   price: number;
// }

// // Powiadomienia
// interface Notification {
//   _id: Id<"notifications">;
//   userId: Id<"users">;
//   type: "task_due" | "mention" | "comment" | "subscription" | "achievement";
//   title: string;
//   content: string;
//   isRead: boolean;
//   createdAt: number;
//   actionUrl?: string;
//   priority: "low" | "medium" | "high";
// }

// // Osiągnięcia i Gamifikacja
// interface Achievement {
//   _id: Id<"achievements">;
//   userId: Id<"users">;
//   type: "tasks_completed" | "streak" | "collaboration";
//   level: number;
//   progress: number;
//   unlockedAt?: number;
//   rewards?: {
//     points: number;
//     badges: string[];
//   };
// }

// // User Analytics
// interface UserAnalytics {
//   _id: Id<"userAnalytics">;
//   userId: Id<"users">;
//   dailyStats: {
//     tasksCompleted: number;
//     boardsCreated: number;
//     activeTime: number;
//   };
//   weeklyStreak: number;
//   productivityScore: number;
//   lastUpdated: number;
// }

// // Auto-suggestions
// interface Suggestion {
//   _id: Id<"suggestions">;
//   userId: Id<"users">;
//   type: "task_optimization" | "workflow" | "collaboration";
//   title: string;
//   description: string;
//   priority: number;
//   shown: boolean;
//   actedUpon?: boolean;
//   createdAt: number;
//   validUntil: number;
// }

// // Marketing & Engagement
// interface MarketingEngagement {
//   _id: Id<"marketingEngagement">;
//   userId: Id<"users">;
//   campaigns: Array<{
//     campaignId: string;
//     status: "sent" | "opened" | "clicked";
//     sentAt: number;
//     openedAt?: number;
//   }>;
//   emailPreferences: {
//     newsletter: boolean;
//     productUpdates: boolean;
//     recommendations: boolean;
//   };
//   lastEngaged: number;
// }

// // User Behavior Tracking
// interface UserBehavior {
//   _id: Id<"userBehavior">;
//   userId: Id<"users">;
//   actions: Array<{
//     type: string;
//     timestamp: number;
//     metadata: any;
//   }>;
//   patterns: {
//     preferredTimes: number[];
//     commonActions: string[];
//     frequency: {
//       daily: number;
//       weekly: number;
//     };
//   };
// }

// // Engagement Triggers
// interface EngagementTrigger {
//   _id: Id<"engagementTriggers">;
//   userId: Id<"users">;
//   triggers: Array<{
//     type: "inactivity" | "achievement" | "milestone";
//     condition: any;
//     action: "notification" | "email" | "suggestion";
//     lastTriggered?: number;
//     frequency: "once" | "daily" | "weekly";
//   }>;
//   nextCheck: number;
// }
