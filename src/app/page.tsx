import GameCanvas from "@/components/GameCanvas";
import Script from 'next/script';

export default function Home() {
    // JSON-LD 구조화된 데이터
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: '네온 벽돌깨기 게임',
        alternateName: 'Neon Brick Breaker',
        description: '무료 온라인 벽돌깨기 게임! 네온 스타일의 아케이드 게임으로 돌, 가위, 보 시스템과 무한 모드를 즐겨보세요.',
        url: 'https://main.d3rrxbuh5uruzn.amplifyapp.com',
        applicationCategory: 'Game',
        genre: ['Arcade', 'Puzzle', 'Action'],
        operatingSystem: 'Any (Web Browser)',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'KRW',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '100',
        },
        author: {
            '@type': 'Person',
            name: 'Siyeon Lee',
        },
        keywords: '벽돌깨기, 벽돌게임, 브릭브레이커, brick breaker, 무료게임, 온라인게임, 아케이드게임',
        inLanguage: 'ko-KR',
        isAccessibleForFree: true,
    };

    return (
        <>
            {/* JSON-LD 구조화된 데이터 */}
            <Script
                id="json-ld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <main>
                <GameCanvas />
            </main>
        </>
    );
}
