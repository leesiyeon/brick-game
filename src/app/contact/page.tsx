export default function Contact() {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-cyan-400">Contact Us</h1>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-400">문의하기</h2>
                    <p className="mb-6 leading-relaxed">
                        Neon Brick Breaker에 대한 문의사항, 버그 리포트, 제안사항이 있으시면
                        아래 연락처로 연락 주시기 바랍니다.
                    </p>
                </section>

                <section className="mb-8">
                    <div className="bg-gray-800 p-6 rounded-lg space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold text-pink-300 mb-2">이메일</h3>
                            <p className="text-gray-300">[이메일 주소를 입력하세요]</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-pink-300 mb-2">GitHub</h3>
                            <a
                                href="https://github.com/leesiyeon/brick-game"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-400 hover:text-cyan-300 underline"
                            >
                                github.com/leesiyeon/brick-game
                            </a>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-400">자주 묻는 질문</h2>
                    <div className="space-y-4">
                        <div className="bg-gray-800 p-4 rounded">
                            <h3 className="font-semibold text-cyan-300 mb-2">Q: 게임이 작동하지 않아요</h3>
                            <p className="text-gray-300">A: 최신 버전의 Chrome, Firefox, Safari, Edge 브라우저를 사용해주세요.
                                JavaScript가 활성화되어 있는지 확인해주세요.</p>
                        </div>

                        <div className="bg-gray-800 p-4 rounded">
                            <h3 className="font-semibold text-cyan-300 mb-2">Q: 모바일에서도 플레이할 수 있나요?</h3>
                            <p className="text-gray-300">A: 현재는 키보드 조작이 필요하므로 PC 환경에서 플레이하시는 것을 권장합니다.</p>
                        </div>

                        <div className="bg-gray-800 p-4 rounded">
                            <h3 className="font-semibold text-cyan-300 mb-2">Q: 게임 데이터가 저장되나요?</h3>
                            <p className="text-gray-300">A: 현재 버전에서는 게임 데이터가 저장되지 않습니다.
                                브라우저를 새로고침하면 게임이 초기화됩니다.</p>
                        </div>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-400">피드백</h2>
                    <p className="mb-4 leading-relaxed">
                        여러분의 소중한 피드백은 게임을 더 좋게 만드는 데 큰 도움이 됩니다.
                        버그를 발견하셨거나 새로운 기능을 제안하고 싶으시다면 언제든지 연락 주세요!
                    </p>
                </section>

                <div className="mt-12">
                    <a href="/" className="text-cyan-400 hover:text-cyan-300 underline text-lg">
                        ← 게임으로 돌아가기
                    </a>
                </div>
            </div>
        </div>
    );
}
