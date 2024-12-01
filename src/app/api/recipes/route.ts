import { NextResponse } from 'next/server'

import { apiConfig } from '@/config/api'
import { API_URL } from '@/config/env'

export async function GET() {
  const { headers } = apiConfig()

  try {
    const res = await fetch(`${API_URL}/api/recipes`, {
      method: 'GET',
      headers,
    })
    if (!res.ok) throw new Error(`Failed to fetch recipes : ${res.status}`)
    const recipes = await res.json()
    return NextResponse.json(recipes)
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 },
    )
  }
}
