#!/bin/bash

# Function to safely create directory
create_dir() {
    if [ ! -d "$1" ]; then
        mkdir -p "$1"
        echo "Created directory: $1"
    fi
}

# Function to safely create file
create_file() {
    if [ ! -f "$1" ]; then
        mkdir -p "$(dirname "$1")"
        touch "$1"
        echo "Created file: $1"
        
        # Add default export if it's an index.ts file
        if [[ "$1" == */index.ts ]]; then
            echo "// Export all from this directory" > "$1"
        fi
    fi
}

# Navigate to src directory
cd src

# Create directory structure
# Assets
create_dir "assets/images"
create_dir "assets/styles"
create_file "assets/styles/global.css"

# Components
create_dir "components/common"
for component in Button Input LoadingSpinner; do
    create_dir "components/common/$component"
    create_file "components/common/$component/$component.tsx"
    create_file "components/common/$component/index.ts"
done
create_file "components/common/index.ts"

# Layouts
create_dir "components/layouts"
for layout in MainLayout Navbar Sidebar; do
    create_dir "components/layouts/$layout"
    create_file "components/layouts/$layout/$layout.tsx"
    create_file "components/layouts/$layout/index.ts"
done
create_file "components/layouts/index.ts"

# Config
create_dir "config"
create_file "config/api.ts"
create_file "config/constants.ts"
create_file "config/routes.ts"

# Features - Auth
create_dir "features/auth"
for dir in components layouts pages services types hooks; do
    create_dir "features/auth/$dir"
    create_file "features/auth/$dir/index.ts"
done

# Auth components
for component in LoginForm RegisterForm; do
    create_dir "features/auth/components/$component"
    create_file "features/auth/components/$component/$component.tsx"
    create_file "features/auth/components/$component/index.ts"
done

# Auth specific files
create_file "features/auth/layouts/AuthLayout.tsx"
create_file "features/auth/pages/LoginPage.tsx"
create_file "features/auth/pages/RegisterPage.tsx"
create_file "features/auth/services/authService.ts"
create_file "features/auth/types/auth.types.ts"
create_file "features/auth/hooks/useAuth.ts"
create_file "features/auth/routes.tsx"
create_file "features/auth/index.ts"

# Features - Dashboard
create_dir "features/dashboard"
for dir in components pages services types hooks; do
    create_dir "features/dashboard/$dir"
    create_file "features/dashboard/$dir/index.ts"
done

# Dashboard components
for component in DashboardMetrics DashboardChart; do
    create_dir "features/dashboard/components/$component"
    create_file "features/dashboard/components/$component/$component.tsx"
    create_file "features/dashboard/components/$component/index.ts"
done

# Dashboard specific files
create_file "features/dashboard/pages/DashboardPage.tsx"
create_file "features/dashboard/services/dashboardService.ts"
create_file "features/dashboard/types/dashboard.types.ts"
create_file "features/dashboard/hooks/useDashboard.ts"
create_file "features/dashboard/routes.tsx"
create_file "features/dashboard/index.ts"

# Hooks
create_dir "hooks"
create_file "hooks/useApi.ts"
create_file "hooks/useLocalStorage.ts"
create_file "hooks/index.ts"

# Lib
create_dir "lib/mui"
create_file "lib/mui/theme.ts"
create_file "lib/mui/index.ts"

# Services
create_dir "services/api"
create_file "services/api/axios.ts"
create_file "services/api/interceptors.ts"
create_file "services/api/index.ts"

create_dir "services/auth"
create_file "services/auth/tokenService.ts"
create_file "services/auth/index.ts"

# Store
create_dir "store/slices"
create_file "store/slices/authSlice.ts"
create_file "store/slices/index.ts"
create_file "store/store.ts"
create_file "store/index.ts"

# Types
create_dir "types"
create_file "types/api.types.ts"
create_file "types/common.types.ts"
create_file "types/index.ts"

# Utils
create_dir "utils"
create_file "utils/formatters.ts"
create_file "utils/validators.ts"
create_file "utils/index.ts"

echo "✅ Project structure created successfully! Existing files and directories were preserved."