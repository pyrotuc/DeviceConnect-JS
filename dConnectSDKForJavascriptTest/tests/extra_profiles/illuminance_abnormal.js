module('IlluminanceProfileAbnormalTest', {
  setup: function() {
    init();
  }
});

/**
 * Illuminanceプロファイルの異常系テストを行うクラス。
 * @class
 */
var IlluminanceProfileAbnormalTest = {};

/**
 * 定義されていないPUTメソッドで照度計にアクセスするテストを行う。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: PUT<br/>
 * Path: /illuminance?deviceId=xxxx&accessToken=xxx<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ってくること。<br/>
 * </p>
 */
IlluminanceProfileAbnormalTest.illuminanceAbnormalTest001 = function(assert) {
  searchTestService(function(accessToken, deviceId) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('illuminance');
    builder.setServiceId(deviceId);
    builder.setAccessToken(accessToken);
    var uri = builder.build();
    dConnect.put(uri, null, null, function(json) {
          assert.ok(false, 'json: ' + JSON.stringify(json));
          QUnit.start();
        },
    function(errorCode, errorMessage) {
      if (errorCode == 8) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('illuminanceAbnormalTest001',
    IlluminanceProfileAbnormalTest.illuminanceAbnormalTest001);

/**
 * 定義されていないPOSTメソッドで照度計にアクセスするテストを行う。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: POST<br/>
 * Path: /illuminance?deviceId=xxxx&accessToken=xxx<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ってくること。<br/>
 * </p>
 */
IlluminanceProfileAbnormalTest.illuminanceAbnormalTest002 = function(assert) {
  searchTestService(function(accessToken, deviceId) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('illuminance');
    builder.setServiceId(deviceId);
    builder.setAccessToken(accessToken);
    var uri = builder.build();
    dConnect.post(uri, null, null, function(json) {
          assert.ok(false, 'json: ' + JSON.stringify(json));
          QUnit.start();
        },
    function(errorCode, errorMessage) {
      if (errorCode == 8) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('illuminanceAbnormalTest002',
    IlluminanceProfileAbnormalTest.illuminanceAbnormalTest002);

/**
 * 定義されていないDELETEメソッドで照度計にアクセスするテストを行う。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: DELETE<br/>
 * Path: /illuminance?deviceId=xxxx&accessToken=xxx<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ってくること。<br/>
 * </p>
 */
IlluminanceProfileAbnormalTest.illuminanceAbnormalTest003 = function(assert) {
  searchTestService(function(accessToken, deviceId) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('illuminance');
    builder.setServiceId(deviceId);
    builder.setAccessToken(accessToken);
    var uri = builder.build();
    dConnect.delete(uri, null, function(json) {
          assert.ok(false, 'json: ' + JSON.stringify(json));
          QUnit.start();
        },
    function(errorCode, errorMessage) {
      if (errorCode == 8) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(false,
        'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('illuminanceAbnormalTest003',
    IlluminanceProfileAbnormalTest.illuminanceAbnormalTest003);
