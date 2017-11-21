import * as btcswap from 'btc-atomic-swap';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BigchainDbService} from './bigchain-db.service';
import {Coin} from '../models/coins/coin.model';
import {InformInitiatedDataModel} from '../models/inform-initiated-data.model';

@Injectable()
export class SwapService {
  constructor(private bigChainDb: BigchainDbService) {

  }

  public initiate(address: string, coin: Coin): Observable<any> {
    const initiateResult = coin.initiate(address, coin.amount);
    return initiateResult;
  }

  public informInitiated(data: InformInitiatedDataModel) {
    this.bigChainDb.send({
      id: data.link,
      data: data.data,
    });
  }

  public informParticipated({id, data}) {
    this.bigChainDb.send({
      id,
      data,
    });
  }

  public informRedeemed({id, data}) {
    this.bigChainDb.send({
      id,
      data,
    });
  }

  public auditContract({contractHex, contractTxHex}): Observable<any> {
    const auditContractResults = btcswap.auditContract(contractHex, contractTxHex);
    return Observable.of(auditContractResults);
  }

  public participate(coin: Coin, initiateData: InformInitiatedDataModel): Observable<any> {
    return coin.participate(initiateData.data.address, '0x' + initiateData.data.secretHash, coin.amount);
  }

  public waitForRedeem(block) {
    const due = 600000; // 20 minutes
    return Observable
      .interval(2000)
      .flatMap(() => {
        return this.bigChainDb.find(block);
      })
      .first((x: any[]) => {
        return !!x.length;
      })
      .timeout(due);
  }


  public waitForInitiate(link: string) {
    const due = 600000; // 20 minutes
    return Observable
      .interval(2000)
      .flatMap(() => {
        return this.bigChainDb.find(link);
      })
      .first((x: any[]) => {
        return !!x.length;
      })
      .map(res => res[0].data)
      .timeout(due);
  }


  public waitForParticipate(id: string) {
    const due = 600000; // 20 minutes
    return Observable
      .interval(2000)
      .flatMap(() => {
        return this.bigChainDb.find(id);
      })
      .first((x: any[]) => {
        return !!x.length;
      })
      .map(res => res[0].data)
      .timeout(due);
  }

}
