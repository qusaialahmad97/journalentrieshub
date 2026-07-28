import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { urlList } = await request.json();
  
  const host = "www.journalentrieshub.com";
  const key = "4d8f744578304d62ad522c880425bfb3"; // Replace with your actual key
  const searchEngine = "api.indexnow.org";

  try {
    const response = await fetch(`https://${searchEngine}/indexnow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host: host,
        key: key,
        urlList: urlList,
      }),
    });

    if (response.status === 200) {
      return NextResponse.json({ message: "URLs submitted successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Submission failed", status: response.status }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}