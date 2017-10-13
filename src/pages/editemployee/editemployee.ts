import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the EditemployeePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editemployee',
  templateUrl: 'editemployee.html',
})
export class EditemployeePage {


  data = {
    id:0,
    name:'' ,
    lname:''  ,
    age:0   ,
    gender:''   ,
    salary :0 ,
    date :''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams
    ,public sqlite:SQLite,public toast:Toast) {

    this.data.id = navParams.get('id');
    this.data.name = navParams.get('name');
    this.data.lname = navParams.get('lname');
    this.data.age   = parseInt(navParams.get('age'));
    this.data.gender   = navParams.get('gender');
    this.data.salary = parseInt(navParams.get('salary'));
    this.data.date = navParams.get('date');



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditemployeePage');
  }



update(){
  this.sqlite.create({
    name: 'data.db',
    location: 'default'
  })  .then((db: SQLiteObject) => {
db.executeSql('UPDATE employeess set name=?,lname=?,age=?,gender=?, salary=?, date=? WHERE id=?', [
  this.data.name,
  this.data.lname  ,
  this.data.age   ,
  this.data.gender   ,
  this.data.salary  ,
  this.data.date,
  this.data.id
])
.then((res) => {
  console.log('Executed SQL insert');
  this.toast.show('Done data updated!','4000','center').subscribe(
    toast => {
      this.navCtrl.pop();
    }
  );

})
        .catch(e => console.log(e));
}) .catch(e => console.log(e));

}


}
