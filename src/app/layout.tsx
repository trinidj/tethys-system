import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Nextjs } from "@/components/icons/next-js-icon";
import { TailwindCSS } from "@/components/icons/tailwindcss-icon";
import { shadcnui } from "@/components/icons/shadcn-icon";
import { GitHub } from "@/components/icons/github-icon";
import AppSidebar from "@/components/app-sidebar";
import NavBar from "@/components/nav-bar";
import SearchDialog from "@/components/search-dialog";
import ScrollToTop from "@/components/scroll-to-top";
import Link from "next/link";

import { cookies } from "next/headers";

import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Separator } from "@/components/ui/separator";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
})

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
})

export const metadata: Metadata = {
  title: "Tethys System",
  description: "Wuthering Waves Database",
  icons: {
    icon: "/assets/site_icon.png",
  },
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
          <SidebarProvider defaultOpen={defaultOpen} className="w-full min-h-screen flex-col">
            <AppSidebar />
            <header className="flex items-center bg-card/50 h-14 border-b-2 border-b-primary/80">
              <div className="flex mx-4 sm:mx-6 w-full items-center gap-2 md:hidden">
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

            <main className="mx-4 my-5 sm:mx-6 md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-90 md:my-8 lg:my-12 xl:my-16 2xl:my-22">
              <ScrollToTop />
              {children}
            </main>

            <footer className="mt-auto py-6 md:py-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mx-4 sm:mx-6 md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-90">
                {/* Left Side */}
                <div className="text-muted-foreground text-xs sm:text-sm font-medium space-y-1">
                  <p>© 2025 Tethys System</p>
                  <p className="text-xs"><i>This website is a fan-made resource and is not affiliated with, maintained by, or in any way associated with Kuro Games.</i></p>
                </div>

                {/* Right Side */}
                <div className="flex h-5 items-center gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <p className="text-xs sm:text-sm font-medium">Made with: </p>
                    {footerLinks.map((link) => (
                      <Link key={link.name} href={link.url} target="_blank">
                        <link.icon />
                      </Link>
                    ))}
                  </div>

                  <Separator orientation="vertical" />
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <p className="text-xs sm:text-sm font-medium">GitHub:</p>
                    <Link href="https://github.com/trinidj/tethys-system" target="_blank">
                      <GitHub />
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
