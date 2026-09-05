import { NextResponse } from 'next/server';
import { SAMPLE_UAP_MANIFEST } from '@/lib/agentic-protocols';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json(SAMPLE_UAP_MANIFEST, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
