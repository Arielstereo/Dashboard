import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import Loading from "./loading";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToggleMode } from "@/components/ToggleMode";

const inter = Inter({ subsets: ["latin"], weight: "700" });

export const metadata = {
  title: "Auth|Next",
  description: "Dashboard bank",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-950`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="">
            <ToggleMode />
          </div>
          <Suspense fallback={<Loading />}>
            {children}
            <Toaster />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
