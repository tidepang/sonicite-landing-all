import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const sansFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
});

export const metadata = {
  title: "SONICITE | AI Sound Systems",
  description:
    "SONICITE 用 AI 理解音乐、场景与判断。从 DJ 的音乐工作流到商业空间的品牌氛围，把声音从素材变成系统。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className={`${displayFont.variable} ${sansFont.variable}`}>{children}</body>
    </html>
  );
}
