/// <reference types="vite/client" />

interface ImportMetaEnv {
  [key: string]: any
  // Http请求 base_url
  VITE_HTTP_BASE_URL: string
}
