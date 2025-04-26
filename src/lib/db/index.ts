import { prisma } from './prisma'

export * from './prisma'

// Activity related functions
export async function getActivities() {
  return prisma.activity.findMany({
    where: {
      isPublished: true
    },
    orderBy: {
      order: 'asc'
    },
    include: {
      features: true
    }
  })
}

export async function getActivityBySlug(slug: string) {
  return prisma.activity.findUnique({
    where: {
      slug
    },
    include: {
      features: true,
      exercises: {
        orderBy: {
          order: 'asc'
        }
      }
    }
  })
}

// User progress functions
export async function getUserActivityProgress(userId: string, activityId: string) {
  return prisma.userProgress.findUnique({
    where: {
      userId_activityId: {
        userId,
        activityId
      }
    }
  })
}

export async function updateUserActivityProgress(
  userId: string,
  activityId: string,
  completionPercentage: number
) {
  return prisma.userProgress.upsert({
    where: {
      userId_activityId: {
        userId,
        activityId
      }
    },
    update: {
      completionPercentage,
      lastAccessedAt: new Date()
    },
    create: {
      userId,
      activityId,
      completionPercentage,
    }
  })
}

// Exercise progress tracking
export async function updateExerciseProgress(
  userId: string,
  exerciseId: string,
  score: number,
  completed: boolean
) {
  return prisma.userExerciseProgress.upsert({
    where: {
      userId_exerciseId: {
        userId,
        exerciseId
      }
    },
    update: {
      score,
      completed,
      attempts: { increment: 1 },
      lastAttemptAt: new Date()
    },
    create: {
      userId,
      exerciseId,
      score,
      completed,
      attempts: 1,
      lastAttemptAt: new Date()
    }
  })
}

// Achievement functions
export async function checkAndAwardAchievements(userId: string) {
  // This would contain logic to check if a user qualifies for any achievements
  // and award them if they do
  // Implementation would depend on your specific achievement criteria
}