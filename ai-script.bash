#!/bin/bash

# Navigate to src directory
cd src

# Create main directories
mkdir -p assets
mkdir -p components/{common,layouts}
mkdir -p config
mkdir -p features/{auth,dashboard}/{components,services,types}
mkdir -p hooks
mkdir -p lib/mui
mkdir -p services/{api,auth}
mkdir -p store
mkdir -p types
mkdir -p utils

# Create basic configuration files
touch config/api.ts
touch config/routes.ts

# Create index files for better imports
touch components/common/index.ts
touch components/layouts/index.ts
touch features/auth/index.ts
touch features/dashboard/index.ts
touch hooks/index.ts
touch lib/mui/index.ts
touch services/api/index.ts
touch services/auth/index.ts
touch store/index.ts
touch types/index.ts
touch utils/index.ts

# Add basic content to index files
echo "// Export all components from common" > components/common/index.ts
echo "// Export all layout components" > components/layouts/index.ts
echo "// Export authentication related functionality" > features/auth/index.ts
echo "// Export dashboard related functionality" > features/dashboard/index.ts
echo "// Export custom hooks" > hooks/index.ts
echo "// Export MUI theme configuration" > lib/mui/index.ts
echo "// Export API client setup" > services/api/index.ts
echo "// Export authentication service" > services/auth/index.ts
echo "// Export store configuration" > store/index.ts
echo "// Export type definitions" > types/index.ts
echo "// Export utility functions" > utils/index.ts

# Create basic configuration content
echo "// API endpoints configuration" > config/api.ts
echo "// Route definitions" > config/routes.ts

echo "✅ Project structure created successfully!"