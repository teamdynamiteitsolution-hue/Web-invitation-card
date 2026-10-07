import { prisma } from "@/lib/prisma";
import { Header } from "@/components/Header";
import EditClient from "./EditClient";
import { notFound } from "next/navigation";

export default async function EditPage({ params }: { params: { id: string } }) {
  const invitation = await prisma.invitation.findUnique({
    where: { id: params.id },
    include: { template: true, animation: true }
  });

  if (!invitation) return notFound();

  const animations = await prisma.animation.findMany();

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2623] font-sans flex flex-col">
      <Header />
      <EditClient id={params.id} invitation={invitation} animations={animations} />
    </div>
  );
}
