import { NextResponse } from "next/server"
import data from "@/data/weapons/index.json"

export async function GET() {
  try {
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch weapons" },
      { status: 500 }
    )
  }
}