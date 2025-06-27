// Service untuk mengambil jadwal shalat dari API
export interface PrayerTimesResponse {
  code: number;
  status: string;
  data: {
    timings: {
      Fajr: string;
      Sunrise: string;
      Dhuhr: string;
      Asr: string;
      Sunset: string;
      Maghrib: string;
      Isha: string;
      Imsak: string;
      Midnight: string;
    };
    date: {
      readable: string;
      timestamp: string;
      hijri: {
        date: string;
        format: string;
        day: string;
        weekday: {
          en: string;
          ar: string;
        };
        month: {
          number: number;
          en: string;
          ar: string;
        };
        year: string;
        designation: {
          abbreviated: string;
          expanded: string;
        };
        holidays: string[];
      };
      gregorian: {
        date: string;
        format: string;
        day: string;
        weekday: {
          en: string;
        };
        month: {
          number: number;
          en: string;
        };
        year: string;
        designation: {
          abbreviated: string;
          expanded: string;
        };
      };
    };
    meta: {
      latitude: number;
      longitude: number;
      timezone: string;
      method: {
        id: number;
        name: string;
        params: {
          Fajr: number;
          Isha: number;
        };
      };
      latitudeAdjustmentMethod: string;
      midnightMode: string;
      school: string;
      offset: {
        Imsak: number;
        Fajr: number;
        Sunrise: number;
        Dhuhr: number;
        Asr: number;
        Sunset: number;
        Maghrib: number;
        Isha: number;
        Midnight: number;
      };
    };
  };
}

export interface PrayerTime {
  id: number;
  name: string;
  time: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

class PrayerTimesService {
  private baseUrl = 'https://api.aladhan.com/v1';
  
  // Default coordinates for Jakarta, Indonesia
  private defaultLocation: LocationCoordinates = {
    latitude: -6.2088,
    longitude: 106.8456,
    city: 'Jakarta',
    country: 'Indonesia'
  };

  /**
   * Get prayer times for today based on coordinates
   */
  async getPrayerTimes(
    latitude?: number, 
    longitude?: number,
    method: number = 20 // Method 20 is for Indonesia (Kementerian Agama)
  ): Promise<PrayerTime[]> {
    try {
      const lat = latitude || this.defaultLocation.latitude;
      const lng = longitude || this.defaultLocation.longitude;
      
      const today = new Date();
      const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD format
      
      const url = `${this.baseUrl}/timings/${dateString}?latitude=${lat}&longitude=${lng}&method=${method}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: PrayerTimesResponse = await response.json();
      
      if (data.code !== 200) {
        throw new Error(`API error: ${data.status}`);
      }
      
      return this.formatPrayerTimes(data.data.timings);
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      // Return fallback times if API fails
      return this.getFallbackPrayerTimes();
    }
  }

  /**
   * Get prayer times for a specific city
   */
  async getPrayerTimesByCity(
    city: string = 'Jakarta',
    country: string = 'Indonesia',
    method: number = 20
  ): Promise<PrayerTime[]> {
    try {
      const today = new Date();
      const dateString = today.toISOString().split('T')[0];
      
      const url = `${this.baseUrl}/timingsByCity/${dateString}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: PrayerTimesResponse = await response.json();
      
      if (data.code !== 200) {
        throw new Error(`API error: ${data.status}`);
      }
      
      return this.formatPrayerTimes(data.data.timings);
    } catch (error) {
      console.error('Error fetching prayer times by city:', error);
      return this.getFallbackPrayerTimes();
    }
  }

  /**
   * Get user's current location and fetch prayer times
   */
  async getPrayerTimesForCurrentLocation(): Promise<{
    prayerTimes: PrayerTime[];
    location: LocationCoordinates;
  }> {
    try {
      const location = await this.getCurrentLocation();
      const prayerTimes = await this.getPrayerTimes(location.latitude, location.longitude);
      
      return {
        prayerTimes,
        location
      };
    } catch (error) {
      console.error('Error getting current location:', error);
      // Fallback to default location
      const prayerTimes = await this.getPrayerTimesByCity();
      return {
        prayerTimes,
        location: this.defaultLocation
      };
    }
  }

