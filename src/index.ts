// Export all utilities
export * from './utils';

// Export command extensions
export { extendCypressCommands } from './commands';

// Export types
export * from './types';

// Default export for easy importing
import * as utils from './utils';
import { extendCypressCommands } from './commands';

const cypressUtils = {
  ...utils,
  extendCypressCommands,
};

export default cypressUtils; 