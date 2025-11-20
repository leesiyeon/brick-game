import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neon Brick Breaker | 무료 벽돌깨기 게임",
  description: "무료 온라인 벽돌깨기 게임! 네온 스타일의 아케이드 게임으로 돌, 가위, 보 시스템과 무한 모드를 즐겨보세요. 브라우저에서 바로 플레이 가능한 벽돌 부수기 게임.",
  keywords: [
    "벽돌깨기",
    "벽돌게임",
    "브릭브레이커",
    "brick breaker",
    "벽돌부수기",
    "무료게임",
    "온라인게임",
    "아케이드게임",
    "브라우저게임",
    "HTML5게임",
    "neon game",
    "endless mode",
    "가위바위보게임"
  ],
  authors: [{ name: "Siyeon Lee" }],
  creator: "Siyeon Lee",
  publisher: "Siyeon Lee",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://main.d1234567890abc.amplifyapp.com'), // Amplify URL로 변경 필요
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "벽돌깨기 게임 | Neon Brick Breaker",
    description: "무료 온라인 벽돌깨기 게임! 네온 스타일의 아케이드 게임으로 돌, 가위, 보 시스템과 무한 모드를 즐겨보세요.",
    url: 'https://main.d1234567890abc.amplifyapp.com', // Amplify URL로 변경 필요
    siteName: 'Neon Brick Breaker',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/og-image.png', // 이미지 생성 필요
        width: 1200,
        height: 630,
        alt: '네온 벽돌깨기 게임 스크린샷',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "벽돌깨기 게임 | Neon Brick Breaker",
    description: "무료 온라인 벽돌깨기 게임! 네온 스타일의 아케이드 게임",
    images: ['/og-image.png'], // 이미지 생성 필요
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'wb8j80fm07InbtL9gncStJ-MDVJ3WGVqH3RB1Zr5HIg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
