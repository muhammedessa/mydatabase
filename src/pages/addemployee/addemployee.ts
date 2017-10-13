import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { Toast } from '@ionic-native/toast';

import { HomePage } from '../home/home';
/**
 * Generated class for the AddemployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addemployee',
  templateUrl: 'addemployee.html',
})
export class AddemployeePage {


data = {
  name:'' ,
  lname:''  ,
  age:0   ,
  gender:''   ,
  salary :0 ,
  date :''
}
result="";

  constructor(public navCtrl: NavController, public navParams: NavParams,public sqlite:SQLite,public toast:Toast) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddemployeePage');
  }



  saveDate(){

    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })  .then((db: SQLiteObject) => {
  db.executeSql('INSERT INTO employeess VALUES(NULL,? ,?,?,?,?,?)', [
    this.data.name,
    this.data.lname  ,
    this.data.age   ,
    this.data.gender   ,
    this.data.salary  ,
    this.data.date
  ])
  .then((res) => {                               //add res
    console.log('Executed SQL insert');
    this.toast.show('Done data inserted!','4000','center').subscribe(
      toast => {
        this.navCtrl.push(HomePage);
      }
    );


  })
          .catch(e => {
            this.toast.show('Done data inserted!','4000','center').subscribe(
              toast => {
                console.log(e);
              }
            );
          });
  }) .catch(e => {
    this.toast.show('Done data inserted!','4000','center').subscribe(
      toast => {
        console.log(e);
      }
    );
  });



  }

}
