export default function Terms() {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-cyan-400">이용약관</h1>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-400">제1조 (목적)</h2>
                    <p className="mb-4">
                        본 약관은 Neon Brick Breaker(이하 "서비스")의 이용과 관련하여
                        서비스 제공자와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-400">제2조 (서비스의 제공)</h2>
                    <p className="mb-4">
                        본 서비스는 무료 온라인 벽돌깨기 게임을 제공합니다.
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다</li>
                        <li>서버 점검, 기술적 문제 등으로 서비스가 일시 중단될 수 있습니다</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-400">제3조 (이용자의 의무)</h2>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>이용자는 본 약관 및 관계 법령을 준수해야 합니다</li>
                        <li>서비스를 부정한 목적으로 이용해서는 안 됩니다</li>
                        <li>타인의 권리를 침해하거나 명예를 훼손하는 행위를 해서는 안 됩니다</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-400">제4조 (저작권)</h2>
                    <p className="mb-4">
                        서비스 내 모든 콘텐츠의 저작권은 서비스 제공자에게 있습니다.
                        이용자는 서비스를 이용함으로써 얻은 정보를 서비스 제공자의 사전 승낙 없이
                        복제, 송신, 출판, 배포, 방송 등 기타 방법에 의하여 영리 목적으로 이용하거나
                        제3자에게 이용하게 하여서는 안 됩니다.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-400">제5조 (면책조항)</h2>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>서비스 제공자는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 책임이 면제됩니다</li>
                        <li>서비스 제공자는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-400">제6조 (약관의 변경)</h2>
                    <p className="mb-4">
                        서비스 제공자는 필요한 경우 본 약관을 변경할 수 있으며,
                        변경된 약관은 서비스 화면에 공지함으로써 효력이 발생합니다.
                    </p>
                </section>

                <p className="mt-8 text-gray-400">시행일: 2025년 1월 1일</p>

                <div className="mt-12">
                    <a href="/" className="text-cyan-400 hover:text-cyan-300 underline">
                        ← 게임으로 돌아가기
                    </a>
                </div>
            </div>
        </div>
    );
}
