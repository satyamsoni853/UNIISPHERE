import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { splitVendorChunkPlugin } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), splitVendorChunkPlugin()],
  resolve: {
    alias: {
      'Components': path.resolve(__dirname, './src/Components')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-components': [
            'Components/UserLogin/UserLogin',
            'Components/ForgotPassword/ForgotPassword',
            'Components/UserSignupWithEmailAndPassword/UserSignupWithEmailAndPassword'
          ],
          'dashboard': [
            'Components/View/View',
            'Components/Self-Profile/SelfProfile',
            'Components/FullFlowerSectionPage/FullFlowerSectionPage'
          ],
          'messaging': [
            'Components/MessageFinalClass/MessageFinalclass',
            'Components/MessageFinalclass-2/MessageFinalClass2',
            'Components/BottomMessagesWidget/BottomMessagesWidget',
            'Components/MessageMobileInbox/MessageMobileInbox'
          ],
          'resources': [
            'Components/Resources/Resources',
            'Components/Resources/Books',
            'Components/Resources/EventNews',
            'Components/Resources/EventDescription'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
