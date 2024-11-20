import { NextResponse } from 'next/server'

import { getApiConfig } from '@/utils/config'

export async function GET() {
  const { headers } = getApiConfig()

  try {
    const res = await fetch(`${process.env.API_URL}/api/recipes`, {
      method: 'GET',
      headers,
    })
    if (!res.ok) throw new Error(`Failed to fetch recipes : ${res.status}`)
    const recipes = await res.json()
    return NextResponse.json(recipes)
  } catch (error) {
    console.error('Error fetching recipe:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recipe' },
      { status: 500 },
    )
  }
}
