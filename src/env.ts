import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
 
export const env = createEnv({
  client: {
    NEXT_PUBLIC_FIREBASE_API_KEY : z.string(),
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN :  z.string(),
    NEXT_PUBLIC_FIREBASE_PROJECT_ID :  z.string(),
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET :  z.string(),
    NEXT_PUBLIC_FIREBASE_MESSANGING_SENDER_ID :  z.string(),
    NEXT_PUBLIC_FIREBASE_APP_ID : z.string(),
    NEXT_PUBLIC_TINY_MCE_API_KEY : z.string()
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSANGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSANGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_TINY_MCE_API_KEY: process.env.NEXT_PUBLIC_TINY_MCE_API_KEY
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
});