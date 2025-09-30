import { atlasServerClient } from "@/atlas/server";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    console.log("User ID:", userId);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { featureId } = body;

    console.log("Received featureId:", featureId);

    if (!featureId) {
      return NextResponse.json(
        { error: "Feature ID is required" },
        { status: 400 }
      );
    }

    // For usage-based features, we don't need to check if the feature is "allowed"
    // in the same way as limit-based features. As long as the user is authenticated,
    // they should be able to record usage events for features they have access to.

    try {
      console.log("Attempting to enqueue feature event for:", { featureIds: [featureId], customerId: userId });

      // Enqueue the feature usage event
      await atlasServerClient.enqueueFeatureEvents({
        featureIds: [featureId],
        customerId: userId,
      });

      console.log("Successfully enqueued feature event, now flushing...");

      // Flush events to ensure they're sent immediately
      await atlasServerClient.flushEvents();

      console.log("Successfully flushed events");
    } catch (enqueueError) {
      console.error("Error enqueuing feature events:", enqueueError);
      return NextResponse.json(
        { error: `Failed to record usage event for feature "${featureId}". The feature may not exist or there may be a configuration issue. Details: ${enqueueError instanceof Error ? enqueueError.message : String(enqueueError)}` },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Successfully recorded usage event for feature "${featureId}". This usage will be billed according to your plan.`,
      featureId,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Error testing usage-based feature:", error);
    return NextResponse.json(
      { error: "Internal server error occurred while testing the feature" },
      { status: 500 }
    );
  }
}
