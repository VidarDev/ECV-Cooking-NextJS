import { NextResponse } from 'next/server'

import { getApiConfig } from '@/utils/config'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const slug = (await params).slug
  const { headers, revalidate } = getApiConfig()

  try {
    const res = await fetch(`${process.env.API_URL}/api/recipes/${slug}`, {
      method: 'GET',
      headers,
      next: { revalidate },
    })
    if (!res.ok) throw new Error(`Error: ${res.status}`)
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
