import {ToastContainer} from "react-toastify"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

// query client kurulum
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
 <QueryClientProvider client={queryClient} >
    <App />
    <ToastContainer/>
    <ReactQueryDevtools/>
  </QueryClientProvider>,
)
