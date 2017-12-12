import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromBalance from '../reducers/balance.reducer';

export const getBalanceState = createFeatureSelector<fromBalance.State>('balance');

export const getETHBalance = createSelector(getBalanceState,
  fromBalance.getETHBalance);

export const getREPBalance = createSelector(getBalanceState,
  fromBalance.getREPBalance);

export const getBTCBalance = createSelector(getBalanceState,
  fromBalance.getBTCBalance);

export const getBtcLoading = createSelector(getBalanceState,
  fromBalance.getBtcLoading);

export const getEthLoading = createSelector(getBalanceState,
  fromBalance.getEthLoading);

export const getRepLoading = createSelector(getBalanceState,
  fromBalance.getRepLoading);
