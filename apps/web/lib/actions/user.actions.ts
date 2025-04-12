"use server"

import prismaClient from "@repo/db/client"

interface User {
    userId: string
}

export const getUserById = async ({ userId }: User) => {
    return await prismaClient.user.findFirst({
      where: {
        userId: userId
      }
    });
  };
  