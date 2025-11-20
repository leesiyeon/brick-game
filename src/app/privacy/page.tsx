export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-cyan-400">개인정보 처리방침</h1>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-400">1. 개인정보의 처리 목적</h2>
                    <p className="mb-4">
                        Neon Brick Breaker는 다음의 목적을 위하여 개인정보를 처리합니다.
                        처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며,
                        이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>서비스 제공 및 운영</li>
                        <li>게임 이용 통계 분석</li>
                        <li>서비스 개선 및 신규 서비스 개발</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-400">2. 개인정보의 처리 및 보유기간</h2>
                    <p className="mb-4">
                        본 서비스는 별도의 회원가입 없이 이용 가능하며, 개인정보를 수집하지 않습니다.
                        다만, Google Analytics를 통해 익명화된 통계 데이터를 수집할 수 있습니다.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-400">3. 쿠키(Cookie)의 사용</h2>
                    <p className="mb-4">
                        본 서비스는 사용자 경험 개선을 위해 쿠키를 사용할 수 있습니다.
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>쿠키의 사용 목적: 게임 진행 상황 저장, 사용자 선호도 분석</li>
                        <li>쿠키의 설치/운영 및 거부: 브라우저 설정을 통해 쿠키를 거부할 수 있습니다</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-400">4. Google Analytics</h2>
                    <p className="mb-4">
                        본 서비스는 Google Analytics를 사용하여 웹사이트 트래픽을 분석합니다.
                        Google Analytics는 쿠키를 사용하여 익명화된 정보를 수집합니다.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-400">5. 개인정보 보호책임자</h2>
                    <p className="mb-4">
                        개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한
                        정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                    </p>
                    <div className="bg-gray-800 p-4 rounded">
                        <p>개인정보 보호책임자: Siyeon Lee</p>
                        <p>이메일: [이메일 주소]</p>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-400">6. 개인정보 처리방침 변경</h2>
                    <p className="mb-4">
                        이 개인정보 처리방침은 2025년 1월 1일부터 적용됩니다.
                    </p>
                </section>

                <div className="mt-12">
                    <a href="/" className="text-cyan-400 hover:text-cyan-300 underline">
                        ← 게임으로 돌아가기
                    </a>
                </div>
            </div>
        </div>
    );
}
