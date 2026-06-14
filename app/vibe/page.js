import { ProductDetailPage } from "@/components/product-detail-page";

export const metadata = {
  title: "Sonicite Vibe | 现场生成的共创音乐体验",
  description: "Sonicite Vibe 是面向房间、prompt 和共享声音的现场共创音乐体验。",
};

export default function VibePage() {
  return <ProductDetailPage product="vibe" />;
}
