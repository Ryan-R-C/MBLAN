declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_DATABASE: string
    DATABASE_USERNAME: string
    DATABASE_PASSWORD: string
    DATABASE_HOST: string
    DATABASE_PORT: string
    DATABASE_URL: string
  }
}
