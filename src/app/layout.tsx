import './globals.scss';


export const metadata = {
  title: 'Skin Therapy',
  description: 'Online shop with cosmetics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


