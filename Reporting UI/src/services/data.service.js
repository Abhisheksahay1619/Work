import get from 'get-value';
import X2JS from 'x2js';
import AppConst from '../constants/app.constant';
import utilityService from './utility.service';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const convert = new X2JS();

const getServiceURL = (postURL) => {
  let {
    serviceURL,
  } = AppConst;
  if (window.ReturnsAppServiceURL) {
    serviceURL = window.ReturnsAppServiceURL;
  }
  return serviceURL + postURL;
};
const getSOAPRequest = (head, body) => `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Header>
        ${head}
      </soap:Header>
      <soap:Body>
        ${body}
      </soap:Body>
    </soap:Envelope>`;

const getMarketPlaceAccessHeader = (platformId, accessToken) => `<MarketplaceAccessHeader xmlns="http://www.leadcloud.us/marketplace/">
                <PlatformId>${platformId}</PlatformId>
                <AccessToken>${accessToken}</AccessToken>
            </MarketplaceAccessHeader>`;

// eslint-disable-next-line
const getLoadReturnReasonsBySellerNameXML = (sellerName) => `<LoadReturnReasonsBySellerName xmlns="http://www.leadcloud.us/marketplace/">
<SellerName>${sellerName}</SellerName>
</LoadReturnReasonsBySellerName>`;

// eslint-disable-next-line
const getLoadByTransactionIdXML = (buyerId, transactionId) => `<LoadByTransactionId xmlns="http://www.leadcloud.us/marketplace/">
<BuyerId>${buyerId}</BuyerId>
<TransactionId>${transactionId}</TransactionId>
</LoadByTransactionId>`;

// eslint-disable-next-line
const saveReturnReasonXML = (returnObj) => `<Save xmlns="http://www.leadcloud.us/marketplace/">
<LeadReturn>
    <TransactionId>${returnObj.TransactionId}</TransactionId>
    <BuyerId>${returnObj.BuyerId}</BuyerId>
    <Reason>${returnObj.Reason}</Reason>
    <Comments>${returnObj.Comments}</Comments>
</LeadReturn>
</Save>`;

const marketplaceAccessHeader = getMarketPlaceAccessHeader(AppConst.platforms.id, AppConst.platforms
  .accessKey);

const makeAPICall = (url, bodyData) => fetch(url, {
  method: 'POST',
  body: bodyData,
  headers: {
    'Content-Type': 'text/xml',
    Origin: 'http://localhost:8080',
  },
}).then((res) => res.text());
const getData = (body, resultObj) => {
  utilityService.showSpinner(true);
  const requestURL = getServiceURL('ReturnService.asmx');
  return new Promise((resolve, reject) => {
    makeAPICall(requestURL,
      getSOAPRequest(marketplaceAccessHeader, body)).then((xmlResp) => {
      utilityService.showSpinner(false);
      try {
        const response = convert.xml2js(xmlResp, {
          compact: true,
        });
        resolve(get(response.Envelope.Body, resultObj));
      } catch (e) {
        reject(e);
      }
    }).catch((err) => {
      utilityService.showSpinner(false);
      reject(err);
    });
  });
};

export const getLoadReturnReasonsBySellerName = (sellerName) => getData(
  getLoadReturnReasonsBySellerNameXML(sellerName),
  'LoadReturnReasonsBySellerNameResponse.LoadReturnReasonsBySellerNameResult',
);

export const getLoadByTransactionId = (buyerId, transactionId) => getData(getLoadByTransactionIdXML(
  buyerId, transactionId,
), 'LoadByTransactionIdResponse.LoadByTransactionIdResult');

export const saveReturnReason = (returnObj) => getData(saveReturnReasonXML(returnObj),
  'SaveResponse.SaveResult');
