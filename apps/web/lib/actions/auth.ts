"use server";

import { onboardingSchema } from "@repo/shared/validations";
import prismaClient from "@repo/db/client";
import { z } from "zod";

export async function OnboardUser(
  values: z.infer<typeof onboardingSchema>,
  userId: string,
) {
  try {
    const parsedValues = onboardingSchema.parse(values);

    const existingUser = await prismaClient.user.findFirst({
      where: { email: parsedValues.email },
    });

    if (existingUser) {
      return await prismaClient.user.update({
        where: { id: existingUser.id },
        data: {
          username: parsedValues.username,
          native: parsedValues.native,
          target: parsedValues.target,
        },
      });
    }

    return await prismaClient.user.create({
      data: {
        userId,
        email: parsedValues.email,
        username: parsedValues.username,
        native: parsedValues.native,
        target: parsedValues.target,
        onboarded: true,
      },
    });
  } catch (error) {
    console.error("Error in OnboardUser:", error);
    throw new Error("Failed to onboard user.");
  }
}
