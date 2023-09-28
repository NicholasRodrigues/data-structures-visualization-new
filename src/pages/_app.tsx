import {AppProps} from 'next/app';
import '../styles/global.css';
import {Toaster} from 'react-hot-toast';
import {DevSupport} from "@react-buddy/ide-toolbox-next";
import {ComponentPreviews, useInitial} from "@/dev";

export default function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Toaster
                position="bottom-left"
                toastOptions={{
                    duration: 3000,
                    style: {
                        padding: "12px 16px",
                        borderRadius: "16px"
                    },
                }}/>
            <DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
            >
                <Component {...pageProps} />
            </DevSupport>
        </>
    );
}
