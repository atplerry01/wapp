// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:3001/api/v1/',
 // baseUrl: 'http://iwema:8081/api/v1/',
  AspbaseUrl: 'http://172.27.4.17/CodeLibrary/api/CodeLibrary/',
  allowedgrades: ['ABO', 'EA', 'EH', 'AA', 'AA1', 'AA2', 'AA3', 'ET', 'DRV1', 'DRV2', 'BO', 'SBO'],
  attestationgrades: [ 'ET', 'EA', 'ABO',  'BO', 'SBO', 'AM', 'DM', 'M', 'SM', 'AGMD']
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
