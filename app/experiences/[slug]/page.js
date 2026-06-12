import { notFound } from "next/navigation";
import { ExperienceDetailPage } from "@/components/experience-detail-page";
import { experienceEvents, getExperienceBySlug } from "@/components/experiences-data";

export function generateStaticParams() {
  return experienceEvents.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = getExperienceBySlug(slug);
  if (!event) {
    return {};
  }

  return {
    title: `${event.title} | Sonicite Experiences`,
    description: `${event.venue} · ${event.city} · ${event.date}`,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const event = getExperienceBySlug(slug);

  if (!event) {
    notFound();
  }

  return <ExperienceDetailPage event={event} />;
}
