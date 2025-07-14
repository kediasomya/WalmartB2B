import { NextResponse } from 'next/server';

const mockBuyers = [
  {
    id: 'r1',
    business_name: 'Sunrise Restaurant',
    type: 'Restaurant',
    location: 'Downtown',
    gst_id: 'GSTIN1234',
  },
  {
    id: 'v1',
    business_name: 'FreshMart Vendor',
    type: 'Vendor',
    location: 'Uptown',
    gst_id: 'GSTIN5678',
  },
  {
    id: 'n1',
    business_name: 'Helping Hands NGO',
    type: 'NGO',
    location: 'Midtown',
    gst_id: 'GSTIN9101',
  },
];

export async function GET() {
  return NextResponse.json(mockBuyers);
} 