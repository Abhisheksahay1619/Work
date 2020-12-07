import $q from 'q';
import {
  format,
} from 'date-fns';
import AppConst from '../constants/app.constant';
import httpService from '../services/http.service';

const sharedMethods = {
  methods: {
    cdnImageURL(imageName) {
      return `${AppConst.ionicCDNPath}${imageName}.svg`;
    },
    isMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator
        .userAgent)) {
        return true;
      }
      return false;
    },
    validNumber(value) {
      return !Number.isNaN(Number(value));
    },
    getArrayObj(source) {
      let result;
      if (Array.isArray(source)) {
        result = source;
      } else {
        result = [source];
      }
      return result;
    },
    isValidJson(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    },
    getDateFormated(dateVal) {
      return format(new Date(dateVal), 'YYYY-MM-DD HH:mm:ss');
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
export default sharedMethods;
