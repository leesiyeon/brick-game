export default function About() {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-cyan-400">About Neon Brick Breaker</h1>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-400">게임 소개</h2>
                    <p className="mb-4 leading-relaxed">
                        Neon Brick Breaker는 클래식한 벽돌깨기 게임에 현대적인 네온 스타일과
                        독특한 게임 메커니즘을 더한 무료 온라인 아케이드 게임입니다.
                    </p>
                    <p className="mb-4 leading-relaxed">
                        80년대 레트로 아케이드 감성과 현대적인 게임 디자인이 만나
                        누구나 쉽게 즐길 수 있는 중독성 있는 게임 경험을 제공합니다.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-400">주요 특징</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start">
                            <span className="text-cyan-400 mr-2">🎮</span>
                            <div>
                                <strong className="text-pink-300">독특한 가위바위보 시스템</strong>
                                <p className="text-gray-300">돌, 가위, 보 아이템을 수집하여 공을 변신시키고 다양한 벽돌을 깨보세요</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="text-cyan-400 mr-2">🌟</span>
                            <div>
                                <strong className="text-pink-300">네온 아케이드 스타일</strong>
                                <p className="text-gray-300">화려한 네온 효과와 레트로 그리드 배경으로 시각적 즐거움 제공</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="text-cyan-400 mr-2">♾️</span>
                            <div>
                                <strong className="text-pink-300">무한 모드</strong>
                                <p className="text-gray-300">끝없이 내려오는 벽돌을 깨며 최고 점수에 도전하세요</p>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <span className="text-cyan-400 mr-2">🎯</span>
                            <div>
                                <strong className="text-pink-300">브라우저에서 바로 플레이</strong>
                                <p className="text-gray-300">별도의 설치 없이 웹 브라우저에서 즉시 게임을 즐길 수 있습니다</p>
                            </div>
                        </li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-400">게임 방법</h2>
                    <div className="bg-gray-800 p-6 rounded-lg space-y-3">
                        <p><strong className="text-cyan-300">조작법:</strong> 키보드 화살표 키 (← →)로 패들을 움직입니다</p>
                        <p><strong className="text-cyan-300">목표:</strong> 공을 튕겨서 모든 벽돌을 깨뜨리세요</p>
                        <p><strong className="text-cyan-300">아이템:</strong> 떨어지는 아이템을 받아 공을 변신시키세요</p>
                        <p><strong className="text-cyan-300">벽돌 종류:</strong></p>
                        <ul className="ml-6 space-y-1 text-gray-300">
                            <li>• 일반 벽돌 (네온 컬러) - 일반 공과 가위로 깰 수 있음</li>
                            <li>• 종이 벽돌 (흰색) - 가위로만 깰 수 있음</li>
                            <li>• 돌 벽돌 (갈색) - 바위로만 깰 수 있음</li>
                        </ul>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-400">개발자</h2>
                    <p className="mb-4">
                        Neon Brick Breaker는 Siyeon Lee가 Next.js와 HTML5 Canvas를 사용하여 개발했습니다.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-400">기술 스택</h2>
                    <div className="flex flex-wrap gap-3">
                        <span className="bg-gray-800 px-4 py-2 rounded">Next.js</span>
                        <span className="bg-gray-800 px-4 py-2 rounded">TypeScript</span>
                        <span className="bg-gray-800 px-4 py-2 rounded">HTML5 Canvas</span>
                        <span className="bg-gray-800 px-4 py-2 rounded">Tailwind CSS</span>
                    </div>
                </section>

                <div className="mt-12">
                    <a href="/" className="text-cyan-400 hover:text-cyan-300 underline text-lg">
                        ← 게임 시작하기
                    </a>
                </div>
            </div>
        </div>
    );
}
