module('LightProfileAbnormalTest', {
  setup: function() {
    init();
  }
});

/**
 * Lightプロファイルの異常系テストを行うクラス。
 * @class
 */
var LightProfileAbnormalTest = {};

function getLightId(success_cb, error_cb) {
  searchTestService(function(accessToken, serviceId) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    var uri = builder.build();
    dConnect.get(uri, null, function(json) {
      success_cb(accessToken, serviceId, json);
    }, function(errorCode, errorMessage) {
      error_cb(errorCode, errorMessage);
    });
  }, function(errorCode, errorMessage) {
    error_cb(errorCode, errorMessage);
  });
}

/**
 * 存在しないlightIdを指定してライト点灯リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: POST<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=10000000000000000000000<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightOnAbnormalTest001 = function(assert) {
  searchTestService(function(accessToken, serviceId) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', 10000000000000000000000);
    var uri = builder.build();
    dConnect.post(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
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
QUnit.asyncTest('lightOnAbnormalTest001',
    LightProfileAbnormalTest.lightOnAbnormalTest001);

/**
 * brightnessに全角文字を指定してライト点灯リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: POST<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&brightness='あいうえお...'<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightOnAbnormalTest002 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('brightness',
        'あいうえおあいうえおあいうえおあいうえおあいうえおあいうえお' +
        'あいうえおあいうえおあいうえおあいうえおあいうえおあいうえお' +
        'あいうえおあいうえおあいうえお');
    var uri = builder.build();
    dConnect.post(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightOnAbnomalTest002',
    LightProfileAbnormalTest.lightOnAbnormalTest002);

/**
 * brightnessに半角文字を指定してライト点灯リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: POST<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&brightness='abcdefg...'<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightOnAbnormalTest003 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('brightness',
        'abcdefgabcdefg' + 'abcdefgabcdefg' +
        'abcdefgabcdefg' + 'abcdefgabcdefg' +
        'abcdefgabcdefg');
    var uri = builder.build();
    dConnect.post(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightOnAbnormalTest003',
    LightProfileAbnormalTest.lightOnAbnormalTest003);

/**
 * brightnessに特殊文字を指定してライト点灯リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: POST<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&brightness=!#$%?<>?#$%&<>?...'<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightOnAbnormalTest004 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('brightness',
        '#$%?<>?#$%&<>?' + '#$%?<>?#$%&<>?' +
        '#$%?<>?#$%&<>?' + '#$%?<>?#$%&<>?' +
        '#$%?<>?#$%&<>?');
    var uri = builder.build();
    dConnect.post(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightOnAbnormalTest004',
    LightProfileAbnormalTest.lightOnAbnormalTest004);

/**
 * brightnessに仕様範囲外の数値を指定してライト点灯リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: POST<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&brightness=10000<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightOnAbnormalTest005 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('brightness', 10000);
    var uri = builder.build();
    dConnect.post(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightOnAbnormalTest005',
    LightProfileAbnormalTest.lightOnAbnormalTest005);

/**
 * brightnessにマイナスの数値を指定してライト点灯リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: POST<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&brightness=-0.5<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightOnAbnormalTest006 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('brightness', -0.5);
    var uri = builder.build();
    dConnect.post(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightOnAbnormalTest006',
    LightProfileAbnormalTest.lightOnAbnormalTest006);

/**
 * brightnessに空文字を指定してライト点灯リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: POST<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&brightness=<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightOnAbnormalTest007 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('brightness', '');
    var uri = builder.build();
    dConnect.post(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightOnAbnormalTest007',
    LightProfileAbnormalTest.lightOnAbnormalTest007);

/**
 * colorに全角文字を指定してライト点灯リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: POST<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&brightness=0.5&color='あいうえお...'<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightOnAbnormalTest008 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('brightness', 0.5);
    builder.addParameter('color',
        'あいうえおあいうえおあいうえお' + 'あいうえおあいうえおあいうえお' +
        'あいうえおあいうえおあいうえお' + 'あいうえおあいうえおあいうえお' +
        'あいうえおあいうえおあいうえお');
    var uri = builder.build();
    dConnect.post(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightOnAbnormalTest008',
    LightProfileAbnormalTest.lightOnAbnormalTest008);

/**
 * colorに半角文字を指定してライト点灯リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: POST<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&brightness=0.5&color='abcdefg...'<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightOnAbnormalTest009 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('brightness', 0.5);
    builder.addParameter('color',
        'abcdefgabcdefg' + 'abcdefgabcdefg' + 'abcdefgabcdefg' +
        'abcdefgabcdefg' + 'abcdefgabcdefg');
    var uri = builder.build();
    dConnect.post(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightOnAbnormalTest009',
    LightProfileAbnormalTest.lightOnAbnormalTest009);

/**
 * colorに特殊文字を指定してライト点灯リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: POST<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&brightness=0.5&color='#$%&<>?...'<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightOnAbnormalTest010 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('brightness', 0.5);
    builder.addParameter('color',
        '#$%&<>?#$%&<>?' + '#$%&<>?#$%&<>?' + '#$%&<>?#$%&<>?' +
        '#$%&<>?#$%&<>?' + '#$%&<>?#$%&<>?');
    var uri = builder.build();
    dConnect.post(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightOnAbnormalTest010',
    LightProfileAbnormalTest.lightOnAbnormalTest010);

/**
 * 存在しないlightIdを指定してライトステータス変更リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: PUT<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=10000000000000000000000<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightStatusChangeAbnormalTest001 = function(assert) {
  searchTestService(function(accessToken, serviceId) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', 10000000000000000000000);
    builder.addParameter('name', 'Hue Light Test');
    var uri = builder.build();
    dConnect.put(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
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
QUnit.asyncTest('lightStatusChangeAbnormalTest001',
    LightProfileAbnormalTest.lightStatusChangeAbnormalTest001);

/**
 * colorに全角文字を指定してライトステータス変更リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: PUT<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&color='あいうえお...'<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightStatusChangeAbnormalTest002 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('color',
        'あいうえおあいうえおあいうえお' + 'あいうえおあいうえおあいうえお' +
        'あいうえおあいうえおあいうえお' + 'あいうえおあいうえおあいうえお' +
        'あいうえおあいうえおあいうえお');
    builder.addParameter('name', 'Hue Light Test');
    var uri = builder.build();
    dConnect.put(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightStatusChangeAbnormalTest002',
    LightProfileAbnormalTest.lightStatusChangeAbnormalTest002);

/**
 * colorに半角文字を指定してライトステータス変更リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: PUT<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&color='abcdefg...'<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightStatusChangeAbnormalTest003 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('color',
        'abcdefgabcdefg' + 'abcdefgabcdefg' + 'abcdefgabcdefg' +
        'abcdefgabcdefg' + 'abcdefgabcdefg');
    builder.addParameter('name', 'Hue Light Test');
    var uri = builder.build();
    dConnect.put(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightStatusChangeAbnormalTest003',
    LightProfileAbnormalTest.lightStatusChangeAbnormalTest003);

/**
 * colorに特殊文字を指定してライトステータス変更リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: PUT<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&color='#$%&<>?...'<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightStatusChangeAbnormalTest004 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('color',
        '#$%&<>?' + '#$%&<>?' + '#$%&<>?' + '#$%&<>?' + '#$%&<>?');
    builder.addParameter('name', 'Hue Light Test');
    var uri = builder.build();
    dConnect.put(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightStatusChangeAbnormalTest004',
    LightProfileAbnormalTest.lightStatusChangeAbnormalTest004);

/**
 * brightnessに仕様範囲外の数値をを指定してライトステータス変更リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: PUT<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&brightness=100<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightStatusChangeAbnormalTest005 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('brightness', 100);
    builder.addParameter('name', 'Hue Light Test');
    var uri = builder.build();
    dConnect.put(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightStatusChangeAbnormalTest005',
    LightProfileAbnormalTest.lightStatusChangeAbnormalTest005);

/**
 * brightnessにマイナスの数値をを指定してライトステータス変更リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: PUT<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&brightness=-0.5<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightStatusChangeAbnormalTest006 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('brightness', -0.5);
    builder.addParameter('name', 'Hue Light Test');
    var uri = builder.build();
    dConnect.put(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightStatusChangeAbnormalTest006',
    LightProfileAbnormalTest.lightStatusChangeAbnormalTest006);

/**
 * brightnessに全角文字を指定してライトステータス変更リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: PUT<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&brightness='あいうえお...'<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightStatusChangeAbnormalTest007 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('brightness',
        'あいうえおあいうえおあいうえお' + 'あいうえおあいうえおあいうえお' +
        'あいうえおあいうえおあいうえお' + 'あいうえおあいうえおあいうえお' +
        'あいうえおあいうえおあいうえお');
    builder.addParameter('name', 'Hue Light Test');
    var uri = builder.build();
    dConnect.put(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightStatusChangeAbnormalTest007',
    LightProfileAbnormalTest.lightStatusChangeAbnormalTest007);

/**
 * brightnessに半角文字を指定してライトステータス変更リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: PUT<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&brightness='abcdefg...'<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightStatusChangeAbnormalTest008 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('brightness',
        'abcdefgabcdefg' + 'abcdefgabcdefg' + 'abcdefgabcdefg' +
        'abcdefgabcdefg' + 'abcdefgabcdefg');
    builder.addParameter('name', 'Hue Light Test');
    var uri = builder.build();
    dConnect.put(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightStatusChangeAbnormalTest008',
    LightProfileAbnormalTest.lightStatusChangeAbnormalTest008);

/**
 * brightnessに空文字を指定してライトステータス変更リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: PUT<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&brightness=-0.5<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightStatusChangeAbnormalTest009 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('brightness', '');
    builder.addParameter('name', 'Hue Light Test');
    var uri = builder.build();
    dConnect.put(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightStatusChangeAbnormalTest009',
    LightProfileAbnormalTest.lightStatusChangeAbnormalTest009);

/**
 * flashingにnumber型で0を指定してライト点滅リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: PUT<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&brightness=xxx&flashing=0<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightStatusChangeAbnormalTest010 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('brightness', 0.5);
    builder.addParameter('flashing', 0);
    builder.addParameter('name', 'Hue Light Test');
    var uri = builder.build();
    dConnect.put(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightStatusChangeAbnormalTest010',
    LightProfileAbnormalTest.lightStatusChangeAbnormalTest010);

/**
 * flashingにnumber型でマイナスの値を指定してライト点滅リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: PUT<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&brightness=xxx&flashing=-1000<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightStatusChangeAbnormalTest011 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('brightness', 0.5);
    builder.addParameter('flashing', -1000);
    builder.addParameter('name', 'Hue Light Test');
    var uri = builder.build();
    dConnect.put(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightStatusChangeAbnormalTest011',
    LightProfileAbnormalTest.lightStatusChangeAbnormalTest011);

/**
 * flashingに文字列でマイナスの値を指定してライト点滅リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: PUT<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&brightness=xxx&flashing=-1000<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightStatusChangeAbnormalTest012 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('brightness', 0.5);
    builder.addParameter('flashing', '-1000');
    builder.addParameter('name', 'Hue Light Test');
    var uri = builder.build();
    dConnect.put(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightStatusChangeAbnormalTest012',
    LightProfileAbnormalTest.lightStatusChangeAbnormalTest012);

/**
 * flashingに全角文字を指定してライト点滅リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: PUT<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&brightness=xxx&flashing='あいうえお...'<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightStatusChangeAbnormalTest013 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('brightness', 0.5);
    builder.addParameter('flashing',
        'あいうえおあいうえおあいうえお' + 'あいうえおあいうえおあいうえお' +
        'あいうえおあいうえおあいうえお' + 'あいうえおあいうえおあいうえお' +
        'あいうえおあいうえおあいうえお');
    builder.addParameter('name', 'Hue Light Test');
    var uri = builder.build();
    dConnect.put(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightStatusChangeAbnormalTest013',
    LightProfileAbnormalTest.lightStatusChangeAbnormalTest013);

/**
 * flashingに半角文字を指定してライト点滅リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: PUT<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&brightness=xxx&flashing='abcdefg...'<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightStatusChangeAbnormalTest014 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('brightness', 0.5);
    builder.addParameter('flashing', 'abcdefgabcdefgabcdefg'
        + 'abcdefgabcdefgabcdefg' + 'abcdefgabcdefgabcdefg'
        + 'abcdefgabcdefgabcdefg' + 'abcdefgabcdefgabcdefg');
    builder.addParameter('name', 'Hue Light Test');
    var uri = builder.build();
    dConnect.put(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightStatusChangeAbnormalTest014',
  LightProfileAbnormalTest.lightStatusChangeAbnormalTest014);

/**
 * flashingに特殊文字を指定してライト点滅リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: PUT<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&brightness=xxx&flashing='#$%&<>?...'<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightStatusChangeAbnormalTest015 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('brightness', 0.5);
    builder.addParameter('flashing', '#$%&<>?#$%&<>?#$%&<>?'
        + '#$%&<>?#$%&<>?#$%&<>?' + '#$%&<>?#$%&<>?#$%&<>?'
        + '#$%&<>?#$%&<>?#$%&<>?' + '#$%&<>?#$%&<>?#$%&<>?');
    builder.addParameter('name', 'Hue Light Test');
    var uri = builder.build();
    dConnect.put(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightStatusChangeAbnormalTest015',
    LightProfileAbnormalTest.lightStatusChangeAbnormalTest015);

/**
 * flashingに[100,-100,100,100]を指定してライト点滅リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: PUT<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&brightness=xxx&flashing=100,-100,100,100<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightStatusChangeAbnormalTest016 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('brightness', 0.5);
    builder.addParameter('flashing', '100,-100,100,100');
    builder.addParameter('name', 'Hue Light Test');
    var uri = builder.build();
    dConnect.put(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightStatusChangeAbnormalTest016',
    LightProfileAbnormalTest.lightStatusChangeAbnormalTest016);

/**
 * flashingに[100,0.1,0.1,0.2]を指定してライト点滅リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: PUT<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx&brightness=xxx&flashing=100,0.1,0.1,0.2<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightStatusChangeAbnormalTest017 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('brightness', 0.5);
    builder.addParameter('flashing', '100,0.1,0.1,0.2');
    builder.addParameter('name', 'Hue Light Test');
    var uri = builder.build();
    dConnect.put(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightStatusChangeAbnormalTest017',
    LightProfileAbnormalTest.lightStatusChangeAbnormalTest017);

/**
 * nameを指定しないでライト点灯リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: PUT<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightStatusChangeAbnormalTest018 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    var uri = builder.build();
    dConnect.put(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightStatusChangeAbnormalTest018',
    LightProfileAbnormalTest.lightStatusChangeAbnormalTest018);


/**
 * nameに空文字を指定してライト点灯リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: PUT<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=xxx<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightStatusChangeAbnormalTest019 = function(assert) {
  getLightId(function(accessToken, serviceId, json) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', json.lights[0].lightId);
    builder.addParameter('name', '');
    var uri = builder.build();
    dConnect.put(uri, null, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
        assert.ok(true, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      } else if (checkErrorCode(errorCode)) {
        assert.ok(true, 'not support');
      } else {
        assert.ok(false, 'errorCode=' + errorCode + ', errorMessage=' + errorMessage);
      }
      QUnit.start();
    });
  }, function(errorCode, errorMessage) {
    assert.ok(checkErrorCode(errorCode),
        'errorCode=' + errorCode + ' errorMessage=' + errorMessage);
    QUnit.start();
  });
};
QUnit.asyncTest('lightStatusChangeAbnormalTest019',
    LightProfileAbnormalTest.lightStatusChangeAbnormalTest019);

/**
 * 存在しないlightIdを指定してライト消灯リクエストを送る。
 * <h3>【HTTP通信】</h3>
 * <p id='test'>
 * Method: DELETE<br/>
 * Path: /light?serviceId=xxx&accessToken=xxx&lightId=10000000000000000000000<br/>
 * </p>
 * <h3>【期待する動作】</h3>
 * <p id='expected'>
 * ・resultに1が返ること。<br/>
 * </p>
 */
LightProfileAbnormalTest.lightOffAbnormalTest001 = function(assert) {
  searchTestService(function(accessToken, serviceId) {
    var builder = new dConnect.URIBuilder();
    builder.setProfile('light');
    builder.setServiceId(serviceId);
    builder.setAccessToken(accessToken);
    builder.addParameter('lightId', 10000000000000000000000);
    var uri = builder.build();
    dConnect.delete(uri, null, function(json) {
      assert.ok(false, 'json: ' + JSON.stringify(json));
      QUnit.start();
    }, function(errorCode, errorMessage) {
      if (errorCode == 10) {
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
QUnit.asyncTest('lightOffAbnormalTest001',
    LightProfileAbnormalTest.lightOffAbnormalTest001);
