import "@/styles/globals.css";
import { Montserrat } from '@next/font/google';
import '../styles/globals.css';

const montserrat = Montserrat({ subsets: ['latin'] });
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
