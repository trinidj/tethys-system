import { NextResponse } from "next/server"
import data from "@/data/resonators/index.json"

export async function GET() {
  try {
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch resonators" },
      { status: 500 }
    )
  }
}
