import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
  }).index("by_email", ["email"]),

  sessions: defineTable({
    userId: v.id("users"),
    sessionId: v.string(),
    deviceInfo: v.optional(v.string()),
    lastActivityAt: v.optional(v.number()),
    expiresAt: v.optional(v.number()),
    createdAt: v.optional(v.number()),
    passwordHash: v.optional(v.string()),
    salt: v.optional(v.string()),
    oAuthProviders: v.optional(
      v.object({
        googleId: v.optional(v.string()),
      })
    ),
  }),

  userAccountStatus: defineTable({
    userId: v.id("users"),
    createdAt: v.optional(v.number()),
    lastActivityAt: v.optional(v.number()),
    failedLoginAttemptsAt: v.optional(v.string()),
    lastFailedLoginAt: v.optional(v.string()),
    isBanned: v.optional(v.boolean()),
    isActiveNow: v.optional(v.boolean()),
    isEmailVerified: v.optional(v.boolean()),
  }),

  kanbanBoards: defineTable({
    userId: v.id("users"),
    name: v.string(),
    description: v.optional(v.string()),
    isPrivate: v.boolean(),
    columns: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        items: v.array(
          v.object({
            id: v.string(),
            title: v.string(),
            labels: v.optional(v.array(v.string())),
            hasDescription: v.optional(v.boolean()),
            dueDate: v.optional(v.number()),
            priority: v.optional(v.string()),
            createdAt: v.optional(v.string()),
            updatedAt: v.optional(v.string()),
            updatedBy: v.optional(v.string()),
          })
        ),
      })
    ),
    sharedWith: v.optional(v.array(v.id("users"))),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  // itemDescriptions: defineTable({
  //   itemId: v.string(),
  //   boardId: v.id("kanbanBoards"),
  //   description: v.string(),
  //   attachments: v.optional(v.array(v.string())),
  //   comments: v.optional(
  //     v.array(
  //       v.object({
  //         userId: v.id("users"),
  //         content: v.string(),
  //         createdAt: v.number(),
  //       })
  //     )
  //   ),
  // }).index("by_board", ["boardId"]),

  // userProfiles: defineTable({
  //   userId: v.id("users"),
  //   firstName: v.optional(v.string()),
  //   lastName: v.optional(v.string()),
  //   phoneNumber: v.optional(v.string()),
  //   timezone: v.optional(v.string()),
  //   language: v.optional(v.string()),
  //   bio: v.optional(v.string()),
  //   socialLinks: v.optional(
  //     v.object({
  //       linkedin: v.optional(v.string()),
  //       github: v.optional(v.string()),
  //       twitter: v.optional(v.string()),
  //     })
  //   ),
  // }).index("by_user", ["userId"]),

  // userPreferences: defineTable({
  //   userId: v.id("users"),
  //   theme: v.string(),
  //   notifications: v.object({
  //     email: v.boolean(),
  //     push: v.boolean(),
  //     desktop: v.boolean(),
  //   }),
  //   kanbanPreferences: v.object({
  //     defaultView: v.string(),
  //     compactView: v.boolean(),
  //     showLabels: v.boolean(),
  //     showDates: v.boolean(),
  //   }),
  //   accessibility: v.object({
  //     fontSize: v.number(),
  //     highContrast: v.boolean(),
  //     reduceMotion: v.boolean(),
  //   }),
  // }).index("by_user", ["userId"]),

  // userNotes: defineTable({
  //   userId: v.id("users"),
  //   notes: v.array(
  //     v.object({
  //       id: v.string(),
  //       title: v.string(),
  //       content: v.string(),
  //       tags: v.optional(v.array(v.string())),
  //       createdAt: v.number(),
  //       updatedAt: v.number(),
  //     })
  //   ),
  // }).index("by_user", ["userId"]),

  // workspaces: defineTable({
  //   name: v.string(),
  //   ownerId: v.id("users"),
  //   members: v.array(
  //     v.object({
  //       userId: v.id("users"),
  //       role: v.string(),
  //     })
  //   ),
  //   boards: v.array(v.id("kanbanBoards")),
  //   settings: v.object({
  //     allowGuestAccess: v.boolean(),
  //     defaultPermissions: v.string(),
  //   }),
  // }).index("by_owner", ["ownerId"]),

  // userActivities: defineTable({
  //   userId: v.id("users"),
  //   activities: v.array(
  //     v.object({
  //       type: v.string(),
  //       timestamp: v.number(),
  //       details: v.any(),
  //     })
  //   ),
  // }).index("by_user", ["userId"]),

  // userIntegrations: defineTable({
  //   userId: v.id("users"),
  //   integrations: v.object({
  //     github: v.optional(
  //       v.object({
  //         token: v.string(),
  //         repositories: v.array(v.string()),
  //       })
  //     ),
  //     slack: v.optional(
  //       v.object({
  //         workspaceId: v.string(),
  //         channels: v.array(v.string()),
  //       })
  //     ),
  //   }),
  // }).index("by_user", ["userId"]),

  // payments: defineTable({
  //   userId: v.id("users"),
  //   amount: v.number(),
  //   currency: v.string(),
  //   status: v.string(),
  //   provider: v.string(),
  //   subscriptionId: v.optional(v.string()),
  //   createdAt: v.number(),
  //   metadata: v.object({
  //     paymentMethod: v.string(),
  //     receiptUrl: v.optional(v.string()),
  //   }),
  // }).index("by_user", ["userId"]),

  // subscriptions: defineTable({
  //   userId: v.id("users"),
  //   plan: v.string(),
  //   status: v.string(),
  //   startDate: v.number(),
  //   endDate: v.number(),
  //   autoRenew: v.boolean(),
  //   price: v.number(),
  // }).index("by_user", ["userId"]),

  // notifications: defineTable({
  //   userId: v.id("users"),
  //   type: v.string(),
  //   title: v.string(),
  //   content: v.string(),
  //   isRead: v.boolean(),
  //   createdAt: v.number(),
  //   actionUrl: v.optional(v.string()),
  //   priority: v.string(),
  // }).index("by_user", ["userId"]),

  // achievements: defineTable({
  //   userId: v.id("users"),
  //   type: v.string(),
  //   level: v.number(),
  //   progress: v.number(),
  //   unlockedAt: v.optional(v.number()),
  //   rewards: v.optional(
  //     v.object({
  //       points: v.number(),
  //       badges: v.array(v.string()),
  //     })
  //   ),
  // }).index("by_user", ["userId"]),

  // userAnalytics: defineTable({
  //   userId: v.id("users"),
  //   dailyStats: v.object({
  //     tasksCompleted: v.number(),
  //     boardsCreated: v.number(),
  //     activeTime: v.number(),
  //   }),
  //   weeklyStreak: v.number(),
  //   productivityScore: v.number(),
  //   lastUpdated: v.number(),
  // }).index("by_user", ["userId"]),

  // suggestions: defineTable({
  //   userId: v.id("users"),
  //   type: v.string(),
  //   title: v.string(),
  //   description: v.string(),
  //   priority: v.number(),
  //   shown: v.boolean(),
  //   actedUpon: v.optional(v.boolean()),
  //   createdAt: v.number(),
  //   validUntil: v.number(),
  // }).index("by_user", ["userId"]),

  // marketingEngagement: defineTable({
  //   userId: v.id("users"),
  //   campaigns: v.array(
  //     v.object({
  //       campaignId: v.string(),
  //       status: v.string(),
  //       sentAt: v.number(),
  //       openedAt: v.optional(v.number()),
  //     })
  //   ),
  //   emailPreferences: v.object({
  //     newsletter: v.boolean(),
  //     productUpdates: v.boolean(),
  //     recommendations: v.boolean(),
  //   }),
  //   lastEngaged: v.number(),
  // }).index("by_user", ["userId"]),

  // userBehavior: defineTable({
  //   userId: v.id("users"),
  //   actions: v.array(
  //     v.object({
  //       type: v.string(),
  //       timestamp: v.number(),
  //       metadata: v.any(),
  //     })
  //   ),
  //   patterns: v.object({
  //     preferredTimes: v.array(v.number()),
  //     commonActions: v.array(v.string()),
  //     frequency: v.object({
  //       daily: v.number(),
  //       weekly: v.number(),
  //     }),
  //   }),
  // }).index("by_user", ["userId"]),

  // engagementTriggers: defineTable({
  //   userId: v.id("users"),
  //   triggers: v.array(
  //     v.object({
  //       type: v.string(),
  //       condition: v.any(),
  //       action: v.string(),
  //       lastTriggered: v.optional(v.number()),
  //       frequency: v.string(),
  //     })
  //   ),
  //   nextCheck: v.number(),
  // }).index("by_user", ["userId"]),
});
