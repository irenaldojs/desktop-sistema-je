import { ElectronAPI } from '@electron-toolkit/preload'
import { PrismaClient } from '@prisma/client'

declare global {
  interface Window {
    electron: ElectronAPI
    api: { prisma: PrismaClient }
  }
}
