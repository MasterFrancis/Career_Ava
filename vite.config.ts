import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const REPO_NAME = 'Career_Ava'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? `/${REPO_NAME}/` : '/',
}))
