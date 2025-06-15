// Visitor tracking utility with Firebase global tracking
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

class VisitorTracker {
  constructor() {
    this.apiKey = process.env.REACT_APP_IPGEOLOCATION_API_KEY || 'demo';
    this.trackingEnabled = true; // Always enabled
  }
  // Get visitor's location information
  async getLocationInfo() {
    try {
      // Try multiple geolocation services for better accuracy
      let data = null;
      
      // First try: ipgeolocation.io
      try {
        const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${this.apiKey}`);
        if (response.ok) {
          data = await response.json();
        }
      } catch (error) {
        console.warn('ipgeolocation.io failed:', error);
      }
      
      // Second try: ipapi.co (free, no API key needed)
      if (!data || !data.city) {
        try {
          const response = await fetch('https://ipapi.co/json/');
          if (response.ok) {
            const fallbackData = await response.json();
            data = {
              ip: fallbackData.ip,
              city: fallbackData.city,
              state_prov: fallbackData.region,
              country_name: fallbackData.country_name,
              country_code2: fallbackData.country_code,
              time_zone: { name: fallbackData.timezone },
              latitude: fallbackData.latitude,
              longitude: fallbackData.longitude,
              isp: fallbackData.org
            };
          }
        } catch (error) {
          console.warn('ipapi.co failed:', error);
        }
      }
      
      // Third try: ip-api.com (free, no API key needed)
      if (!data || !data.city) {
        try {
          const response = await fetch('http://ip-api.com/json/');
          if (response.ok) {
            const fallbackData = await response.json();
            data = {
              ip: fallbackData.query,
              city: fallbackData.city,
              state_prov: fallbackData.regionName,
              country_name: fallbackData.country,
              country_code2: fallbackData.countryCode,
              time_zone: { name: fallbackData.timezone },
              latitude: fallbackData.lat,
              longitude: fallbackData.lon,
              isp: fallbackData.isp
            };
          }
        } catch (error) {
          console.warn('ip-api.com failed:', error);
        }
      }
      
      if (data && data.city) {
        return {
          ip: data.ip || 'Unknown',
          city: data.city || 'Unknown',
          region: data.state_prov || 'Unknown',
          country: data.country_name || 'Unknown',
          countryCode: data.country_code2 || 'Unknown',
          timezone: data.time_zone?.name || 'Unknown',
          latitude: data.latitude || null,
          longitude: data.longitude || null,
          isp: data.isp || 'Unknown'
        };
      }
      
      // If all services fail, return basic info
      return {
        ip: 'Unknown',
        city: 'Unknown',
        region: 'Unknown', 
        country: 'Unknown',
        countryCode: 'Unknown',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
        latitude: null,
        longitude: null,
        isp: 'Unknown'
      };
      
    } catch (error) {
      console.warn('All geolocation services failed:', error);
      return {
        ip: 'Unknown',
        city: 'Unknown',
        region: 'Unknown',
        country: 'Unknown', 
        countryCode: 'Unknown',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
        latitude: null,
        longitude: null,
        isp: 'Unknown'
      };
    }
  }

  // Get browser and device information
  getBrowserInfo() {
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const platform = navigator.platform;
    const cookieEnabled = navigator.cookieEnabled;
    const onLine = navigator.onLine;
    
    // Screen information
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Detect browser
    let browser = 'Unknown';
    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';
    else if (userAgent.includes('Opera')) browser = 'Opera';

    // Detect OS
    let os = 'Unknown';
    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac')) os = 'macOS';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('iOS')) os = 'iOS';

    return {
      userAgent,
      browser,
      os,
      language,
      platform,
      cookieEnabled,
      onLine,
      screen: {
        width: screenWidth,
        height: screenHeight
      },
      viewport: {
        width: viewportWidth,
        height: viewportHeight
      }
    };
  }
  // Create visitor session data - always enabled
  async createVisitorSession() {
    const timestamp = new Date().toISOString();
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const locationInfo = await this.getLocationInfo();
    const browserInfo = this.getBrowserInfo();
    
    const visitorData = {
      sessionId,
      timestamp,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      location: locationInfo,
      browser: browserInfo,
      referrer: document.referrer || 'Direct',
      url: window.location.href,
      title: document.title
    };

    return visitorData;
  }
  // Save visitor data locally (silent operation)
  saveVisitorDataLocally(visitorData) {
    try {
      const existingData = JSON.parse(localStorage.getItem('portfolio_visitors') || '[]');
      existingData.push(visitorData);
      
      // Keep only last 100 visits to prevent storage overflow
      if (existingData.length > 100) {
        existingData.splice(0, existingData.length - 100);
      }
      
      localStorage.setItem('portfolio_visitors', JSON.stringify(existingData));
      // Silent operation - no console logs for visitors
    } catch (error) {
      // Silent error handling
    }
  }  // Send visitor data to Firebase (global tracking)
  async sendToAnalyticsService(visitorData) {
    try {
      // Send to Firebase Firestore for global tracking
      await addDoc(collection(db, 'visitors'), {
        ...visitorData,
        timestamp: serverTimestamp(), // Server timestamp for accuracy
        firebaseId: Math.random().toString(36).substr(2, 9) // Unique ID for this visit
      });
      
      // Silent success - no logs visible to visitors
      return true;
    } catch (error) {
      // Silent error handling - fallback to localStorage only
      return false;
    }
  }// Track page view - always enabled, silent operation
  async trackPageView() {
    try {
      const visitorData = await this.createVisitorSession();
      if (!visitorData) return;

      // Save locally for your access only
      this.saveVisitorDataLocally(visitorData);
      
      // Send to analytics service (if configured)
      await this.sendToAnalyticsService(visitorData);
      
    } catch (error) {
      // Silent error handling - no logs visible to visitors
    }
  }

  // Private method for you to access visitor data (console only)
  // Type in browser console: window.getVisitorData()
  static exposeDataAccess() {
    window.getVisitorData = () => {
      try {
        const data = JSON.parse(localStorage.getItem('portfolio_visitors') || '[]');
        console.log('=== VISITOR ANALYTICS ===');
        console.log('Total visits:', data.length);
        
        const countries = {};
        const cities = {};
        const browsers = {};
        
        data.forEach(visit => {
          countries[visit.location.country] = (countries[visit.location.country] || 0) + 1;
          cities[visit.location.city] = (cities[visit.location.city] || 0) + 1;
          browsers[visit.browser.browser] = (browsers[visit.browser.browser] || 0) + 1;
        });
        
        console.log('Countries:', countries);
        console.log('Cities:', cities);
        console.log('Browsers:', browsers);
        console.log('Recent visits:', data.slice(-5));
        console.log('=========================');
        
        return {
          totalVisits: data.length,
          countries,
          cities,
          browsers,
          recentVisits: data.slice(-10),
          allData: data
        };
      } catch (error) {
        console.error('Error accessing visitor data:', error);
        return null;
      }
    };
      window.clearVisitorData = () => {
      localStorage.removeItem('portfolio_visitors');
      console.log('Visitor data cleared');
    };

    // Global analytics from Firebase
    window.getGlobalAnalytics = async () => {
      try {
        const tracker = new VisitorTracker();
        const globalStats = await tracker.getGlobalAnalytics();
        
        if (globalStats) {
          console.log('=== GLOBAL VISITOR ANALYTICS ===');
          console.log('Total global visits:', globalStats.totalGlobalVisits);
          console.log('Unique countries:', globalStats.uniqueCountries);
          console.log('Unique cities:', globalStats.uniqueCities);
          console.log('Countries:', globalStats.countries);
          console.log('Cities:', globalStats.cities);
          console.log('Browsers:', globalStats.browsers);
          console.log('Referrers:', globalStats.referrers);
          console.log('Visits by day:', globalStats.visitsByDay);
          console.log('Recent visits:', globalStats.recentGlobalVisits.slice(0, 5));
          console.log('=================================');
          return globalStats;        } else {
          console.log('Global analytics not available - check Firebase configuration');
          return null;
        }
      } catch (error) {
        console.error('%c🔧 FIREBASE SETUP REQUIRED', 'color: #ff6b6b; font-weight: bold; font-size: 14px;');
        
        if (error.message.includes('FIREBASE_SETUP_REQUIRED')) {
          console.log('%c📋 Quick Fix Steps:', 'color: #4ecdc4; font-weight: bold;');
          console.log('1. Go to your Firebase Console: https://console.firebase.google.com/');
          console.log('2. Click on your project: portfolio-analytics-e0431');
          console.log('3. Go to Firestore Database → Rules');
          console.log('4. Replace the rules with:');
          console.log(`%crules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /visitors/{document} {
      allow write: if true;
      allow read: if true; // Temporary - restrict this later
    }
  }
}`, 'background: #f0f0f0; padding: 10px; border-radius: 4px;');
          console.log('5. Click "Publish" and try again!');
        } else if (error.message.includes('FIREBASE_PROJECT_NOT_FOUND')) {
          console.log('%c❌ Firebase project not found. Check your .env file.', 'color: #ff6b6b;');
        } else {
          console.log('%c❌ Firebase Error:', 'color: #ff6b6b;', error.message);
        }
        
        console.log('%c💡 Alternative: Use getVisitorData() for local analytics', 'color: #95a5a6;');
        return null;
      }
    };
  }

  // Get visitor statistics (for admin dashboard)
  getVisitorStats() {
    try {
      const visitors = JSON.parse(localStorage.getItem('portfolio_visitors') || '[]');
      
      const stats = {
        totalVisits: visitors.length,
        uniqueCountries: [...new Set(visitors.map(v => v.location.country))].length,
        uniqueCities: [...new Set(visitors.map(v => `${v.location.city}, ${v.location.country}`))].length,
        browsers: this.groupBy(visitors, v => v.browser.browser),
        countries: this.groupBy(visitors, v => v.location.country),
        cities: this.groupBy(visitors, v => v.location.city),
        referrers: this.groupBy(visitors, v => v.referrer),
        recentVisits: visitors.slice(-10).reverse()
      };
      
      return stats;
    } catch (error) {
      console.warn('Error getting visitor stats:', error);
      return null;
    }
  }  // Helper function to group data
  groupBy(array, keyFn) {
    const grouped = array.reduce((acc, item) => {
      const key = keyFn(item);
      acc[key] = (acc[key] || 0) + 1;
      return acc;    }, {});
    
    return Object.entries(grouped)
      .sort(([,a], [,b]) => b - a)
      .reduce((acc, [key, value]) => {        acc[key] = value;
        return acc;
      }, {});
  }
  // Get global visitor analytics from Firebase (for site owner only)
  async getGlobalAnalytics() {
    try {
      const { getDocs, query, collection: getCollection, orderBy, limit } = await import('firebase/firestore');
      
      // Get all visitor records from Firebase
      const visitorsRef = getCollection(db, 'visitors');
      const q = query(visitorsRef, orderBy('timestamp', 'desc'), limit(1000)); // Last 1000 visits
      const querySnapshot = await getDocs(q);
      
      const allVisits = [];
      querySnapshot.forEach((doc) => {
        allVisits.push({ id: doc.id, ...doc.data() });
      });

      // Calculate analytics
      const stats = {
        totalGlobalVisits: allVisits.length,
        uniqueCountries: [...new Set(allVisits.map(v => v.location?.country).filter(Boolean))].length,
        uniqueCities: [...new Set(allVisits.map(v => `${v.location?.city}, ${v.location?.country}`).filter(c => !c.includes('undefined')))].length,
        browsers: this.groupBy(allVisits, v => v.browser?.browser || 'Unknown'),
        countries: this.groupBy(allVisits, v => v.location?.country || 'Unknown'),
        cities: this.groupBy(allVisits, v => v.location?.city || 'Unknown'),
        referrers: this.groupBy(allVisits, v => v.referrer || 'Direct'),
        recentGlobalVisits: allVisits.slice(0, 20), // Most recent 20 visits
        visitsByDay: this.groupVisitsByDay(allVisits)
      };
      
      return stats;
    } catch (error) {
      // Enhanced error handling with helpful messages
      if (error.code === 'permission-denied' || error.message.includes('Missing or insufficient permissions')) {
        throw new Error('FIREBASE_SETUP_REQUIRED: You need to set up Firestore security rules. Please follow the Firebase setup guide.');
      } else if (error.code === 'failed-precondition' || error.message.includes('indexes')) {
        throw new Error('FIREBASE_INDEX_REQUIRED: Firestore needs to create indexes. Try again in a few minutes.');
      } else if (error.message.includes('not found') || error.code === 'not-found') {
        throw new Error('FIREBASE_PROJECT_NOT_FOUND: Check your Firebase project ID in .env file.');
      } else {
        throw new Error(`FIREBASE_ERROR: ${error.message}`);
      }
    }
  }

  // Helper to group visits by day
  groupVisitsByDay(visits) {
    const grouped = {};
    visits.forEach(visit => {
      if (visit.timestamp && visit.timestamp.seconds) {
        const date = new Date(visit.timestamp.seconds * 1000).toISOString().split('T')[0];
        grouped[date] = (grouped[date] || 0) + 1;
      }
    });
    return grouped;
  }
}

export default VisitorTracker;
