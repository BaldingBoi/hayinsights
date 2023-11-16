import "./globals.css";
import { ThemeProvider } from "@/provider/ThemeProvider";
import { Provider as QueryProvider } from "@/provider/QueryProvider";
import Header from "@/components/common/header";
import LayoutTemplate from "@/components/common/layout-template";

export const metadata = {
    title: "DEMO",
    description: "DEMO",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning={true}>
            <head>
                <link rel="icon" href="/logo-lite.svg" sizes="any" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </head>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem={false}
                >
                    <QueryProvider>
                        <LayoutTemplate>{children}</LayoutTemplate>
                    </QueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
