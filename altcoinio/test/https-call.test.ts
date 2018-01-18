import { HttpRequester } from '../src/app/common/util';
import { suite, test, slow, timeout } from 'mocha-typescript';

@suite(timeout(40000)) class Common {
  @test async Util() {
    const options = { method: 'GET', path: '/api/v2/get_address_balance/BTCTEST/mt6ejXYWbbGZQSHYGkLkUTS3jDaJddmaK9' };
    const result = await HttpRequester.Request(options);
    console.log(result);
  }
}