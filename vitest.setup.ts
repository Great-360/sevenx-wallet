import 'testing-library/jestdom/vitest'
import { cleanup
 } from '@testing-library/react'

 import { afterEach } from 'vitest'

 afterEach(() => {
    cleanup()
 })