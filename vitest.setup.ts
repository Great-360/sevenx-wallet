import 'testing-library/jestdom/vitest'
import { vi } from 'vitest';
vi.mock('next/server', async () => {
   const actual = await vi.importActual('next/server');
   return {
       ...actual,
       NextRequest: class {
           constructor(public url: String, public init?: RequestInit) {}
           json = async () => this.init?.body ? JSON.parse(this.init.body.toString()) : {};
       },
   };
});
