/* jslint this */
/* property
    cdnImageURL, getArrayObj, getHourOfOperationOptions, methods,
    getLineOfBusiness, getTimeSlots, getTimeZones, isArray
*/

import { format } from 'date-fns';
import httpService from '@/services/http.service';
import $q from 'q';
import AppConst from '../constants/app.constant';

const masterList = {
  methods: {
    getArrayObj(source) {
      let result;
      if (Array.isArray(source)) {
        result = source;
      } else {
        result = [source];
      }
      return result;
    },
    cdnImageURL(imageName) {
      return `${AppConst.IonicCDNPath}${imageName}.svg`;
    },
    getDateFormated(dateVal) {
      return format(new Date(dateVal), 'YYYY-MM-DD HH:mm:ss');
    },
    isMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
      }
      return false;
    },
    postData(url, postData) {
      const deferred = $q.defer();
      if (Array.isArray(postData)) {
        postData.forEach((element) => {
          element.TabId = window.TabId;
        });
      } else if (postData) {
        postData.TabId = window.TabId;
      } else {
        postData = window.TabId;
      }
      httpService.http_post(url, postData).then((data) => {
        deferred.resolve(data);
      }, () => {
        deferred.reject(null);
        return deferred.promise;
      });
      return deferred.promise;
    },
  },
};
export default masterList;
