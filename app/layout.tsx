import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Nextjs } from "@/components/icons/next-js-icon";
import { TailwindCSS } from "@/components/icons/tailwindcss-icon";
import { shadcnui } from "@/components/icons/shadcn-icon";
import AppSidebar from "@/components/app-sidebar";
import NavBar from "@/components/nav-bar";
import SearchDialog from "@/components/search-dialog";
import ScrollToTop from "@/components/scroll-to-top";
import Link from "next/link";

import { cookies } from "next/headers";

import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
})

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
})

export const metadata: Metadata = {
  title: "Tethys System",
  description: "Wuthering Waves Database",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar-state")?.value === "closed"

  const footerLinks = [
    { name: "Nextjs", url: "https://nextjs.org/", icon: Nextjs },
    { name: "Tailwind", url: "https://tailwindcss.com/", icon: TailwindCSS },
    { name: "shadcnui", url: "https://ui.shadcn.com/", icon: shadcnui }
  ]

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} antialiased`}
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
                    Tethys System
                  </span>
                  <div className="ml-auto">
                    <SearchDialog />
                  </div>
                </div>

                <div className="hidden md:flex w-full justify-center">
                  <NavBar />
                </div>
              </header>

              <main className="m-5 lg:mx-90 lg:my-22">
                <ScrollToTop />
                {children}
              </main>

              <footer className="h-18">
                <div className="flex items-center justify-between lg:mx-90">
                  {/* Left Side */}
                  <div className="text-muted-foreground text-sm font-medium">
                    <p>© 2025 Tethys System</p>
                    <p><i>This website is a fan-made resource and is not affiliated with, maintained by, or in any way associated with Kuro Games.</i></p>
                  </div>

                  {/* Right Side */}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <p className="text-sm font-medium">Made with: </p>
                    {footerLinks.map((link) => (
                      <Link key={link.name} href={link.url}>
                        <link.icon />
                      </Link>
                    ))}
                  </div>
                </div>
              </footer>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
