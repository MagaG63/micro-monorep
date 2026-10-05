/**
 * Декларации типов для удалённых модулей (Module Federation remotes).
 *
 * TypeScript не видит модули, которые появляются в рантайме через
 * remoteEntry.js, поэтому объявляем их вручную. Компоненты грузятся
 * через React.lazy, значит у каждого модуля должен быть default export.
 */
declare module 'admin/App' {
  import type { ComponentType } from 'react'
  const App: ComponentType
  export default App
}

declare module 'dashboard/App' {
  import type { ComponentType } from 'react'
  const App: ComponentType
  export default App
}

declare module 'profile/App' {
  import type { ComponentType } from 'react'
  const App: ComponentType
  export default App
}
