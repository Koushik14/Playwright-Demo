 import { playAudit } from 'playwright-lighthouse';
 import * as constants from '../pages/constant';

 const thresholdsConfig = {
    performance: 90,
    accessibility: 95,
    'best-practices': 50,
    seo: 50,
    pwa: 50,
};

const port = 9222;

const lighthouseReport = {

        formats: {
          html: true, //defaults to false
        },
        name: 'lighthouse-report ' + Date.now().toLocaleString(), //defaults to `lighthouse-${new Date().getTime()}`
        directory: './lighthouse', //defaults to `${process.cwd()}/lighthouse`

};

const lighthouseConfig = {
    extends: 'lighthouse:default',
    settings: {
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'], // Include all categories for desktop
      formFactor: 'desktop',
      throttling: constants.throttling.desktopDense4G,
      screenEmulation: constants.screenEmulationMetrics.desktop,
      emulatedUserAgent: constants.userAgents.desktop,
  },
  };

  async function runPageAudit(page){
    //console.log('lighthousereport ', lighthouseReport);
    try {
        
        await playAudit({
            page: page,
            thresholds: thresholdsConfig,
            port: port,
            config: lighthouseConfig,
            reports: lighthouseReport,
            ignoreError:true,
            
          });
    
        console.log('Audit completed successfully!');
    } catch (error) {
        console.error('Error running audit:', error);
    }

  }

  exports.runPageAudit = runPageAudit;

