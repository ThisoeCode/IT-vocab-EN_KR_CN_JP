import "./globals.css"
import H from "@/components/_h"

export const metadata = {
  title: "IT Vocab | Thisoe",
  author: 'ThisoeCode',
  description: "Gathering web & software development & IT vocabulary and knowledge in 4 languages.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <H/>
        {children}
      </body>
    </html>
  )
}
