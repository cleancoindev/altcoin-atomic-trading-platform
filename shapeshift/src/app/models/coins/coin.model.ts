import {WalletModel} from '../wallets/wallet.model';
import {Coins} from './coins.enum';
import {BtcCoinModel} from './btc-coin.model';
import {EthCoinModel} from './eth-coin.model';

export abstract class Coin extends WalletModel {
  readonly name: string;
  readonly icon: string;
  readonly iconOutline: string;
  readonly fullName: string;
  amount: number;
  abstract update(coin: Coin): Coin;
}

export class CoinFactory {
  static createCoin(coin: Coins): Coin {
    switch (coin) {
      case Coins.BTC: {
        return new BtcCoinModel();
      }
      case Coins.ETH: {
        return new EthCoinModel();
      }
      default: {
        throw new Error();
      }
    }
  }
}
