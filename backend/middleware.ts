import type { NextFunction, Request, Response } from "express";
import { createSupabaseClient } from "./client";
import { prisma } from "./db";

const client = createSupabaseClient();


export async function middleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  

  const data = await  client.auth.getUser(authHeader)
  const userId = data.data.user?.id
if (userId) {
  try {
    const existingUser = await prisma.user.findFirst({
      where: { supabaseId: userId } 
    });

  
    if (!existingUser) {
      
      await prisma.user.create({
        data: {
          id: userId,         
          supabaseId: userId,
          email: 'user@example.com',
          name: 'User',
          provider: 'Github',        
        }
      });
    }
  } catch (e) {
    console.error("Middleware DB Error:", e);
  }

    req.userId = userId;
    next()
  
  } else{
    res.status(403).json({
      message: "Incorrect inputs"
    })
  }

}
