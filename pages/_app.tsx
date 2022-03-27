import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import { brand } from '@helpers/brand';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Barlow', sans-serif;
    
    background-color: ${brand.black};
    color: ${brand.white};
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<GlobalStyle />

			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
