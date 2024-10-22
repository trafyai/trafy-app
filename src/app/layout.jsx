import "@styles/globals.css";
import Header from "@components/common/header/Header.jsx";
import Footer from "@components/common/footer/Footer";
import Desktop from "../components/desktop/Desktop";
import imageO from "../app/opengraph-image.png";
import { AuthContextProvider } from "@context/AuthContext";
import { CartProvider } from "@context/CartContext";
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata = {
  title: "trafy - Your Personalised AI mentor",
  description:
    "Learn UI/UX designing, artificial intelligence, and digital marketing with our interactive courses and accelerate your career with expert guidance",
  metadataBase: new URL("https://trafyai.com/"),
  openGraph: {
    title: "trafy - Your Personalised AI mentor",
    description:
      "Learn UI/UX designing, artificial intelligence, and digital marketing with our interactive courses and accelerate your career with expert guidance",
  },
  twitter: {
    card: "summary_large_image",
  },
  image: imageO,
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NX8D4BFD');`
        }}
      />

          </head>
      <body>

        {/* <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NX8D4BFD"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript> */}

        <AuthContextProvider>
          <CartProvider>

            <main>
              <Header />
              <div style={{display:"flex",width:"100%"}}>
                <div style={{width:"250px",position:"relative"}}><Desktop/></div>
                {children}
              </div>
                
              {/* <Footer /> */}
            </main>
            <GoogleAnalytics gaId="G-THWZDJH6WZ" />

          </CartProvider>
        </AuthContextProvider>
      </body>
     


    </html>
  );
}



