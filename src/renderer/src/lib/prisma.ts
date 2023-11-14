import { PrismaClient } from '@prisma/client'

const { prisma } = (window.api as { prisma: PrismaClient }) || {}

export { prisma }
