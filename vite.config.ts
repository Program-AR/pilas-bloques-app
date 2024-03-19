import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import { execSync } from 'child_process';

const commitHash = execSync('git rev-parse HEAD').toString().trimEnd();
const shortCommitHash = execSync('git rev-parse --short HEAD').toString().trimEnd();
//const commitDate = execSync('git log -1 --format=%cI').toString().trimEnd();
//const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trimEnd();
//const lastCommitMessage = execSync('git show -s --format=%s').toString().trimEnd();

export default defineConfig({
    // depending on your application, base can also be "/"
    base: '',
    plugins: [
      // here is the main update
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      viteTsconfigPaths()
    ],
    define: {
      'process.platform': JSON.stringify(process.platform),
      "import.meta.env.VITE_GIT_COMMIT_HASH": JSON.stringify(commitHash),
      "import.meta.env.VITE_GIT_SHORT_COMMIT_HASH": JSON.stringify(shortCommitHash),
    },
    server: {    
        // this ensures that the browser opens upon server start
        open: true,
        // this sets a default port to 3000  
        port: 3000, 
    },
})
