import { NextResponse } from 'next/server'

import { apiConfig } from '@/config/api'
import { API_URL } from '@/config/constants'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const slug = (await params).slug
  const { headers, revalidate } = apiConfig()

  try {
    const res = await fetch(`${API_URL}/api/recipes/${slug}`, {
      method: 'GET',
      headers,
      next: { revalidate },
    })
    if (!res.ok) throw new Error(`Failed to fetch recipe : ${res.status}`)
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
