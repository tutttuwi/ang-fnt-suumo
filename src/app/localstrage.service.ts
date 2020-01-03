import { Injectable } from '@angular/core';
import { Property } from './property/property';

/**
 * ローカルストレージを管理しようとしたが、
 * サービスからは見えないみたいなので断念。
 * そのままにしておきます。
 * 不要になったタイミングで削除します。
 */
@Injectable({
  providedIn: 'root'
})
export class LocalstrageService {
  constructor() {}
  saveProperty(k: string, v: Property) {}
}
