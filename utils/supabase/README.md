# Supabase Client Utilities

## Использование

### Server Components

```tsx
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  
  const { data, error } = await supabase
    .from('Story')
    .select('*')
    .eq('status', 'APPROVED')
  
  return <div>{/* ... */}</div>
}
```

### Client Components

```tsx
'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Component() {
  const [data, setData] = useState(null)
  const supabase = createClient()
  
  useEffect(() => {
    supabase
      .from('Story')
      .select('*')
      .then(({ data }) => setData(data))
  }, [])
  
  return <div>{/* ... */}</div>
}
```

### Middleware

```tsx
import { createClient } from '@/utils/supabase/middleware'
import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)
  
  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  // Ваша логика здесь
  
  return response
}
```

## Переменные окружения

Убедись, что в `.env.local` есть:

```env
NEXT_PUBLIC_SUPABASE_URL=https://lqgurdhcxzjchudxuuts.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
```