  /**
   * Get user's current location using Geolocation API
   */
  private getCurrentLocation(): Promise<LocationCoordinates> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Try to get city name from coordinates using reverse geocoding
            const cityInfo = await this.getCityFromCoordinates(latitude, longitude);
            resolve({
              latitude,
              longitude,
              city: cityInfo.city,
              country: cityInfo.country
            });
          } catch (error) {
            // If reverse geocoding fails, use coordinates with default city
            resolve({
              latitude,
              longitude,
              city: 'Unknown',
              country: 'Indonesia'
            });
          }
        },
        (error) => {
          reject(new Error(`Geolocation error: ${error.message}`));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }

  /**
   * Get city name from coordinates using reverse geocoding
   */
  private async getCityFromCoordinates(lat: number, lng: number): Promise<{city: string, country: string}> {
    try {
      // Using OpenStreetMap Nominatim API for reverse geocoding (free)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`
      );
      
      if (!response.ok) {
        throw new Error('Reverse geocoding failed');
      }
      
      const data = await response.json();
      
      return {
        city: data.address?.city || data.address?.town || data.address?.village || 'Unknown',
        country: data.address?.country || 'Indonesia'
      };
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return { city: 'Unknown', country: 'Indonesia' };
    }
  }

  /**
   * Format API response to our PrayerTime interface
   */
  private formatPrayerTimes(timings: PrayerTimesResponse['data']['timings']): PrayerTime[] {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const prayers = [
      { id: 1, name: 'Subuh', time: this.formatTime(timings.Fajr) },
      { id: 2, name: 'Dzuhur', time: this.formatTime(timings.Dhuhr) },
      { id: 3, name: 'Ashar', time: this.formatTime(timings.Asr) },
      { id: 4, name: 'Maghrib', time: this.formatTime(timings.Maghrib) },
      { id: 5, name: 'Isya', time: this.formatTime(timings.Isha) }
    ];

    // Determine status for each prayer
    return prayers.map((prayer, index) => {
      const prayerTime = this.timeToMinutes(prayer.time);
      let status: 'completed' | 'current' | 'upcoming' = 'upcoming';

      if (currentTime > prayerTime) {
        status = 'completed';
      } else if (index > 0) {
        const prevPrayerTime = this.timeToMinutes(prayers[index - 1].time);
        if (currentTime >= prevPrayerTime && currentTime <= prayerTime) {
          status = 'current';
        }
      } else if (index === 0) {
        // For Subuh, check if it's between Isha yesterday and Subuh today
        const ishaTime = this.timeToMinutes(prayers[4].time);
        if (currentTime >= ishaTime || currentTime <= prayerTime) {
          status = 'current';
        }
      }

      return {
        ...prayer,
        status
      };
    });
  }

  /**
   * Convert time string to minutes since midnight
   */
  private timeToMinutes(timeString: string): number {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  }

  /**
   * Format time from API (24-hour) to display format
   */
  private formatTime(timeString: string): string {
    // API returns time in format "HH:MM (timezone)"
    const time = timeString.split(' ')[0]; // Remove timezone part
    return time;
  }

  /**
   * Fallback prayer times if API fails
   */
  private getFallbackPrayerTimes(): PrayerTime[] {
    return [
      { id: 1, name: 'Subuh', time: '04:45', status: 'completed' },
      { id: 2, name: 'Dzuhur', time: '12:15', status: 'completed' },
      { id: 3, name: 'Ashar', time: '15:30', status: 'current' },
      { id: 4, name: 'Maghrib', time: '18:45', status: 'upcoming' },
      { id: 5, name: 'Isya', time: '20:00', status: 'upcoming' }
    ];
  }

  /**
   * Get available calculation methods
   */
  getCalculationMethods() {
    return [
      { id: 1, name: 'University of Islamic Sciences, Karachi' },
      { id: 2, name: 'Islamic Society of North America (ISNA)' },
      { id: 3, name: 'Muslim World League (MWL)' },
      { id: 4, name: 'Umm al-Qura, Makkah' },
      { id: 5, name: 'Egyptian General Authority of Survey' },
      { id: 7, name: 'Institute of Geophysics, University of Tehran' },
      { id: 8, name: 'Gulf Region' },
      { id: 9, name: 'Kuwait' },
      { id: 10, name: 'Qatar' },
      { id: 11, name: 'Majlis Ugama Islam Singapura, Singapore' },
      { id: 12, name: 'Union Organization islamic de France' },
      { id: 13, name: 'Diyanet İşleri Başkanlığı, Turkey' },
      { id: 14, name: 'Spiritual Administration of Muslims of Russia' },
      { id: 15, name: 'Moonsighting Committee Worldwide (also requires shafaq parameter)' },
      { id: 16, name: 'Dubai (unofficial)' },
      { id: 17, name: 'Jabatan Kemajuan Islam Malaysia (JAKIM)' },
      { id: 18, name: 'Tunisia' },
      { id: 19, name: 'Algeria' },
      { id: 20, name: 'Kementerian Agama, Indonesia' },
      { id: 21, name: 'Morocco' },
      { id: 22, name: 'Comunidade Islamica de Lisboa' },
      { id: 23, name: 'Ministry of Awqaf, Islamic Affairs and Holy Places, Jordan' }
    ];
  }
}

export const prayerTimesService = new PrayerTimesService();