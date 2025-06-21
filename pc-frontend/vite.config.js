import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({command})=>({
  plugins: [react()],
  base : command === 'build'? '/projects/pc-frontend' :'/', 
  loader: { '.js': 'jsx' },
  build: {
    rollupOptions: {
      external:['@mui/system','dayjs','@mui/icons-material']
    }
  }  
}))
