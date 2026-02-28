import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = "MSDI Product Algérie | L'Excellence Made in Algeria";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#FAF8F5',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '80px',
                }}
            >
                <div style={{ display: 'flex', color: '#A31D33', fontSize: 42, fontWeight: 'bold', letterSpacing: '0.2em', marginBottom: '30px', fontFamily: 'sans-serif' }}>
                    MSDI PRODUCT ALGÉRIE
                </div>
                <div
                    style={{
                        fontSize: 84,
                        fontWeight: 900,
                        color: '#1A1A1A',
                        textAlign: 'center',
                        lineHeight: 1.1,
                        marginBottom: '60px',
                        fontFamily: 'sans-serif',
                        letterSpacing: '-0.02em',
                    }}
                >
                    L'EXCELLENCE ABSOLUE EN<br />COSMÉTIQUE ET SOINS.
                </div>
                <div
                    style={{
                        background: '#A31D33',
                        color: '#FAF8F5',
                        padding: '24px 64px',
                        borderRadius: '999px',
                        fontSize: 36,
                        fontWeight: 'bold',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontFamily: 'sans-serif',
                        boxShadow: '0 10px 25px rgba(163, 29, 51, 0.4)',
                    }}
                >
                    Découvrir la collection
                </div>
            </div>
        ),
        { ...size }
    );
}
