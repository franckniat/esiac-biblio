"use client";
import { ThemeProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function NextThemeProvider({children, ...props}:ThemeProviderProps){
    return(
        <ThemeProvider {...props}>
            <ProgressBar
            options={{ showSpinner: true }}
            color="#16a34a"
            height="4px"
            />
            {children}
        </ThemeProvider>

    )

}