"use server"
import path from "path"
import { promises as fs } from "fs"

export async function getComponentContent(filePath: string) {
    const fullPath = path.join(process.cwd(), filePath)
    return await fs.readFile(fullPath, 'utf-8')
  }