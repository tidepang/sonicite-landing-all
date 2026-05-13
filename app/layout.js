import "./globals.css";

export const metadata = {
  title: "Sonicite | AI Sound Systems",
  description:
    "Sonicite 用 AI 理解音乐、场景与判断。从 DJ 的音乐工作流到商业空间的品牌氛围，把声音从素材变成系统。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
