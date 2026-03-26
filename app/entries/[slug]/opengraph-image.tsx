import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import entries from "../../../data/entries.json";

interface JournalEntry {
  slug: string;
  title: string;
  category: string;
}

export const alt = 'Journal Entries Hub';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const entry = (entries as JournalEntry[]).find((e) => e.slug === resolvedParams.slug);

  // 1. Fetch logo and convert to a type Satori likes (ArrayBuffer)
  const logoPath = join(process.cwd(), 'public', 'journalentrieshublogo.png');
  const logoData = await readFile(logoPath);
  // Using as any here bypasses the strict React 'src' type check that caused your error
  const logoSrc: any = logoData.buffer;

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f172a', // Deep slate background
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Subtle Decorative Background Element (The "Expert" Touch) */}
        <div style={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: '200px',
          background: 'rgba(16, 185, 129, 0.05)',
          display: 'flex',
        }} />

        {/* Category Badge with Icon-like dot */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(16, 185, 129, 0.1)',
          padding: '10px 20px',
          borderRadius: '50px',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          marginBottom: '30px',
        }}>
          <div style={{ width: 10, height: 10, borderRadius: '5px', background: '#10b981', marginRight: '10px' }} />
          <span style={{
            color: '#10b981',
            fontSize: '22px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            {entry?.category || "Accounting"}
          </span>
        </div>

        {/* Main Title - Enhanced Typography */}
        <div style={{
          fontSize: '84px',
          fontWeight: '900',
          color: 'white',
          lineHeight: '1.1',
          marginBottom: '20px',
          maxWidth: '1000px',
          display: 'flex',
        }}>
          {entry?.title}
        </div>

        {/* Sub-text or Author proof */}
        <div style={{
          fontSize: '28px',
          color: '#94a3b8',
          marginBottom: '40px',
          display: 'flex',
        }}>
          Professional Journal Entry & IFRS Analysis
        </div>

        {/* Branding Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 'auto',
          width: '100%',
          paddingTop: '40px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}>
          {/* Logo with fixed type */}
          <img
            src={logoSrc}
            alt="Logo"
            width="60"
            height="60"
            style={{ marginRight: '20px', borderRadius: '12px' }}
          />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{
              fontSize: '32px',
              color: 'white',
              fontWeight: 'bold',
              display: 'flex',
            }}>
              Journal Entries <span style={{ color: '#10b981', marginLeft: '8px' }}>Hub</span>
            </div>
            <div style={{ fontSize: '18px', color: '#64748b' }}>
              Expertise by Qusai Ahmad
            </div>
          </div>

          <div style={{
            marginLeft: 'auto',
            fontSize: '22px',
            color: '#10b981',
            fontWeight: 'bold',
            display: 'flex',
          }}>
            journalentrieshub.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}