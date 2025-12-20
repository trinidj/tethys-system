import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import NavBar from "@/components/nav-bar";
import SearchDialog from "@/components/search-dialog";
import ScrollToTop from "@/components/scroll-to-top";

import { cookies } from "next/headers";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phrolova Project",
  description: "Wuthering Waves Database",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar-state")?.value === "closed"

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <div className="w-full min-h-screen">
              <header className="flex items-center bg-card/50 h-14 border-b-2 border-b-primary/80">
                <div className="flex mx-5 w-full items-center gap-2 md:hidden">
                  <SidebarTrigger />
                  <span className="text-sm font-semibold tracking-[0.25em] uppercase text-muted-foreground">
                    Phrolova Project
                  </span>
                  <div className="ml-auto">
                    <SearchDialog />
                  </div>
                </div>

                <div className="hidden md:flex w-full justify-center">
                  <NavBar />
                </div>
              </header>

              <main className="m-5 lg:mx-90 lg:my-20">
                <ScrollToTop />
                {children}
              </main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
