import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    const response = await axios.get('https://www.okx.com/api/v5/market/candles', {
      params: {
        instId: 'PI-USDT',
        bar: '1m',
        limit: 30
      }
    });

    const candles = response.data.data.map((entry: any) => ({
      date: new Date(parseInt(entry[0])).toLocaleTimeString(),
      price: parseFloat(entry[4])
    }));

    return NextResponse.json(candles);
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu từ OKX API:', error);
    return NextResponse.json({ error: 'Không thể lấy dữ liệu từ OKX API' }, { status: 500 });
  }
}
