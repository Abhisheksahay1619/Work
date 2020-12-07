import appInfo from '../app.info';

export default {
  application: {
    name: 'ConsentLanguage',
    version: appInfo.applicationVersion,
    bundleVersion: appInfo.bundleVersion,
  },
  IsLocal: false,
  httpRequestTimeouts: 20000,
  mountDelay: 2000,
  toastDelay: 4000,
  resizeDebounce: 500,
  resizeTimeout: 500,
  usernameKeyCognito: 'LastAuthUser',
  ionicCDNPath: 'https://cdnjs.cloudflare.com/ajax/libs/ionicons/4.5.6/collection/build/ionicons/svg/',
  forkCopyText: ' Copy',
  showPrettyJSON: [

  ],
  preventStepNumber: [{
    StepType: 2,
    preventFrom: [-2, -1, 0, 100],
  }],
  replaceStepData: [{
    StepType: 25,
    From: 'RepalceValue',
    To: 'ReplaceValue',
  },
  {
    StepType: 3,
    From: 'ConsentLangauge/',
    To: '',
  },
  ],
};
