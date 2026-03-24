import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme, CssBaseline, GlobalStyles } from '@mui/material';
import type { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
});

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const scrollbarStyles = (
  <GlobalStyles styles={{
    "*": {
      scrollbarWidth: "thin",
      scrollbarColor: "#bdbdbd transparent",
    },
    "*::-webkit-scrollbar": {
      width: 6,
      height: 6,
    },
    "*::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "*::-webkit-scrollbar-thumb": {
      background: "#bdbdbd",
      borderRadius: 3,
    },
    "*::-webkit-scrollbar-thumb:hover": {
      background: "#9e9e9e",
    },
  }} />
);

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {scrollbarStyles}
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
