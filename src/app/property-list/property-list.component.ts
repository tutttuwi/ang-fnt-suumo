import { Component, OnInit } from '@angular/core';
import { Property } from '../property/property';
import { PropertyServiceService } from '../property-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const cautionTemplete = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span>
</button>{text}</div>`;
const lodingTemplete = `<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>`;
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.sass']
})
export class PropertyListComponent implements OnInit {
  propertydata: Property[] = [];
  searchForm: FormGroup;
  constructor(private psv: PropertyServiceService) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      selurl: new FormControl('', [Validators.required, Validators.pattern('https?://.*')]),
      selurls: new FormControl('', [Validators.required])
    });
    let lspd = JSON.parse(localStorage.getItem('propertydata'));
    this.propertydata = lspd ? lspd : [];
  }

  get selurl() {
    return this.searchForm.get('selurl');
  }
  get selurls() {
    return this.searchForm.get('selurls');
  }

  delProperty(url: string) {
    this.addTrush(
      this.propertydata.find(p => {
        if (p.url === url) {
          return p;
        }
      })
    );
    this.propertydata = this.propertydata.filter(p => p.url !== url);
    localStorage.setItem('propertydata', JSON.stringify(this.propertydata));
  }
  delPropertyAll() {
    if (confirm('検索情報をすべて削除しますか？')) {
      this.propertydata.forEach(v => {
        this.addTrush(v);
      });
      this.propertydata = [];
      localStorage.removeItem('propertydata');
    }
  }
  changePriority(url: string, e: any) {
    console.log(e.target.value);
    this.propertydata.forEach((v, i) => {
      if (v.url === url) {
        v.priority = e.target.value;
      }
    });
    localStorage.setItem('propertydata', JSON.stringify(this.propertydata));
  }
  async getPropertydata(searchurl: string) {
    this.initCaution();
    this.changeSearchStatus('urlbtn');
    const url = searchurl ? searchurl : this.selurl.value;
    try {
      console.log(url);
      if (this.psv.isNotSuumo(url)) {
        this.createCaution('URLが不正です。(suumoのURLではありません)' + url);
        return;
      }
      const data = await this.psv.getPropertydata(url);
      if (!data.isok) {
        this.createCaution('只今混み合っているか、URLが検索に対応しておりません。<' + url + '>');
        return;
      }
      if (!data.title) {
        this.createCaution('データの取得に失敗しました。掲載が終了したかURLが間違っている可能性があります。<' + url + '>');
        return;
      }
      const date = new Date();
      data.priority = 'mid'; // set default: priority
      data.searchdate = new Date(date.setTime(date.getTime() + 1000 * 60 * 60 * 9)); // JSTに変換;
      console.log('--- isNotSuumo: after');
      if (this.propertydata.every(p => p.url !== url)) {
        console.log('push');
        console.log(JSON.stringify(data));
        this.propertydata.unshift(data);
        localStorage.setItem('propertydata', JSON.stringify(this.propertydata));
        this.addHistory(data);
      } else {
        console.log('alreadry push');
        alert('すでに検索済みです' + url);
      }
    } catch (e) {
      console.log(JSON.stringify(e));
    } finally {
      this.changeSearchStatus('urlbtn');
    }
  }
  async getPropertydataList() {
    this.initCaution();
    this.changeSearchStatus('urlsbtn');
    try {
      console.log(this.selurls.value);
      const urls = this.selurls.value.split('\n');
      if (urls.length > 10) {
        this.createCaution('大変申し訳ございませんが、１度に１０件以上の検索はご遠慮ください。');
        return;
      }
      for (const url of urls) {
        if (!url) {
          return;
        }
        await this.getPropertydata(url);
      }
    } catch (e) {
      console.log(JSON.stringify(e));
    } finally {
      this.changeSearchStatus('urlsbtn');
    }
  }
  createCaution(text: string) {
    const caution = document.getElementById('cauntion');
    const elm = document.createElement('div');
    const str = cautionTemplete.replace(/{text}/, text);
    elm.innerHTML = str;
    caution.appendChild(elm);
  }
  initCaution() {
    const caution = document.getElementById('cauntion');
    caution.innerHTML = '';
  }
  addHistory(data: Property) {
    let hd: Property[] = JSON.parse(localStorage.getItem('propertydata_history'));
    if (!hd) {
      hd = [];
    }
    hd = hd.filter(p => p.url !== data.url);
    hd.push(data);
    if (hd.length > 100) {
      // item is more than 100, then delete first one.
      hd.shift();
    }
    localStorage.setItem('propertydata_history', JSON.stringify(hd));
  }
  addTrush(data: Property) {
    let td: Property[] = JSON.parse(localStorage.getItem('propertydata_trush'));
    console.log('td: ' + td);
    if (td == null || td[0] == null) {
      td = [];
    } else {
      td = td.filter(p => p.url !== data.url);
    }
    td.push(data);
    if (td.length > 100) {
      // item is more than 100, then delete first one.
      td.shift();
    }
    console.log('data ---' + JSON.stringify(data));
    console.log('td ---' + JSON.stringify(td));
    localStorage.setItem('propertydata_trush', JSON.stringify(td));
  }
  copyText(inputElement: any) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
  changeSearchStatus(id: string) {
    if (!(document.getElementById(id).innerHTML.indexOf('spinner-border') > 0)) {
      document.getElementById(id).innerHTML = lodingTemplete + document.getElementById(id).innerHTML;
    } else {
      document
        .getElementById(id)
        .getElementsByClassName('spinner-border')[0]
        .remove();
    }
  }
}
