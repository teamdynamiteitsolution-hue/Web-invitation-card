import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const now = new Date();

    // Find all expired invitations that are still marked as ACTIVE
    const expiredInvitations = await prisma.invitation.findMany({
      where: {
        expiresAt: { lt: now },
        status: "ACTIVE",
      },
    });

    let cleanedCount = 0;

    for (const inv of expiredInvitations) {
      // Clean heavy base64 image data to free storage while preserving event text & metadata
      let cleanedEventData = inv.eventData;
      try {
        if (inv.eventData) {
          const parsed = JSON.parse(inv.eventData);
          // Strip out large base64 uploads and replace with lightweight placeholder reference
          if (parsed.couplePhoto?.startsWith("data:")) parsed.couplePhoto = "/assets/categories/wedding.webp";
          if (parsed.bridePhoto?.startsWith("data:")) parsed.bridePhoto = "/assets/categories/wedding.webp";
          if (parsed.groomPhoto?.startsWith("data:")) parsed.groomPhoto = "/assets/categories/wedding.webp";
          if (parsed.gallery1?.startsWith("data:")) parsed.gallery1 = "/assets/categories/wedding.webp";
          if (parsed.gallery2?.startsWith("data:")) parsed.gallery2 = "/assets/categories/wedding.webp";
          if (parsed.gallery3?.startsWith("data:")) parsed.gallery3 = "/assets/categories/wedding.webp";
          if (parsed.gallery4?.startsWith("data:")) parsed.gallery4 = "/assets/categories/wedding.webp";
          cleanedEventData = JSON.stringify(parsed);
        }
      } catch (e) {}

      await prisma.invitation.update({
        where: { id: inv.id },
        data: {
          status: "EXPIRED",
          customImage: null,
          eventData: cleanedEventData,
        },
      });

      cleanedCount++;
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${cleanedCount} expired invitations. Invoices and records preserved cleanly.`,
      cleanedCount,
    });
  } catch (error: any) {
    console.error("Cleanup error:", error);
    return NextResponse.json({ error: "Failed to process cleanup" }, { status: 500 });
  }
}
